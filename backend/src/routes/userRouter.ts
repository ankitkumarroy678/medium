import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import { signinInput, signupInput } from "@ankitroy678/medium-common";

export const userRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRoute.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  console.log(body);
  const { success } = signupInput.safeParse(body);
  console.log(success);
  if (!success) {
    c.status(411);
    return c.json({
      msg: "Wrong Input!",
    });
  }
  try {
    const userData = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: body.password,
      },
    });
    const userExists = await prisma.user.findUnique({
      where: {
        email: userData.email,
      },
    });

    if (!userExists) {
      return c.json({
        msg: "User Already exist!",
      });
    }
    console.log("here");
    console.log(c.env.JWT_SECRET);
    const token = await sign({ id: userData.id }, c.env.JWT_SECRET);
    console.log(token);
    return c.text(token);
  } catch (error) {
    c.status(403);
    return c.json({
      error: "Error while signing up!" + error,
    });
  }
});

userRoute.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      msg: "Wrong Input!",
    });
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({
        msg: "user not found!",
      });
    }

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json(token);
  } catch (error) {
    c.status(500);
    return c.json({
      error: "Internal server Error!",
    });
  }
});

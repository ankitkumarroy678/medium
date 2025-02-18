import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@ankitroy678/medium-common";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  try {
    const jwt = c.req.header("authorization");
    if (!jwt) {
      c.status(401);
      return c.json({ error: "unauthorized" });
    }
    const payload = (await verify(jwt, c.env.JWT_SECRET)) as { id: string };
    if (!payload) {
      c.status(401);
      return c.json({ error: "unauthorized" });
    }
    c.set("userId", payload.id);

    console.log("here");
    await next();
  } catch (error) {
    c.status(403);
    return c.json({
      msg: error,
    });
  }
});
blogRouter.post("/", async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const { success } = createBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      msg: "Wrong Input!",
    });
  }
  const blog = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: c.get("userId"),
    },
  });
  return c.json({
    id: blog.id,
  });
});

blogRouter.put("/", async (c) => {
  try {
    const body = await c.req.json();
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const { success } = updateBlogInput.safeParse(body);
    if (!success) {
      c.status(411);
      return c.json({
        msg: "Wrong Input!",
      });
    }
    await prisma.post.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    return c.text("From Put blog");
  } catch (error) {
    c.status(403);
    return c.json({
      msg: error,
    });
  }
});

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const post = await prisma.post.findMany({
    select: {
      content: true,
      title: true,
      id: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  console.log("yooo");
  return c.json(post);
});

blogRouter.get("/:id", async (c) => {
  const body = await c.req.param();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const post = await prisma.post.findFirst({
    where: {
      id: body.id,
    },
    select: {
      content: true,
      title: true,
      id: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  return c.json(post);
});

import { useState } from "react";
import { Button } from "../components/Button";
import { InputBox } from "../components/InputBox";
import { Lable } from "../components/Lable";
import { Quote } from "../components/Quote";
import { Warning } from "../components/Warning";
import { SigninInput } from "@ankitroy678/medium-common";

export const Signin = () => {
  const [postInput, setPostInput] = useState<SigninInput>({
    email: "",
    password: "",
  });
  return (
    <>
      <div className="grid md:grid-cols-2">
        <div className="flex justify-center items-center">
          <div className="flex flex-col justify-center items-center h-screen w-64">
            <div className="">
              <div className="flex flex-col justify-center items-center p-4">
                <Lable value={"Welcome back"} />
                <Warning
                  value={"Don't have an account?"}
                  to={"/signup"}
                  path={"signup"}
                />
              </div>
              <div className="space-y-3">
                <InputBox
                  type={"text"}
                  lable={"Email"}
                  value={"m@example.com"}
                  onChange={(e) => {
                    setPostInput({
                      ...postInput,
                      email: e.target.value,
                    });
                  }}
                />
                <InputBox
                  type={"text"}
                  lable={"Password"}
                  value={"m@example.com"}
                  onChange={(e) => {
                    setPostInput({
                      ...postInput,
                      password: e.target.value,
                    });
                  }}
                />
              </div>
              <Button value={"Sign In"} />
            </div>
          </div>
        </div>
        <div className="invisible lg:visible">
          <Quote />
        </div>
      </div>
    </>
  );
};

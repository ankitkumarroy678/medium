import { useState } from "react";
import { Button } from "../components/Button";
import { InputBox } from "../components/InputBox";
import { Lable } from "../components/Lable";
import { Quote } from "../components/Quote";
import { Warning } from "../components/Warning";
import { SignupInput } from "@ankitroy678/medium-common";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DATABASE_URL } from "../config";

export const Signup = () => {
  const [postInput, setPostInput] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  async function inputUser() {
    const response = await axios.post(`${DATABASE_URL}/api/v1/user/signup`, {
      email: postInput.email,
      name: postInput.name,
      password: postInput.password,
    });
    const jwt = response.data;
    console.log(jwt);
    localStorage.setItem("token", jwt);
    navigate("/blog");
  }
  return (
    <>
      {JSON.stringify(postInput)}
      <div className="grid md:grid-cols-2">
        <div className="flex justify-center items-center">
          <div className="flex flex-col justify-center items-center h-screen w-64">
            <div className="">
              <div className="flex flex-col justify-center items-center p-4">
                <Lable value={"Create a account"} />
                <Warning
                  value={"Already have an account?"}
                  to={"/signin"}
                  path={"signin"}
                />
              </div>
              <div className="space-y-3">
                <InputBox
                  type={"text"}
                  lable={"Username"}
                  value={"Enter your username"}
                  onChange={(e) => {
                    setPostInput({
                      ...postInput,
                      name: e.target.value,
                    });
                  }}
                />
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
                  type={"password"}
                  lable={"Password"}
                  value={""}
                  onChange={(e) => {
                    setPostInput({
                      ...postInput,
                      password: e.target.value,
                    });
                  }}
                />
              </div>
              <Button value={"Sign Up"} onclick={inputUser} />
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

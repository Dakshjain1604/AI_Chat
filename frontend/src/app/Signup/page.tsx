import React from "react";
import { Button } from "@/components/ui/button";
import { FormInputAuth } from "@/components/ui/FormInput";
const Signup = () => {
  return (
    <div>
      <div className=""></div>
    <div className="flex justify-center items-center h-screen w-screen ">
      <div className=" border-2 border-white h-fit w-[100] px-5 flex flex-col  items-center rounded-md  py-5">
        <div className="flex flex-col justify-between gap-4">
          <FormInputAuth
            inputType="text"
            placeholder="John Doe"
            Label="Full Name"
          />
          <FormInputAuth
            inputType="Email"
            placeholder="JohnDoe@gmail.com"
            Label="Email"
          />
          <FormInputAuth
            inputType="Password"
            placeholder="Your Password"
            Label="Passoword"
          />
          <div className="flex flex-wrap items-center gap-2 md:flex-row justify-center ">
            <Button
              variant={"default"}
              className="px-5  hover:bg-white text-black  bg-gray-300 hover:scale-105 w-[80%]"
            >
              SignUp
            </Button>
          </div>
        </div>
        <div className="text-white flex items-center gap-0">
          <div className="mr-[-3px]">Already a User ?</div>
          <div className="ml-[-3px]"><Button variant={"link"} className="text-blue-500">Sign in</Button></div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Signup;

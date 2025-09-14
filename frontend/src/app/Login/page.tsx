import { Button } from '@/components/ui/button'
import { FormInputAuth } from '@/components/ui/FormInput'
import React from 'react'
import axios from "axios"
const BACKEND_URL=process.env.BACKEND_URL;


const Login = () => {

  return (
    <div>
      <div className="flex justify-center items-center h-screen w-screen flex-col">
        <div className="text-4xl font-bold text-white mb-4"> LOGIN</div>
        <div className=" border-2 border-white h-fit w-[100] px-5 flex flex-col  items-center rounded-md  py-5">
          <div className="flex flex-col justify-between gap-4">
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
                Sign In
              </Button>
            </div>
          </div>
          <div className="text-white flex items-center gap-0">
            <div className="mr-[-3px] text-sm">Don&apos;t Have an Account ?</div>
            <div className="ml-[-3px]">
              <Button variant={"link"} className="text-blue-500">
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;
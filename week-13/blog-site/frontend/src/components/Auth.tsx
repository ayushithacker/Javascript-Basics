import { signupInput } from "@ayushithacker/medium";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import {BACKEND_URL} from '../config'
import axios from 'axios';

export const Auth = ({type} : {type: "signup" | "signin"} )=>{
    const navigate =useNavigate()
    const [postInput,setpostInput ]= useState<signupInput>({
        name : "",
        username: "",
        password: " "
    })

    async function sendRequest(){
        try {
            const response =  await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin" }`,postInput)
            console.log(response)
            const jwt = response.data;
            localStorage.setItem("token",jwt);
            navigate("/blogs")
        } catch (error) {
            
        }

    }
    
    return <>
    <div className="h-screen flex justify-center flex-col"> 
        <div className="flex justify-center">
            <div>
                <div className="px-10">
                <div className="text-2xl text-center font-bold">
                Create an account
                </div>
            <div className="text-slate-400">{type === "signin" ? "Don't have account" : " Already have an account?"}
                <Link className="underline pl-2"to={type === "signin" ? "/signup" : "/signin"}>{type === "signin" ? "signup" : "Login"}</Link>
            </div>
            </div>
       <div className="pt-8">
          {type === "signup" ?   <LabelInputBox label="Name" placeholder="Ayushi" onChange={(e)=>{
                setpostInput({
                    ...postInput,
                    name: e.target.value
                })
            }}/>  : null}

            <LabelInputBox label="Username" placeholder="ayushi@gmail.com" onChange={(e)=>{
               setpostInput({
                ...postInput,
                username: e.target.value

               }) 
            }}/>

            <LabelInputBox label="Password" type = {"password"} placeholder="@#$%^&" onChange={(e)=>{
                setpostInput({
                ...postInput,
                password: e.target.value
                })
            }}/>
            </div>
            <div><button onClick={sendRequest} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                {type === 'signup' ? "Sign Up" : "Sign In"}</button>
</div>
    </div></div></div>
    </>
}

interface labelInputType {
    label : string;
    placeholder : string;
    type?: string
    onChange : (e : ChangeEvent <HTMLInputElement>)=> void
}
function LabelInputBox({label,onChange,placeholder,type}:labelInputType ){

    return <div>
        <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
        {label}
      </label>
      <input onChange={onChange} typeof={type||"text"} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder={placeholder}></input>
    </div>
    </div>
}
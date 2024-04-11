import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const client = new PrismaClient();

export  async function GET(){

    const user = await client.user.findFirst()

    return Response.json({
        email : user?.username ,
        name : "Ayushi"
    })
}

export async function POST (req : NextRequest){
    const body = await req.json()
    console.log(body)

    try{
        await client.user.create({
            data:{
                username: body.username,
                password: body.password
            }
        })
    
        return Response.json({
            msg : "You are logged in"
        })
    }
    catch(e){
        return NextResponse.json({
            msg : "Error while signin..!!"
        },{
            status:411
        })
    }
    
}
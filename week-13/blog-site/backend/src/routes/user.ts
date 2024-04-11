import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign  } from 'hono/jwt'
import { signupInput } from "@ayushithacker/medium";




export const userRouter =new Hono<{
    Bindings:{
        DATABASE_URL : string;
        JWT_SECRET : string;
    }
}>();

userRouter.post('/signup', async(c) => {

    const body = await c.req.json()
    const {success } = signupInput.safeParse(body);

    if(!success){
      c.status(411)
      return c.json({
        msg:"Inputs are incorrect"
      })
    }
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
  
    const user = await prisma.user.create({
      data:{
        username: body.username,
        password : body.password,
      }
     })
     console.log(user)

     const jwt = await sign({
      id: user.id
     },c.env.JWT_SECRET)
     return c.text(jwt)
    
  })
  
  userRouter.post('/signin', async(c) => {
  
    const body = await c.req.json()
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    try{
  
    const user = await prisma.user.findFirst({
      where:{
        username: body.username,
        password : body.password,
      
      }
     })
     if(!user){
      c.status(403)
      return c.text('user already exsist')
  
     }
     const jwt = await sign({
      id: user.id
     },c.env.JWT_SECRET)
     return c.text(jwt)
    }
    catch(e){
      c.status(411)
      return c.text('user already exsist')
    }
  
  })
  
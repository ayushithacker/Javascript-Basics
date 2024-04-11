import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter =new Hono<{
    Bindings:{
        DATABASE_URL : string;
        JWT_SECRET : string;
    },
    Variables:{
        userId: string;
    }
}>()

blogRouter.use("/*",async (c,next)=>{
    const authHeader = c.req.header("authorization") || ""
    const user = await verify(authHeader,c.env.JWT_SECRET)

    if(user){
        c.set("userId", user.id)
        await next();
    }
    else{
         c.status(403)
         return c.json({
            
            msg : " You are not logged in"
        })
    }
    
})


blogRouter.post("/add", async (c)=>{
    const body = await c.req.json()
    const authorID = c.get("userId")
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog = await prisma.blog.create({
        data:{
            title: body.title,
            content : body.content,
            authorID: Number(authorID)

        }
    })
  
    return c.json({
        id : blog.id
    })
})

// Update 
blogRouter.put("/update", async (c)=>{
    const body = await c.req.json()
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog = await prisma.blog.update({
        where : {
            id : body.id
        },
        data:{
            title: body.title,
            content : body.content,
            authorID: 1

        }
    })
  
    return c.json({
        id : blog.id
    })
  
})

// get blogs

blogRouter.get("/getblogs/:id",async(c)=>{
    const id = await c.req.param("id")
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try
    {
        const blog = await prisma.blog.findFirst({
        where : {
            id : Number(id)
        }
        })
  
    return c.json({
        blog
    })
    }
    catch(e){
        c.status(411)
        return c.json({
            msg:"Error"
        })
    }
    
    
})
blogRouter.get("/bulk",async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

      const blog = await prisma.blog.findMany();

    return c.json({
        blog
    })
})

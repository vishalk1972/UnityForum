import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { SubredditValidator } from "@/lib/validators/subreddits";
import { z } from "zod";

export async function POST(req:Request) {
    try{
        const session=await getAuthSession()

        if(!session?.user)
        {
            return new Response('Unauthorized',{status:401})   
        }

        const body=await req.json()

        const {name}=SubredditValidator.parse(body)

        const subredditExists=await db.subreddit.findFirst({
            where:{
                name,
            }
        })

        if(subredditExists)
        {
            return new Response('Subreddit Already Exist',{status:409}) 
        }
        const subredit=await db.subreddit.create({
            data:{
                name,
                creatorId:session.user.id
            }
        })

        await db.subscription.create({
            data:{
                userId:session.user.id,
                subredditId:subredit.id
            }
        })

        return new Response(subredit.name)
    }catch(error)
    {
        if(error instanceof z.ZodError)
        {
            return new Response(error.message,{status:422})
        }

        return new Response('Could Not Create Subreddit',{status:500})
    }
}
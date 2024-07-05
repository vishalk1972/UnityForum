"use client"
import { useCustomToast } from "@/hooks/use-custom-toast";
import { usePrevious } from "@mantine/hooks";
import { FC, useState } from "react";
import { Button } from "@/components/ui/Button";
import { toast } from '@/hooks/use-toast'
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { CommentVote,VoteType } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { CommentVoteRequest } from "@/lib/validators/vote";
import axios, { AxiosError } from "axios";

type PartialVote=Pick<CommentVote,'type'>

interface CommentVotesProps {
    commentId:string,
    initialVoteAmt:number
    initialVote?:PartialVote
}
 
const CommentVotes:  FC<CommentVotesProps> = ({
    commentId,
    initialVoteAmt,
    initialVote,
}) => {
    const {loginToast}=useCustomToast()
    const [ votesAmt,setVotesAmt]=useState<number>(initialVoteAmt)
    const [currentVote,setCurrentVote]=useState(initialVote)
    const prevVote=usePrevious(currentVote)
 
    const {mutate:vote}=useMutation({
        mutationFn:async(voteType:VoteType)=>{
            const payload:CommentVoteRequest={
                commentId,
                voteType
            }
            await axios.patch('/api/subreddit/post/comment/vote',payload)
        },
        onError:(err,voteType)=>{
            if(voteType==='UP') setVotesAmt((prev)=>prev-1)
            else setVotesAmt((prev)=>prev+1)
            setCurrentVote(prevVote)

            if (err instanceof AxiosError) {
                if (err.response?.status === 401) {
                  return loginToast()
                }
              }
        
              return toast({
                title: 'Something went wrong.',
                description: 'Your vote was not registered. Please try again.',
                variant: 'destructive',
              })
        },
        onMutate: (type) => {
            if (currentVote?.type === type) {
              // User is voting the same way again, so remove their vote
              setCurrentVote(undefined)
              if (type === 'UP') setVotesAmt((prev) => prev - 1)
              else if (type === 'DOWN') setVotesAmt((prev) => prev + 1)
            } else {
              // User is voting in the opposite direction, so subtract 2
              setCurrentVote({type})
              if (type === 'UP') setVotesAmt((prev) => prev + (currentVote ? 2 : 1))
              else if (type === 'DOWN')
                setVotesAmt((prev) => prev - (currentVote ? 2 : 1))
            }
          },
        
    })
    return (
        <div className="flex gap-1">
            <Button onClick={()=>vote('UP')} size='sm' variant='ghost' aria-label="upvote">
                <ArrowBigUp className={cn('h-5 w-5 text-zinc-700',{'text-emerald-500 fill-emerald-500':currentVote?.type==='UP'})}/>
            </Button>

            <p className="text-center py-2 font-medium text-sm text-zinc-900">
                {votesAmt} 
            </p>

            <Button onClick={()=>vote('DOWN')} size='sm' variant='ghost' aria-label="upvote">
                <ArrowBigDown className={cn('h-5 w-5 text-zinc-700',{'text-red-500 fill-red-500':currentVote?.type==='DOWN'})}/>
            </Button>
        </div>
      );
}
 
export default CommentVotes;
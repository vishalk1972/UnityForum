// import { VoteType } from "@prisma/client"

// export type CachePost={
//     id:string,
//     title:string,
//     authorUsername:string,
//     content:string,
//     currentVote:VoteType | null
//     createdAt:Date

// }
import { Vote } from '@prisma/client'

export type CachedPost = {
  id: string
  title: string
  authorUsername: string
  content: string
  currentVote: Vote['type'] | null
  createdAt: Date
}
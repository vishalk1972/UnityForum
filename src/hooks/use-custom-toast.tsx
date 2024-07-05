import  Link  from "next/link"
import { toast } from "./use-toast"
import { buttonVariants } from "@/components/ui/Button"

export const useCustomToast=()=>{
    const loginToast=()=>{
        const {dismiss}=toast({
            title:"Login Required",
            description:"You nedd to logged in to proceed further",
            variant:"destructive",
            action:(
                <Link onClick={()=>dismiss} className={buttonVariants({variant:'outline'})} href="/sign-in">Login</Link>
            )
        })
    }
    return {loginToast}
}
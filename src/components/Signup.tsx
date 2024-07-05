import { Icons } from "./Icons"
import Link from "next/link"
import UserAuthForm from "./UserAuthForm"

const Signup = () => {
  return (
    <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
        <div className="flex flex-col space-y-2 text-center">
            <Icons.logo className="mx-auto h-6 w-6"/>
            <h1 className="text-2xl font-semibold tracking-tight">Sign Up</h1>
            <p className="text-sm max-w-xs mx-auto">
                By Continuing, You are setting up a Unity Forum account and agree to our User Agreement and Privacy Policy.
            </p>

            {/* SIGN IN FORM */}

            <UserAuthForm/>

            <p className="px-8 text-center text-sm text-zinc-700">
                Already A member ? {' '}
                <Link href='/sign-in' className='hover:text-zinc-900 text-sm underline underline-offset-2'>Sign In</Link>
            </p>

        </div>
    </div>
  )
}

export default Signup

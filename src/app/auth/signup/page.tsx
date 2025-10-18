'use client'
import { SignupForm } from "@/components/signup-form"
import { useUser } from "@/providers/user-provider";
import { useRouter } from "next/navigation";

export default function Page() {
    const {user} = useUser()
    const router = useRouter();
  
    if (user) {
      router.replace('/')
    }
  
  return (
    <div className="flex w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
  )
}

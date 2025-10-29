'use client'
import React from 'react'
import {Button} from "@/components/ui/button";
import {authClient} from "@/lib/auth-client";
import {useRouter} from "next/navigation";

const HomeView = () => {
    const router = useRouter();
    const {data:session} = authClient.useSession()

    if(!session){
        return (
            <p>Loading...</p>
        )
    }
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-y-4">
            <h1>Hey Welcome {session?.user?.name}</h1>
            <Button onClick={() => authClient.signOut({
                fetchOptions:{
                    onSuccess:()=>router.push('/sign-in')}
            })}
            >Sign Out
            </Button>
        </div>
    )
}
export default HomeView

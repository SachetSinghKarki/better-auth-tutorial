"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client"; //import the auth client

import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useState } from "react";

const Page = () => {

  const { data: session, } = authClient.useSession() 

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    authClient.signUp.email(
      {
        email,
        password,
        name,
      },
      {
        onError: () => {
          // display the error message
          alert("Error creating user");
        },
        onSuccess: () => {
          alert("User created successfully");
        },
      }
    );
  };

  const onLogin = () => {
    authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onError: () => {
          // display the error message
          alert("Error logging in user");
        },
        onSuccess: () => {
          alert("User logged in successfully");
        },
      }
    );
  };

  if (session) {
    return (
    <div className="flex flex-col items-center justify-center h-screen gap-y-4">
      <h1>Hey Welcome {session?.user?.name}</h1>
      <Button onClick={() => authClient.signOut()}>Sign Out</Button>
    </div>
    );
  }

  return (
    <div className="max-w-md mx-auto space-y-10">
    <div className="flex flex-col items-center justify-center h-screen gap-y-4 ">
      <h1>Testing Better Auth in Home Page</h1>
      <h3>Signup Demo</h3>
      <Input
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={onSubmit}>Create User</Button>
    </div>
    <div className="flex flex-col items-center justify-center h-screen gap-y-4">
      
      <h3>Login Demo</h3>
      <Input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={onLogin}>Login</Button>
    </div>


    </div>
  );
};

export default Page;

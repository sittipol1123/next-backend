import React from "react";
import Paperbase from "@/component/layout";
import {signIn} from "next-auth/react"; 
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Router from "next/router";

export default function test() {
  const session = useSession();
  console.log(session)
  useEffect(() => {
    if(session.status === "unauthenticated"){
      Router.replace("login");
    }
  }, [session.status])
  return (
    <Paperbase>
      {/* <div>test</div>
      <button onClick={() => signIn()}>login</button> */}
      <div style={{color: 'black'}}>{session.data?.user?.avatar}</div>
    </Paperbase>
  );
}

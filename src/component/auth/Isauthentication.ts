import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import Router from 'next/router';

export default function Isauthentication() {
  const session = useSession();
  console.log(session)
  useEffect(() => {
    if(session.status === "unauthenticated"){
      Router.replace("login");
    }
  }, [session.status])
}

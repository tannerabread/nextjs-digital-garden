"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginBtn() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        {/* Add avatar and profile page link */}
        <button 
          className="btn btn-primary"
          onClick={() => signOut()}>
            Sign out
        </button>
      </>
    );
  }
  return (
    <>
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}

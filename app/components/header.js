"use client";
import React from "react";
import Link from "next/link";
import { useUserAuth } from "../_utils/auth-context";

function Header() {
  const { user, gitHubSignIn, gitHubSignOut } = useUserAuth();

  async function handleSignIn() {
    try {
      await gitHubSignIn();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSignOut() {
    try {
      await gitHubSignOut();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <header className="flex mx-6 mt-4 mb-10 p-2">
      <div className="flex-auto w-3/5 title-color font-libre-baskerville text-2xl">
        <Link href="/">Kitchen Diary</Link>
      </div>
      <div className="flex w-1/4 text-lg font-roboto text-color">
        <Link href="/profile" className="flex items-center">
          {user && (
            <img
              src={user.photoURL}
              alt={user.displayName}
              className="mr-2 w-8 h-8"
            />
          )}
          <span>{user ? user.displayName : ""}</span>
        </Link>
      </div>
      <div className="flex-auto w-1/6">
        {user ? (
          <button
            onClick={handleSignOut}
            className="text-lg font-roboto text-color w-max ml-20"
          >
            Sign Out
          </button>
        ) : (
          <button
            onClick={handleSignIn}
            className="text-lg font-roboto text-color w-max ml-20"
          >
            Sign In
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;

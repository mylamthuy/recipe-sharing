"use client"
import { HashRouter, Link, Route, Routes } from "react-router-dom";
import { useUserAuth } from "./_utils/auth-context";

import Home from "./pages/home.js";
import Profile from "./pages/profile.js";

export default function App() {
    const { user, gitHubSignIn, gitHubSignOut } = useUserAuth();

    async function handleSignIn() {
        try {
            await gitHubSignIn();
        }
        catch (error){
            console.error(error);
        }
    }

    async function handleSignOut() {
        try {
            await gitHubSignOut();
        }
        catch (error){
            console.error(error);
        }
    }
    return (
        <div className="App">
            <HashRouter>
                {/* <AuthContextProvider> */}
                    <nav>
                        <ul className="flex mx-6 mt-3 mb-1 p-2">
                            
                            <li className="flex-auto w-3/5 title-color font-libre-baskerville text-2xl">
                                <Link to="/">Kitchen Diary</Link>
                            </li>
                            <li className="flex-auto w-1/4 text-lg font-roboto text-color">
                                <Link to="/profile">Profile</Link>
                            </li>
                            <li className="flex-auto w-1/6">
                                {user ? (
                                    <button
                                        onClick={handleSignOut}
                                        className="text-lg font-roboto text-color w-max"
                                    >
                                        Sign Out
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleSignIn}
                                        className="text-lg font-roboto text-color w-max"
                                    >
                                        Sign In
                                    </button>
                                )}
                            </li>
                            {/* <li className="flex-auto text-lg font-roboto text-color">Log Out</li> */}
                        </ul>
                    </nav>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/profile" element={<Profile />} />
                    </Routes>
                {/* </AuthContextProvider> */}
            </HashRouter>
        </div>
    )
}
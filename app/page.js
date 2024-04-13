import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./_utils/auth-context";

import Home from "./pages/Home";
import Profile from "./pages/Profile";

export default function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <AuthContextProvider>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/profile" element={<Profile />} />
                    </Routes>
                </AuthContextProvider>
            </BrowserRouter>
        </div>
    )
}
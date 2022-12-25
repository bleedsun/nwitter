import React from "react";
import {HashRouter, Routes, Route, useLocation} from "react-router-dom";
import Home from "../routes/Home"
import Auth from "../routes/Auth"
import Navigation from "./Navigation";
import Profile from "routes/Profile";

const AppRouter = ({ setInit, refreshUser, isLoggedIn, userObj }) => {        
    return (
        <HashRouter>
            {isLoggedIn && <Navigation userObj={userObj}/>}
            <Routes>
                {isLoggedIn ? (
                    <div
                    style={{
                      maxWidth: 890,
                      width: "100%",
                      margin: "0 auto",
                      marginTop: 80,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Route path="/" element={<Home userObj={userObj} />} />
                    <Route path="/profile" element={<Profile userObj={userObj} refreshUser={refreshUser} setInit={setInit} />} />
                    </div> 
                    ) 
                    :
                    (
                        <Route path="/" element={<Auth />} />
                    )
                } 
            </Routes>
        </HashRouter>
    );
}

export default AppRouter;

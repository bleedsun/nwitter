import { authService, firebaseInstance } from "fbase";
import React, { useState } from "react";
import {
    createUserWithEmailAndPassword,
    GithubAuthProvider,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    getAuth
    } from 'firebase/auth';
import AuthForm from "components/AuthForm";

const Auth = () => {
    const onSocialClicked = async (event) => {
        const {
            target: { name },
        } = event;
        let provider;
        if(name === "google") {
            provider = new GoogleAuthProvider();
            const result = await signInWithPopup(authService, provider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
        }else if(name === "github") {
            provider = new GithubAuthProvider();
            const result = await signInWithPopup(authService, provider);
            const credential = GithubAuthProvider.credentialFromResult(result);
        }        
    }
    return (
<div>
   <AuthForm />
    <div>        
        <button onClick={onSocialClicked} name="google">Continue with Google</button>
        <button onClick={onSocialClicked} name="github">Continue with Git</button>
    </div>
</div>
    );
}

export default Auth;
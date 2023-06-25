import React, { createContext, useEffect, useState } from 'react';
import app from '../../firebase/firebase.Config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,getAuth, onAuthStateChanged,updateProfile, signOut} from "firebase/auth";
export const AuthContext=createContext();
const auth=getAuth(app);
const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true);
    const signUpUser=(email, password)=>{
        setLoading(true)
       return createUserWithEmailAndPassword(auth,email,password)
    }
    const signInUser=(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
    const updateUser=(profile)=>{
        return updateProfile(auth.currentUser,profile)
    }
    const logOut=()=>{
        localStorage.removeItem('genius-token')
        return signOut(auth);
    }
    useEffect(()=>{
        const unSubscribe=onAuthStateChanged(auth,currentUser=>{
            console.log(currentUser)
            setUser(currentUser)
            setLoading(false)
        })
        return ()=>{
            unSubscribe()
        }
    },[])
    const authInfo={
        user,
        loading,
        signUpUser,
        signInUser,
        updateUser,
        logOut
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
import React from "react";
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
const Home = () => {
    return (
        <div className='flex min-h-screen bg-gray-900'>
        <div className='flex-1 flex items-center justify-center'>
            <div className='w-[22%] min-w-min text-white align-text-top'>
        <h1>Home</h1>
        <button onClick={()=> firebase.auth().signOut()}>Log Out</button>
        </div>
        </div>
        </div>
    );
}

export default Home;
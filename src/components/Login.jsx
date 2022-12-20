import React, { useContext } from 'react'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { useState } from 'react'
import { useEffect } from 'react'
import { Route, useNavigate } from 'react-router-dom'
import { AuthContext } from '../Auth'

export default function Login()  {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const {currentUser} = useContext(AuthContext)
    if(currentUser){
        navigate('/')
    }
    
    const handleEmailChanges = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChanges = (e) => {
        setPassword(e.target.value)

    }

    const loginWithGoogle = async (event) => {
        event.preventDefault();
        try{
            await firebase.auth().signInWithEmailAndPassword(email, password).then(
            (userCredential) => {
                console.log(userCredential)
            }
            )
            navigate('/')
        }catch (error){
            alert('password/email salah!')
        }
    }

    

  return (
    <>
    <div className='flex min-h-screen bg-gray-900'>
        <div className='flex-1 flex items-center justify-center'>
            <div className='w-[22%] min-w-min text-white'>
                <form action="" className='flex flex-col gap-y-2 '>
                    <label className='font-semibold text-sm'>Email</label>
                    <input type="text" name="email" id="email" className='border py-1 px-2 rounded-lg text-black' placeholder='fulan@example.com' onChange={handleEmailChanges} value={email} />

                    <label className='font-semibold text-sm'>Password</label>
                    <input type="password" name="password" id="password" className='border py-1 px-2 rounded-lg text-black' onChange={handlePasswordChanges} value={password} />

                    <button className='bg-black hover:shadow-xl transition duration-300 text-white py-2 rounded-xl text-sm block' onClick={loginWithGoogle}>
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    </div>
    </>
  )
}

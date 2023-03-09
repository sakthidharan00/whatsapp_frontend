import React from 'react';
import Button from '@mui/material/Button';
import "./Login.css";
import { auth, provider } from './../fibrebase/firebase';
import { signInWithPopup } from 'firebase/auth';
import { UseStateProvider } from '../../App';
import Chat from "../Chat/Chat"



const Login = () => {

  //reducer
  const [state, dispatch] = UseStateProvider();
  const signIn = () => {


    //Sign in with Google & dispatcing user information to reducer
    signInWithPopup(auth, provider).then((res) => { dispatch({ type: "setUser", user: res.user }); console.log(res) }).catch((e) => console.log(e.message));

  }


  return <>
    {state?<Chat/>:(<div className='login-Page'>
  <div className='login-container'>
    <h3>Welcome to Whatsapp</h3>
    <img src='https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg' alt='logo' />
    <Button onClick={signIn}>Sign In with G-mail</Button>

  </div>
</div>)

}

 </>
}

export default Login

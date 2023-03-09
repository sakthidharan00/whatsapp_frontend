import React from 'react';
import "./Chat.css";
import MsgContent from './msgContent/MsgContent';
import SideBar from './sidebarCHat/SideBar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

const Chat = () => {

  return (
    <div className='chat'>
      <div className='dummy'></div>
      <div className='chat-contianer'>


        <Router>

          <div className='chat-sideBar'>
            <SideBar />
          </div>
          <div className='msgContent'>
            <Routes>
              <Route path="/group/:id" element={<MsgContent />} />
            </Routes>
          </div>
        </Router>


      </div>

    </div>
  )
}

export default Chat;

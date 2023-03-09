import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import "./MsgContent.css";
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import { UseStateProvider } from '../../../App';
import { useParams } from 'react-router-dom';
import Pusher from 'pusher-js';


const MsgContent = () => {
    const [message, setMessage] = useState();
    const [state] = UseStateProvider();
    const id = useParams();
    const groupId = id.id;
    const [msgGroupName, setMsgGroupName] = useState({});

    const [oldMessage, setOldMessage] = useState([]);
    useEffect(() => {

        axios.get(`https://whatsapp-backend-q80q.onrender.com/whatsappClone/get/group/${groupId}`).then((doc) => { setMsgGroupName(doc.data) });
        axios.get(`https://whatsapp-backend-q80q.onrender.com/whatsappClone/get/old/message/${groupId}`).then((doc) => { setOldMessage(doc.data) })


    }, [id])


    useEffect(() => {


        Pusher.logToConsole = true;

        const pusher = new Pusher('da9a1517b43cca322478', {
            cluster: 'ap2'
        });

        const channel = pusher.subscribe('newMessages');
        channel.bind('msgInserted', function (data) {

            setOldMessage((previous) => [...previous, data])

            // if (data.groupId === groupId) {
            //     setOldMessage((previous) => [...previous,data]);



            // }
            // else {
            //     return
            // }
        });

    },[])




    const sendMessage = () => {
        if ((message.trim()).length === 0) {
            return;

        }
        else {
            axios.post("https://whatsapp-backend-q80q.onrender.com/whatsappClone/post/send/message", {
                uid: state.uid,
                userName: state.displayName,
                message: message,
                time: new Date().toString().slice(0, 25),
                groupId: id.id
            }).then((doc) => {  setMessage("") })
        }


    }


    return (
        <div className='msgContent-container'>
            <div className='msgContent-Header'>
                <div className='msgContent-Header-right'>
                    <Avatar src={`https://ui-avatars.com/api/?name=${msgGroupName.grpName}`} />
                    <div className='text'>
                        <p className='user'>{msgGroupName.grpName}</p>
                        <p className='time'>Last seen at :{new Date().toString().slice(15, 25)}</p>
                    </div>

                </div>
                <div className='msgContent-Header-left'>
                    <SearchIcon />
                    < MoreVertIcon />

                </div>

            </div>

            <div className='msgContent-body'>

                {
                    oldMessage.map((value, index) => {
                        if (value.groupId === groupId) {

                            if (state.uid === value.uid) {
                                return (
                                    <div className='msg-sender' key={index}>
                                        <h6>{value.userName}</h6>
                                        <p className='content'>{value.message}</p>
                                        <p id='time-sended'>{value.time.slice(15, 21)}</p>

                                    </div>

                                )



                            }
                            else {
                                return (
                                    <div className='msg-recevier' key={index}>
                                        <h6>{value.userName}</h6>

                                        <p className='content'>{value.message}</p>
                                        <p id='time-recevied'>{value.time.slice(15, 21)}</p>

                                    </div>
                                )
                            }

                        }
                        else{
                            return
                        }

                    }
                    )


                }

            </div>
            <div className='msgConetnt-footer'>
                <div className='input'>
                    <input placeholder='Enter the message' value={message} onChange={(e) => { setMessage(e.target.value) }} />
                    <SendIcon onClick={sendMessage} />
                </div>



            </div>


        </div>
    )
}

export default MsgContent

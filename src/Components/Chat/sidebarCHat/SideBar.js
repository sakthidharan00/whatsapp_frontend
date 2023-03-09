import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import Avatar from '@mui/material/Avatar';
import { UseStateProvider } from '../../../App';
import GroupsIcon from '@mui/icons-material/Groups';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import MessageIcon from '@mui/icons-material/Message';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import axios from "axios";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Pusher from 'pusher-js';
import "./Sidebar.css";






const SideBar = () => {
    const [state] = UseStateProvider();
    const [grpName, setGrpName] = useState([]);

    useEffect(() => {

        axios.get("https://whatsapp-backend-q80q.onrender.com/whatsappClone/get/allGroupName").then((doc) => { setGrpName(doc.data) }).catch((e) => console.log(e.message));





    },[grpName])


    useEffect(() => {


        Pusher.logToConsole = true;

        const pusher = new Pusher('da9a1517b43cca322478', {
            cluster: 'ap2'
        });

        const channel = pusher.subscribe('GroupName');
        channel.bind('GrpInserted', function (data) {

         setGrpName((previous) => [data,...previous]);
            // console.log(grpName)


        });

    },[])

    const addGroup = () => {

        let newGrp = prompt("Enter Group Name ");
        newGrp = newGrp.trim();
        if (newGrp.length === 0) {
            alert("Invalid Input");
        }
        else {
            axios.post("https://whatsapp-backend-q80q.onrender.com/whatsappClone/post/Create/groupName", { grpName: newGrp });
        }

    }








    return (
        <div className='sideBar'>
            <div className='sideBar-container'>
                <div className='sidebar-Header'>
                    <div className='user-info'>
                        <Avatar src={state.photoURL} alt="display Image" />
                        {/* <p>{state.displayName}</p> */}
                    </div>
                    <div className='shotcut-icons'>
                        <GroupsIcon />
                        <DonutLargeIcon />
                        <MessageIcon />
                        <MoreVertIcon />

                    </div>

                </div>
                <div className='search-chat'>
                    <form>
                        <SearchIcon />
                        <input placeholder='search group .....' disabled />
                    </form>
                    <FilterListIcon />


                </div>

                <div className='add-group'>
                    <GroupAddIcon />
                    <p onClick={addGroup}>Add New group</p>
                </div>
                <div className='sideBar-groupList'>



                    {grpName.map((value, index) => {
                        return (
                            <Link to={`/group/${value._id}`} key={index}>
                                <div className='grpName' key={index}>
                                    <Avatar src={`https://ui-avatars.com/api/?name=${value.grpName}`} />
                                    <h4>{value.grpName}</h4>
                                </div>

                            </Link>

                        )
                    })
                    }


                </div>

            </div>

        </div>
    )
}

export default SideBar

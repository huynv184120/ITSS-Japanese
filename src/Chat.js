import Auth from './chat-module/component/auth';
import { makeStyles } from '@material-ui/core';
import { SearchRoom } from './chat-module/component/room';
import ChatRoom from './chat-module/component/chatwindow';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import io from "socket.io-client";
import config from './chat-module/config';
import socketEvent from './chat-module/socket_io/events';
import { changeRoomInfo, joinRoom, loadRooms, updateLastMessage } from "./chat-module/redux/actions/room";
import { addMessage, loadMessages, updateMessage } from './chat-module/redux/actions/message';
import { roomApi, messageApi, userApi } from './chat-module/api';
import { loadMyInfo, loadUsers, updateMemberInfo } from './chat-module/redux/actions/user';
import { receiveInvitation, loadInvitations } from './chat-module/redux/actions/announce';
import ChatAppBar from './chat-module/component/ChatAppBar';
import React  from 'react';

const useStyles = makeStyles(() => {
  return ({
    appBar: {
      height: "70px",
      display: "flex",
      alignItems: "center",
      paddingLeft: "30px",
      paddingRight: "30px",

    },
    "@global": {
      "*::-webkit-scrollbar": {
        width: "4px",
      },
      "*::-webkit-scrollbar-track": {
        "-webkit-box-shadow": "inset 0 0 2px rgba(0,0,0,0.00)"
      },
      "*::-webkit-scrollbar-thumb": {
        backgroundColor: "rgba(0,0,0,0.05)",
        outline: "0.5px solid slategrey"
      }
    }
  })
})

const socket = io(config.REACT_SOCKET_END_POINT, { withCredentials: true });

const Chat = () => {
  const classes = useStyles();
  const auth = Cookies.get('token');
  const dispatch = useDispatch();

  useEffect(async () => {
    if (auth) {

      const res = await roomApi.getRooms();
      const rooms = res.data;
      dispatch(loadRooms(rooms));

      const listRoomMess = rooms.map((room) => messageApi.getMessages(room._id));
      await Promise.all(listRoomMess);
      const users = res.users;
      dispatch(loadMyInfo(res.myInfo));
      dispatch(loadUsers(users));

      listRoomMess.forEach(element => {
        element.then((data) => {
          dispatch(loadMessages(data));
          dispatch(updateLastMessage({ room_id: data.room_id, lastMessage: data.messages[data.messages.length - 1] }));
        })
      });

      const invitations = userApi.getinvitations();
      invitations.then((data) => {
        dispatch(loadInvitations(data));
      }).catch(() => { })


      socket.emit(socketEvent.online, { token: auth });

      socket.on(socketEvent.updateMemberInfo, (data) => {
        dispatch(updateMemberInfo(data));
      });

      socket.on(socketEvent.joinRoom, async (room) => {
        dispatch(joinRoom(room));
        const data = await messageApi.getMessages(room._id);
        dispatch(loadMessages(data));

      });

      socket.on(socketEvent.addMessage, (message) => {
        dispatch(addMessage(message));
        dispatch(updateLastMessage({ room_id: message.to, lastMessage: message }));
      });

      socket.on(socketEvent.invite, (data) => {
        dispatch(receiveInvitation(data));
      });

      socket.on(socketEvent.updateRoom, (data) => {
        dispatch(changeRoomInfo(data));
      });
      socket.on(socketEvent.updateRoomInfo, (data) => {
        dispatch(changeRoomInfo(data));
      });

      socket.on(socketEvent.updateMessage, (message)=> {
        dispatch(updateMessage(message));
      });
    }
    return () => {
      socket.removeAllListeners();
    }

  }, [])



  return (
    <div >
      {(!auth) && <Auth />}
      {auth && <div>
        <div className={classes.appBar}>
          <ChatAppBar socket={socket} />
        </div>
        <div style={{ display: "flex" }}>
          <SearchRoom socket={socket} />
          <ChatRoom socket={socket} />
        </div>
      </div>}
    </div>
  );
}

export default Chat;

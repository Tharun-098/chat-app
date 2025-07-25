import { createContext, useContext, useEffect, useRef, useState } from "react";
import DataContext from "./DataContext";

const ChatContext = createContext({});

export const ChatProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState([]);
  const [selectUser, setSelectUser] = useState(undefined);
  const [unseenmessage, setUnseenMessage] = useState({});

  const { userr,axios, socket, OnlineUsers } = useContext(DataContext);

  const selectUserRef = useRef();
  useEffect(() => {
    selectUserRef.current = selectUser;
  }, [selectUser]);

  const getUsers = async () => {
    try {
      const { data } = await axios.get("/message/users");
      if (data.success) {
        setUsers(data.user);
        setUnseenMessage(data.unseenmessages);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getUserMessage = async (userId) => {
    try {
      const { data } = await axios.get(`/message/${userId}`);
      if (data.success) {
        setMessage(data.messages);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const sendUserMessage = async (messageData) => {
    try {
      const { data } = await axios.post(`/message/send/${selectUser._id}`, messageData);
      if (data.success) {
        setMessage((prev) => [...prev, data.newmessage]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // ✅ socket message handler — now always uses latest selectUser via ref
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = async (newMessage) => {
      const currentUser = selectUserRef.current;

      if (currentUser && newMessage.senderid === currentUser._id) {
        newMessage.seen = true;
        setMessage((prev) => [...prev, newMessage]);
        await axios.put(`/message/mark/${newMessage._id}`);
      } else {
        setUnseenMessage((prevUnseenMessages) => ({
          ...prevUnseenMessages,
          [newMessage.senderid]: prevUnseenMessages[newMessage.senderid]
            ? prevUnseenMessages[newMessage.senderid] + 1
            : 1,
        }));
      }
    };

    socket.on("newmessage", handleNewMessage);

    return () => {
      socket.off("newmessage", handleNewMessage);
    };
  }, [socket]);

  // Save selected user to localStorage
  useEffect(() => {
    if (selectUser) {
      localStorage.setItem("selectuser", JSON.stringify(selectUser));
    }
  }, [selectUser]);

  useEffect(() => {
    getUsers();
  }, [userr]);
  // Load users + last selected user on mount
  useEffect(() => {
    getUsers();
    const user = localStorage.getItem("selectuser");
    if (user) {
      setSelectUser(JSON.parse(user));
    }
  }, [OnlineUsers]);

  return (
    <ChatContext.Provider
      value={{
        users,
        unseenmessage,
        setUnseenMessage,
        message,
        selectUser,
        setSelectUser,
        getUserMessage,
        sendUserMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContext;

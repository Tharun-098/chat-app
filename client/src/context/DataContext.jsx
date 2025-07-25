import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  
  const [login, setLogin] = useState(false)
  const [chat, setChat] = useState(false);
  const [OnlineUsers, setOnlineUsers] = useState([]);
  const [dark, setDark] = useState(false);
  const [userr, setUserr] = useState(false);
  const [socket, setSocket] = useState(null);
  //const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);


  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);


  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/user/authUser");
      if (data.success) {
        setUserr(data.user);
        connectSocket(data.user);
        setLogin(true)
      } else {
        setUserr(false);
      }
    } catch (error) {
      setUserr(false);
      console.log("Fetch error:", error.message);
    }
    //finally {
    //setLoading(false);
  //}
  };
  
  
  useEffect(() => {
    fetchUser();
  }, []);
  
  
  useEffect(() => {
    console.log("User state updated:", userr);
  }, [userr]);
   
 const connectSocket=(userData)=>{
    if(!userData || socket?.connected) return ;
    const newSocket=io(import.meta.env.VITE_BACKEND_URL,{
      query:{
        userid:userData._id
      }
    })
    newSocket.connect();
    setSocket(newSocket);

    newSocket.on('getOnlineUsers',(userIds)=>{
      setOnlineUsers(userIds)
    })
  }
  
  
  const toggleTheme = () => {
    setDark(!dark);
  };

  return (
    <DataContext.Provider
      value={{
        dark,
        setDark,
        toggleTheme,
        chat,
        setChat,
        login,
        setLogin,
        OnlineUsers,
        setOnlineUsers,
        axios,
        userr,
        setUserr,
        fetchUser,
        connectSocket,
        socket
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;

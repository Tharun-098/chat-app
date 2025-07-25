import React, { useContext, useState } from "react";
import DataContext from "../context/DataContext";
import { Bell, Moon, Plus, Search, Settings, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";
import userIcon from '../assets/user-profile-icon-free-vector.jpg'
import ChatContext from "../context/ChatContext";
import { useEffect } from "react";
const SideBar = () => {
  const {dark,userr,OnlineUsers,setChat,toggleTheme } = useContext(DataContext);
  const {message,users,unseenmessage,selectUser,setSelectUser,setUnseenMessage}=useContext(ChatContext)
  const navigate=useNavigate()
  const [search, setSearch] = useState(undefined);
  //const [lastMessage, setlastmessage] = useState({});
  const filteredContacts = (search ? users.filter(user =>
  user.username.toLowerCase().includes(search.toLowerCase())
) : users).sort((a, b) => b.isOnline - a.isOnline);
  console.log(filteredContacts)
//   useEffect(() => {
//   const getLastMessagesByUser = () => {
//     const contactMessages = {};
//     message.forEach((msg) => {
//       const contactId = msg.senderid === userr._id ? msg.receiverid : msg.senderid;

//       if (
//         !contactMessages[contactId] ||
//         new Date(msg.createdAt) > new Date(contactMessages[contactId].createdAt)
//       ) {
//         contactMessages[contactId] = msg;
//       }
//     });

//     return contactMessages;
//   };

//   const lastMsgs = getLastMessagesByUser();
//   setlastmessage(lastMsgs);
//   console.log(unseenmessage)
// }, [OnlineUsers,message]);

//   function formatTimeAgo(date) {
//   const now = Date.now();
//   const diffMs = now - new Date(date).getTime();
//   const diffMins = Math.floor(diffMs / 60000);

//   if (diffMins < 1) return 'Just now';
//   if (diffMins < 60) return `${diffMins}m ago`;

//   const diffHours = Math.floor(diffMins / 60);
//   if (diffHours < 24) return `${diffHours}h ago`;

//   const diffDays = Math.floor(diffHours / 24);
//   return `${diffDays}d ago`;
// }
return (
    <div className="flex flex-col h-screen min-w-1/3  border-r-1 dark:bg-gray-950 border-gray-300">
      <div className="p-4 border-b-1 dark:border-gray-700 border-gray-300">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-xl dark:text-white">Messages</h1>
          <div className="flex gap-5 items-center" >
            {!dark ? (
              <Moon onClick={toggleTheme} className="w-7 h-7 text-gray-600 hover:bg-gray-300 dark:text-gray-400 p-1 rounded-lg dark:hover:bg-gray-700" />
            ) : (
              <Sun onClick={toggleTheme} className="w-7 h-7 text-gray-600 hover:bg-gray-300 p-1 rounded-lg dark:text-gray-400 dark:hover:bg-gray-700" />
            )}
              <Bell className="w-7 h-7 text-gray-600 hover:bg-gray-300 p-1 rounded-lg dark:text-gray-400 dark:hover:bg-gray-700" />
              <Settings onClick={()=>navigate('/settings')} className="w-7 h-7 text-gray-600 hover:bg-gray-300 p-1 rounded-lg dark:text-gray-400 dark:hover:bg-gray-700" />
          </div>
        </div>
        <div className="my-4">
          <div className="relative text-gray-600">
            <Search className="absolute w-4 h-4 left-3 top-3.5 dark:text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="search messages"
              className="focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 w-full bg-gray-100 outline-0 border-1 dark:text-gray-400 border-gray-300 dark:bg-gray-700 dark:border-gray-600 py-2 pl-8 rounded-md"
            />
          </div>
        </div>
        <div className="w-full bg-gray-100 p-1 rounded-md dark:bg-gray-700">
          <div className="hover:bg-white p-1 text-center rounded-md text-md dark:text-white dark:hover:bg-gray-600 font-semibold">All Chats</div>
        </div>
      </div>
      <div className="flex-auto overflow-y-auto">
        {filteredContacts?.map((contact)=>(
          <div key={contact._id} onClick={()=>{navigate(`chat/${contact._id}`);setChat(true);setSelectUser(contact);setUnseenMessage((prev)=>({...prev,[contact._id]:0}))}} className="flex justify-between p-4 border-gray-300 border-b-1 dark:border-gray-700">
            <div className="flex gap-2 items-center flex-3/4">
              <img src={contact.profilePicture || userIcon} className="w-10 h-10 rounded-full" />
              <div>
                <h1 className="font-semibold text-md dark:text-white">{contact.username}</h1>
                <p className="text-gray-400 text-sm">{OnlineUsers.includes(contact._id)?'online':'offline'}</p>
              </div>
            </div>
            <div className="flex justify-center items-center">
                {(unseenmessage[contact._id] ?? 0) > 0 && (
  <p className="text-sm bg-blue-700 text-white w-6 h-6 rounded-full flex justify-center items-center">
    {unseenmessage[contact._id]}
  </p>
)}
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 flex justify-between items-center border-t-1 dark:border-gray-700 border-gray-300">
        <div className="flex items-center p-2 hover:bg-gray-200 dark:hover:bg-gray-600 hover:rounded-md flex-1 mr-2">
          <img src={userr.profilePicture || userIcon} className="w-8 h-8 border-1 border-gray-300 rounded-full"/>
          <div className="text-sm">
            <p className="font-semibold dark:text-white">{userr?.username || 'your name'}</p>
            <p className='text-gray-400'>{userr.isOnline?'online':'offline'}</p>
          </div>
        </div>
        <Plus onClick={()=>navigate('/userprofile')} className="text-white p-2 rounded-xl w-10 h-10 bg-blue-500 hover:bg-blue-600"/>
      </div>
    </div>
  );
};

export default SideBar;

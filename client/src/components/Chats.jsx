import  { useEffect, useRef, useContext, useState } from "react";
import userIcon from "../assets/user-profile-icon-free-vector.jpg";
import DataContext from "../context/DataContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft,  Image, Send } from "lucide-react";
import ChatContext from "../context/ChatContext";

const Chats = () => {
  const scrollEnd = useRef();
  const containerRef = useRef(null);
  const { setChat, userr, OnlineUsers } = useContext(DataContext);
  const {
    message,
    selectUser,
    setSelectUser,
    getUserMessage,
    sendUserMessage,
  } = useContext(ChatContext);
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  console.log(message);
  function formatTimeAgo(date) {
    const now = Date.now();
    const diffMs = now - new Date(date).getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;

    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  }

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    await sendUserMessage({ text: input.trim() });
    setInput("");
  };

  // Handle sending an image
  const handleSendImage = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      console.log("select an image file");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = async () => {
      await sendUserMessage({ image: reader.result });
      e.target.value = "";
    };

    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (selectUser) {
      getUserMessage(selectUser._id);
    }
  }, [selectUser]);

  const isUserAtBottom = () => {
    const container = containerRef.current;
    return (
      container.scrollHeight - container.scrollTop - container.clientHeight <
      100
    );
  };

  useEffect(() => {
    if (scrollEnd.current && isUserAtBottom()) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [message]);

  return (
    <div className="h-screen flex flex-col">
      <div className="flex items-center gap-2 border-b-1 border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 p-2">
        <ArrowLeft
          onClick={() => {
            navigate("/");
            setChat(false);
            setSelectUser(null);
            localStorage.removeItem("selectuser");
          }}
          className="dark:text-gray-400 text-gray-600"
        />
        <img
          src={selectUser.profilePicture || userIcon}
          className="w-15 h-15 rounded-full"
        />
        <div>
          <h1 className="text-md font-semibold dark:text-white">
            {selectUser.username}
          </h1>
          <p className="text-gray-400 text-sm">
            {OnlineUsers.includes(selectUser._id) ? "online" : "offline"}
          </p>
        </div>
      </div>
      <div className="flex-1 p-2 dark:bg-gray-950" ref={containerRef}>
        {message.map((mess, index) => (
          <div key={index}>
            <div
              className={`flex my-2 ${
                mess.senderid === userr._id ? "items-end" : "items-start"
              } flex-col`}
            >
              {/* Text Message */}
              {mess.text && (
                <p className="max-w-40 md:max-w-100 bg-blue-400 text-sm p-2 rounded-md break-words">
                  {mess.text}
                </p>
              )}

              {/* Image Message */}
              {mess.image && (
                <img
                  src={mess.image}
                  alt="sent"
                  className="max-w-40 md:max-w-100 rounded-md"
                />
              )}

              {/* Time */}
              <p className="dark:text-gray-300 text-sm">
                {formatTimeAgo(mess.createdAt)}
              </p>
            </div>
          </div>
        ))}
        <div ref={scrollEnd}></div>
      </div>

      <div className="p-3 relative dark:bg-gray-950">
        <input
          onKeyDown={(e) => (e.key == "Enter" ? handleSendMessage(e) : null)}
          type="text"
          placeholder="message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="pl-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 w-full outline-0 border border-gray-400 rounded-lg bg-gray-200 p-2"
        />
        <Send
          onClick={handleSendMessage}
          className="w-6 h-6 text-gray-600 absolute top-5.5 right-6"
        />
        <label htmlFor="image-upload">
          <Image className="w-5 h-5 text-gray-600 absolute top-6 left-4 cursor-pointer" />
        </label>
        <input
          type="file"
          id="image-upload"
          accept="image/*"
          className="hidden"
          onChange={handleSendImage}
        />
      </div>
    </div>
  );
};

export default Chats;

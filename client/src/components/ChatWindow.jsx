import React from 'react'
import { MessageCircle } from 'lucide-react'
const ChatWindow = () => {
  return (
    <div className='flex-1 relative overflow-hidden'>
      <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 dark:from-blue-900/40 dark:via-purple-900/40 dark:to-pink-900/40"></div>
          <div className="absolute inset-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center h-screen">
          <div className="text-center max-w-md mx-auto px-6">
            <div className="w-24 h-24 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <MessageCircle className="h-12 w-12 text-blue-500 dark:text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Welcome to ChatFlow
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Select a conversation from the sidebar to start chatting, or create a new conversation to connect with friends and colleagues.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Start New Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    )
}

export default ChatWindow

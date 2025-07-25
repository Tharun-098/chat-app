export const notifications=[
    {
        head:"In-app notifications",
        content:"Show notifications while using the app"
    },
    {
        head:"Push notifications",
        content:"Receive notifications when app is closed"
    },
    {
        head:"Email notifications",
        content:"Get important updates via email"
    },
    {
        head:"Notification sounds",
        content:"Play sounds for incoming messages"
    }
]

export const users=[
    {
        id: "1",
        name: 'Alice Johnson',
        username: 'alice_j',
        profilePicture: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        isOnline: true,
        lastMessage: 'Hey! How are you doing?',
        lastMessageTime: new Date(Date.now() - 10 * 60 * 1000),
        unreadCount: 2,
      },
      {
        id: "2",
        name: 'Bob Smith',
        username: 'bob_smith',
        profilePicture: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        isOnline: false,
        lastMessage: 'Thanks for the help!',
        lastMessageTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
        unreadCount: 0,
      },
      {
        id: "3",
        name: 'Design Team',
        username: 'design_team',
        profilePicture: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        isOnline: true,
        lastMessage: 'Meeting at 3 PM',
        lastMessageTime: new Date(Date.now() - 30 * 60 * 1000),
        unreadCount: 5,
        isGroup: true,
      }
]

export const Message = [
      {
        id: '1',
        text: 'Hey! How are you doing?',
        sender: 'Alice Johnson',
        timestamp: new Date(Date.now() - 10 * 60 * 1000),
        isOwn: false,
      },
      {
        id: '2',
        text: 'I\'m doing great! Just working on some new features.',
        sender: 'You',
        timestamp: new Date(Date.now() - 8 * 60 * 1000),
        isOwn: true,
      },
      {
        id: '3',
        text: 'That sounds exciting! Can you tell me more about it?',
        sender: 'Alice Johnson',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        isOwn: false,
        reactions: ['👍', '😊'],
      },
    ];
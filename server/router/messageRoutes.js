import express from 'express'
import authorization from '../middleware/authUser.js'
import {getAllUsersExcept,selectUserMessages,readMessage, sendMessages} from '../controller/messageRouter.js'
const messageRoutes=express.Router()

messageRoutes.get('/users',authorization,getAllUsersExcept)
messageRoutes.get('/:id',authorization,selectUserMessages)
messageRoutes.put('/mark/:id',authorization,readMessage)
messageRoutes.post('/send/:id',authorization,sendMessages)

export default messageRoutes
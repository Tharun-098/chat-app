import express from 'express'
import { loginUser, logout, registerUser, updateUserProfile, userAuth } from '../controller/userController.js'
import authorization from '../middleware/authUser.js'
import { upload } from '../config/multer.js'
export const userRoutes=express.Router()
userRoutes.post('/register',registerUser)
userRoutes.post('/login',loginUser)
userRoutes.get('/logout',authorization,logout)
userRoutes.get('/authUser',authorization,userAuth)
userRoutes.post('/updateProfile',upload.single('image'),authorization,updateUserProfile)

import express from "express"
import { register,login,logout, getOtherUsers } from "../controllers/userController.js"

import {getAuthenticatedUser} from '../middlewares/getAuthenticatedUser.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/logout',logout)

router.get('/',getAuthenticatedUser, getOtherUsers)

export default router
import express from 'express'
import {createUser, deleteUser, getAllUsers, getOneUser, updateUserInfo} from "../controllers/UsersController.js";

const router = express.Router()

// --> /users/
router.get('/', getAllUsers)
router.get('/:id', getOneUser)
router.post('/', createUser)
router.patch('/:id', updateUserInfo)
router.delete('/:id', deleteUser)

export default router
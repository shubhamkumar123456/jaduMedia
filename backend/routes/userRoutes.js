import express from 'express';
import { deleteUser, loginUser, registerUser, updateUser } from '../controllers/userController.js';
import checkToken from '../middleware/checkToken.js';
const router  = express.Router();



router.post('/create',registerUser)
router.post('/login',loginUser)
router.put('/update',checkToken,updateUser)
router.delete('/delete',checkToken,deleteUser)


export default router
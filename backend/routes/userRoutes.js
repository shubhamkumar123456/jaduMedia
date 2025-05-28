import express from 'express';
import { deleteUser, forgetPassword, loginUser, resetPassword,registerUser, updateUser, updatePassword, searchFriend, getFirend } from '../controllers/userController.js';
import checkToken from '../middleware/checkToken.js';
const router  = express.Router();



router.post('/create',registerUser)
router.post('/login',loginUser)
router.put('/update',checkToken,updateUser)
router.delete('/delete',checkToken,deleteUser)

router.post('/forgetPassword',forgetPassword)
router.get('/resetPassword/:resetToken', resetPassword);
router.put('/updatePassword/:resetToken',updatePassword)

router.get('/searchFriends',checkToken,searchFriend);
router.get('/friend/:friendId', checkToken, getFirend)


export default router
import userCollection from "../models/userCollection.js";
import postCollection from '../models/PostCollection.js'
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import randomstring from "randomstring";

const JWT_SECRET = "Batch10-12SocialApp";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name) {
      return res.status(401).json({ msg: "name is required" });
    }

    if (!email) {
      return res.status(401).json({ msg: "email is required" });
    }

    if (!password) {
      return res.status(401).json({ msg: "password is required" });
    }

    let existingUser = await userCollection.findOne({ email }); // {_id , name ,email ,pass}

    if (existingUser) {
      return res.status(401).json({ msg: "user already registered" });
    }

    let hashPassword = bcrypt.hashSync(password, salt); //$%UYTFGHJKL:LKJHGW%^&*({PJHGCV})

    let data = await userCollection.insertOne({
      name: name,
      email,
      password: hashPassword,
    });

    res.status(201).json({ msg: "user registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(401).json({ msg: "email is required" });
    }

    if (!password) {
      return res.status(401).json({ msg: "password is required" });
    }

    let existingUser = await userCollection.findOne({ email }); // {_id ,name ,email ,pass}

    if (existingUser) {
      let comparePassword = bcrypt.compareSync(password, existingUser.password);
      console.log(comparePassword);
      if (comparePassword) {
        let token = await jwt.sign({ _id: existingUser._id }, JWT_SECRET);
        res
          .status(200)
          .json({ msg: "user log in successfully", token });
      } else {
        return res.status(401).json({ msg: "incorrect password" });
      }
    } else {
      res.status(401).json({ msg: "user not found please register" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getLoggedInUSer = async(req,res)=>{
   try {
     const {_id} = req.user;
    let user = await userCollection.findById(_id).select('-password');
    res.status(200).json({user})
   } catch (error) {
    res.status(500).json({error:error.message})
   }
}

// body ,  params , query , headers--> tokens

const updateUser = async (req, res) => {
  try {
    console.log("req.user = ", req.user);
    const { _id } = req.user;
    const { name, password ,coverPic , profilePic } = req.body;

    if (password) {
      var hashPassword = bcrypt.hashSync(password, salt);
    }
    let user = await userCollection.findByIdAndUpdate(_id, {
      name: name,
      password: hashPassword,
      coverPic,
      profilePic
    });
    res.status(200).json({ msg: "user updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    let { _id } = req.user;
    let user = await userCollection.findByIdAndDelete(_id);
    res.status(200).json({ msg: "user deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    let user = await userCollection.findOne({ email });

    if (user) {
      let resetToken = randomstring.generate(50); //fghjkl;;kjhgfyuioptrtyuiop
      user.resetPasswordToken = resetToken;
      await user.save();

      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "shubhamfarainzi@gmail.com",
          pass: "ztbc wjkl fdtf mbpb",
        },
      });

      // Wrap in an async IIFE so we can use await.
      (async () => {
        const info = await transporter.sendMail({
          from: "shubhamfarainzi@gmail.com",
          to: email,
          subject: "Reset Password Request",
          text: `please click the link below to update password \n http://localhost:8090/users/resetPassword/${resetToken}`, // plain‑text body
        });

        console.log("Message sent:", info.messageId);
      })();

      res
        .status(200)
        .json({ msg: "please check your email for further information" });
    } else {
      return res.status(401).json({ msg: "user not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const resetPassword = async (req, res) => {
  // res.send("hello world")

  const { resetToken } = req.params;
  console.log(resetToken);

  let user = await userCollection.findOne({ resetPasswordToken: resetToken });

  if (user) {
    res.render("passResetPage", { resetToken });
  } else {
    res.status(401).json({ msg: "token expired" });
  }
};

const updatePassword = async (req, res) => {
  const { password } = req.body;
  const { resetToken } = req.params;

  let user = await userCollection.findOne({ resetPasswordToken: resetToken }); //{id name email password}

  if (user) {
    let hashedPassword = bcrypt.hashSync(password, salt);
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    await user.save();

    res.status(200).json({ msg: "password updated successfully" });
  } else {
    res.status(401).json({ msg: "token expired" });
  }
};

const searchFriend = async(req,res)=>{
   try {
     let {name} = req.query
    // let regex = new RegExp();
    if(name.length>0){
    let users = await userCollection.find({name:new RegExp(name)})
    res.status(200).json(users)
    }
    else{
      res.status(200).json([])
    }

   
   } catch (error) {
      res.status(500).json({error:error.message})
   }

}


const getFirend = async(req,res)=>{

    const {friendId} = req.params;
    const friend = await userCollection.findById(friendId).select('-password');
    let friendPosts  =  await postCollection.find({userId:friendId}).populate({path:"userId",select:"name profilePic"}).populate({path:"comment", populate:{path:'userId',select:'name profilePic'}});

    res.status(200).json({msg:"data fetched successfully", friend, friendPosts});

}


const followUnfollowUser = async(req,res)=>{
  try {
     const { _id } = req.user;
   const friendId = req.params.friendId;

   let user = await userCollection.findById(_id)  // your details
   let friend = await userCollection.findById(friendId)  // friend details

   if(user.followings.includes(friendId) && friend.followers.includes(_id)){
      user.followings.pull(friendId)
      friend.followers.pull(_id);
      await user.save()
      await friend.save()
      res.status(200).json({msg:"user unfollow successfully"})
   }
   else{
     user.followings.push(friendId)
      friend.followers.push(_id);
      await user.save()
      await friend.save()
      res.status(200).json({msg:"user follow successfully"})
   }
  } catch (error) {
      res.status(500).json({error:error.message})
  }
}

export {
  registerUser,
  loginUser,
  updatePassword,
  updateUser,
  resetPassword,
  deleteUser,
  forgetPassword,
  searchFriend,
  getFirend,
  followUnfollowUser,
  getLoggedInUSer
};

//  hash  --> not reversable  --> hashing
//  encrypt --> is reversable  --> token

//  a b c   -->   g h i   //  +6 + adding
// l m n  -->   r s t

// g h i

// authentication --> verify who the user is
//  authorization -->  check user have the access or not

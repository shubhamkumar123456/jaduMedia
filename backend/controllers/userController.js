import userCollection from "../models/userCollection.js";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);
import jwt from 'jsonwebtoken'

const JWT_SECRET = 'Batch10-12SocialApp'

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
    const {email , password}   = req.body;
    if (!email) {
        return res.status(401).json({ msg: "email is required" });
      }
  
      if (!password) {
        return res.status(401).json({ msg: "password is required" });
      }

      let existingUser = await userCollection.findOne({email}); // {_id ,name ,email ,pass}

      if(existingUser){
        let comparePassword = bcrypt.compareSync(password , existingUser.password)
        console.log(comparePassword)
        if(comparePassword){
          let token = await jwt.sign({_id:existingUser._id} , JWT_SECRET)
            res.status(200).json({msg:"user log in successfully" , user:existingUser, token})
        }
        else{
            return res.status(401).json({msg:"incorrect password"})
        }
      }

      else{
        res.status(401).json({msg:"user not found please register"})
      }
  } catch (error) {
    res.status(500).json({error:error.message})
  }
};

// body ,  params , query , headers--> tokens

const updateUser = async (req, res) => {

try {
  console.log("req.user = ", req.user)
  const {_id} = req.user
    const {name , password} = req.body;

    if(password){
      var hashPassword = bcrypt.hashSync(password , salt)
    }
    let user = await userCollection.findByIdAndUpdate(_id , {name:name , password:hashPassword}  ) 
    res.status(200).json({msg:"user updated successfully"})
} catch (error) {
  res.status(500).json({msg:error.message})
}

 
};


const deleteUser = async (req, res) => {
  
try {
  let {_id} = req.user
  let user = await userCollection.findByIdAndDelete(_id);
res.status(200).json({msg:"user deleted successfully"})
} catch (error) {
  res.status(500).json({msg:error.message})
}

};

export { registerUser, loginUser, updateUser, deleteUser };

//  hash  --> not reversable  --> hashing
//  encrypt --> is reversable  --> token

//  a b c   -->   g h i   //  +6 + adding
// l m n  -->   r s t

// g h i

// authentication --> verify who the user is
//  authorization -->  check user have the access or not

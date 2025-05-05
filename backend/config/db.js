import mongoose from "mongoose";

async function connectToDb() {
  //     mongoose.connect('mongodb://localhost:27017/jaduMedia')
  //   .then(() => console.log('mongodb connected successsfully'))
  //   .catch(()=>console.log('error in connecting mongodb'))

  try {
    await mongoose.connect("mongodb://0.0.0.0:27017/jaduMedia");
    console.log("mongodb connected successsfully");
  } catch (error) {
    console.log("error in connecting mongodb");
  }
}

export default connectToDb;

require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const Workout = require("./models/Workout");
(async()=>{
  await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/fitness_community");
  const password = await bcrypt.hash("Demo@12345",10);
  const trainer = await User.findOneAndUpdate({email:"trainer@fitcircle.com"},
    {name:"Demo Trainer",email:"trainer@fitcircle.com",password,role:"trainer",category:"Strength"},
    {upsert:true,new:true});
  const member = await User.findOneAndUpdate({email:"member@fitcircle.com"},
    {name:"Demo Member",email:"member@fitcircle.com",password,role:"member",category:"Weight Loss"},
    {upsert:true,new:true});
  await Workout.deleteMany({});
  await Workout.insertMany([
    {title:"Full Body Beginner",description:"Simple full-body routine for new members.",category:"Strength",difficulty:"Beginner",duration:30,createdBy:trainer._id},
    {title:"Cardio Starter",description:"Low-impact cardio session.",category:"Cardio",difficulty:"Beginner",duration:25,createdBy:trainer._id}
  ]);
  console.log("Demo accounts: trainer@fitcircle.com / Demo@12345 and member@fitcircle.com / Demo@12345");
  await mongoose.disconnect();
})();

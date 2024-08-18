import bcrypt from "bcrypt";
import moment from "moment";

import User from "../models/user.model.js";
import { generateToken } from "../JWT/genToken.js";
import cloudinary from 'cloudinary';

export const patientRegister = async (req, res) => {
  const { name, email, password, role, gender, dob, aadharCard, phone } =
    req.body;
  if (
    !name ||
    !email ||
    !password ||
    !role ||
    !dob ||
    !aadharCard ||
    !phone ||
    !gender
  ) {
    return res.status(400).json({ code: 0, error: "All fields are required" });
  }
  if (password.length < 6 || phone.length != 10) {
    return res
      .status(400)
      .json({
        code: 0,
        error:
          "Password should be at least 6 characters long and phone number should be 10 digits long",
      });
  }
  const user = await User.findOne({ email: email });
  if (user) {
    return res.status(400).json({ code: 0, error: "Email already exists" });
  }
  const dobDate = moment(dob, "DD/MM/YYYY").toDate();
  const hashPasword = await bcrypt.hashSync(password, 10);
  const newUser = new User({
    name,
    email,
    password: hashPasword,
    role,
    gender,
    dob: dobDate,
    aadharCard,
    phone,
  });
  if (newUser) {
    generateToken(newUser, res);
    await newUser.save();
    return res
      .status(201)
      .json({ code: 1, msg: "User registered successfully" });
  }
};

export const login = async (req, res) => {
  const { email, password, confirmPassword, role } = req.body;
  try {
    if (!email || !password || !confirmPassword || !role) {
      return res
        .status(400)
        .json({ code: 0, error: "All fields are required" });
    }
    if (password != confirmPassword) {
      return res.status(400).json({ code: 0, error: "Passwords do not match" });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ code: 0, error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ code: 0, error: "Invalid credentials" });
    }
    if (role != user.role) {
      return res
        .status(403)
        .json({
          code: 0,
          error: "You are not authorized to access this resource",
        });
    }
    generateToken(user, res);
    return res
      .status(200)
      .json({ code: 1, msg: "User logged in successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 0, error: "Server error" });
  }
};

export const addNewAdmin = async (req, res) => {
  const { name, email, password, gender, dob, aadharCard, phone } = req.body;
  try {
    if (
      !name ||
      !email ||
      !password ||
      !dob ||
      !aadharCard ||
      !phone ||
      !gender
    ) {
      return res
        .status(400)
        .json({ code: 0, error: "All fields are required" });
    }
    if (password.length < 6 || phone.length !== 10) {
      return res
        .status(400)
        .json({
          code: 0,
          error:
            "Password should be at least 6 characters long and phone number should be 10 digits long",
        });
    }

    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ code: 0, error: "Email already exists" });
    }
    const dobDate = moment(dob, "DD/MM/YYYY").toDate();

    const hashPassword = bcrypt.hashSync(password, 10); // Use bcrypt.hash for async version
    const newAdmin = new User({
      name,
      email,
      password: hashPassword,
      gender,
      dob: dobDate,
      aadharCard,
      phone,
      role: "Admin",
    });

    await newAdmin.save();

    generateToken(newAdmin, res); // Pass the entire user object to handle roles properly

    return res.status(201).json({ code: 1, msg: "Admin added successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 0, error: "Server error" });
  }
};

export const getAllDoctors = async (req, res) => {
  try {
    const doctor = await User.find({ role: "Doctor" });
    if (!doctor) {
      return res.status(200).json({ code: 0, doctors: [] });
    }
    return res.status(200).json({ code: 1, doctors: doctor });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ code: 0, error: " getAllDoctor Server error" });
  }
};

export const getUserDetails = async (req, res) => {
  const user = req.user;
  return res.status(200).json({ code: 1, message: user });
};

export const logoutAdmin = async (req, res) => {
  res.clearCookie("AdminToken");
  return res.status(200).json({ code: 1, message: "Logged out successfully" });
};

export const logoutPatient = async (req, res) => {
  res.clearCookie("PatientToken");
  return res.status(200).json({ code: 1, message: "Logged out successfully" });
};


export const addNewDoctor = async(req,res)=>{
  if(!req.files || Object.keys(req.files).length=== 0 ){
    return res.status(400).json({code:0,error:"No doctor image uploaded"});
  }
  console.log(req.files);
  const {doctorAvatar} = req.files
  const allowedFiles = ['image/png','image/jpg','image/jpeg','image/webp']
  if(!allowedFiles.includes(doctorAvatar.mimetype)){
    return res.status(400).json({code:0,error:"Invalid doctor image format. Only PNG, JPG, JPEG and WebP formats are allowed"});
  }
  const {name,email,password,aadharCard,gender,dob,doctorDepartment,phone} = req.body;
  console.log(req.body);
  try{
    if(!name ||!email ||!password ||!dob ||!doctorDepartment ||!phone ||!gender || !aadharCard){
      return res.status(400).json({code:0,error:"All fields are required"});
    }
    
    if(password.length<6 || phone.length!==10){
      return res.status(400).json({
        code:0,
        error:"Password should be at least 6 characters long and phone number should be 10 digits long",
      });
    }
    const existingDoctor = await User.findOne({email});
    if(existingDoctor){
      return res.status(400).json({code:0,error:`${existingDoctor.role} already exists`});
    }
    const dobDate = moment(dob,"DD/MM/YYYY").toDate();

    const hashPassword = bcrypt.hashSync(password,10);

    const cloudinaryResponse = await cloudinary.uploader.upload(doctorAvatar.tempFilePath);
    if(!cloudinaryResponse){
      console.error("cloudinary error",cloudinaryResponse.error);
    }
    const newDoctor = new User({
      name,
      email,
      password:hashPassword,
      role:"Doctor",
      gender,
      dob:dobDate,
      aadharCard,
      phone,
      doctorAvatar: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
      doctorDepartment,
    })
  
    await newDoctor.save();
    return res.status(200).json({code:1,msg: "new doctor registered succcessfully"})

  }
  catch(error){
    console.log(error);
    return res.status(500).json({code:0,error:"Server error"});
  }
}
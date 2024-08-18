import Message from "../models/message.model.js";
import validator from "validator";

export const sendMessage = async (req, res, next) => {
  const { firstName, lastName, email, phone, message } = req.body;
  try {
    if (!firstName || !lastName || !email || !phone || !message) {
      return res.status(400).json({ code: 0, error: "Please fill all fields" });
    }
    if (firstName.length <= 2 || lastName.length <= 2) {
      return res
        .status(400)
        .json({
          code: 0,
          error: "Fields should be at least 2 characters long",
        });
    }
    if (phone.length !== 10) {
      return res
        .status(400)
        .json({
          code: 0,
          error: "Phone number should be exactly 10 digits and valid",
        });
    }

    if (message.length < 10 || message.length > 100) {
      return res
        .status(400)
        .json({
          code: 0,
          error: "Message should be between 10 and 100 characters long",
        });
    }
    const newMsg = new Message({
      firstName,
      lastName,
      email,
      phone,
      message,
    });
    await newMsg.save();
    return res.status(201).json({ code: 1, msg: "message sent successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ code: 0, error: "error in send message controller" });
  }
};

export const getAllMessages = async(req,res)=>{
  try{
    const messages = await Message.find();
    return res.status(200).json({code:1,messages: messages});
  }catch(error){
    console.log(error);
    return res.status(500).json({code:0,error:"error in get all messages controller"});
  }
}
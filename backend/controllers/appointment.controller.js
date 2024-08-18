import Appointment from "../models/appointment.model.js";
import User from "../models/user.model.js";



export const postAppointment = async(req,res)=>{
  const { name, email, phone, aadharCard, dob, gender, appointmentDate, hasVisited, department, doctor_name, address } = req.body;

try {
  if (!name || !email || !phone || !aadharCard || !dob || !gender || !appointmentDate || !department || !doctor_name || !address) {
    return res.status(400).json({ code: 0, error: 'All fields are required' });
  }

  if (phone.length !== 10) {
    return res.status(400).json({ code: 0, error: 'Invalid phone number' });
  }

  // Convert the date format from DD/MM/YYYY to YYYY-MM-DD
  const [day, month, year] = appointmentDate.split('/');
  const formattedAppointmentDate = `${year}-${month}-${day}`;

  // Check if the appointment date is in the past
  if (new Date(formattedAppointmentDate) < new Date()) {
    return res.status(400).json({ code: 0, error: 'Invalid appointment date' });
  }

  const isConflict = await User.find({
    name: doctor_name,
    role: "Doctor",
    doctorDepartment: department
  });

  if (isConflict.length === 0) {
    return res.status(400).json({ code: 0, error: 'Doctor not found' });
  }

  if (isConflict.length > 1) {
    return res.status(400).json({ code: 0, error: 'Multiple doctors found for the same department. Please contact through email or phone to book an appointment.' });
  }

  const doctorId = isConflict[0]._id;
  const patientId = req.user._id;

  const newAppointment = new Appointment({
    name,
    email,
    phone,
    aadharCard,
    dob,
    gender,
    appointmentDate: formattedAppointmentDate,
    hasVisited,
    department,
    doctor: {
      name: doctor_name,
    },
    doctorId,
    patientId,
    address
  });

  await newAppointment.save();
  return res.status(201).json({ code: 1, message: "Appointment posted successfully" });
} catch (error) {
  console.log(error);
  return res.status(500).json({ code: 0, message: "Server error" });
}

}

export const getAllAppointments = async(req,res)=>{
  try{
    const appointments = await Appointment.find();
    return res.status(200).json({ code: 1, appointments: appointments });
  }catch(error){
    console.log(error);
    return res.status(500).json({ code: 0, message: "Server error" });
  }
}

export const getMyAppointments = async(req,res)=>{
  try{
    const appointments = await Appointment.find({ doctorId: req.user._id });
    return res.status(200).json({ code: 1, appointments: appointments });
  }
  catch(err){
    console.log(err);
    return res.status(500).json({ code: 0, message: "Server error" });
  }
}

export const updateAppointment = async(req,res)=>{
  const {id} = req.params;
  try {
    let appointment = await Appointment.findById(id);
  if(!appointment){
    return res.status(404).json({ code: 0, message: "Appointment not found" });
  }
  appointment = await Appointment.findById(appointment.id,req.body);
  return res.status(200).json({ code: 1, appointments: appointment });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 0, message: "Server error" });
  }
}

export const deleteAppointment = async(req,res)=>{
  const{id} = req.params;
  try {
    let appointment = await Appointment.findById(id);
    if(!appointment){
      return res.status(404).json({ code: 0, message: "Appointment not found" });
    }
    await appointment.deleteOne();
    res.status(200).json({ code: 1, message: "Appointment deleted"});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 0, message: "Server error" });
  }
}
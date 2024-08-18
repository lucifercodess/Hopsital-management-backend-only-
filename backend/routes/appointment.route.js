import express from "express";
import { deleteAppointment, getAllAppointments, getMyAppointments, postAppointment, updateAppointment } from "../controllers/appointment.controller.js";
import { isAdminAuthenticated, isDoctorAuthenticated, isPatientAuthenticated } from "../middleware/protectRoute.middleware.js";

const router = express.Router();


router.post("/post",isPatientAuthenticated,postAppointment)
router.get("/",isAdminAuthenticated,getAllAppointments)
router.get("/doctor/appointments",isDoctorAuthenticated,getMyAppointments)
router.put("/update/:id",isAdminAuthenticated,updateAppointment);
router.delete("/delete/:id",isAdminAuthenticated,deleteAppointment);

export default router;


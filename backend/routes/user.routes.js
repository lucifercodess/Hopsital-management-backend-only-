import express from "express";
import {
  addNewAdmin,
  addNewDoctor,
  getAllDoctors,
  getUserDetails,
  login,
  logoutAdmin,
  logoutPatient,
  patientRegister,
} from "../controllers/user.controller.js";
import {
  isAdminAuthenticated,
  isPatientAuthenticated,
} from "../middleware/protectRoute.middleware.js";

const router = express.Router();

router.post("/patient/register", patientRegister);
router.post("/login", login);
router.post("/patient/logout", isPatientAuthenticated, logoutPatient);
router.post("/admin/logout", isAdminAuthenticated, logoutAdmin);

router.post("/admin/addNew", isAdminAuthenticated, addNewAdmin);
router.get("/patient/me", isPatientAuthenticated, getUserDetails);
router.get("/admin/me", isAdminAuthenticated, getUserDetails);
router.post("/doctor/addNew", isAdminAuthenticated, addNewDoctor);
router.get("/doctors", getAllDoctors);

export default router;

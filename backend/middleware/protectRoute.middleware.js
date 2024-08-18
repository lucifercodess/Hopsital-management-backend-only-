import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
export const isAdminAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.AdminToken;
    if (!token) {
      return res
        .status(401)
        .json({ code: 0, error: "Unauthorized, please login as admin" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      return res.status(403).json({ code: 0, error: "Invalid admin token" });
    }
    req.user = await User.findById(decoded.userId);
    if (req.user.role !== "Admin") {
      return res
        .status(403)
        .json({
          code: 0,
          error: "You are not authorized to access this resource",
        });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 0, error: "Server error" });
  }
};
export const isPatientAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.PatientToken;
    if (!token) {
      return res
        .status(401)
        .json({ code: 0, error: "Unauthorized, please login as patient" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      return res.status(403).json({ code: 0, error: "Invalid patient token" });
    }
    req.user = await User.findById(decoded.userId);
    if (req.user.role !== "Patient") {
      return res
        .status(403)
        .json({
          code: 0,
          error: "You are not authorized to access this resource",
        });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 0, error: "Server error" });
  }
};

export const isDoctorAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.DoctorToken;
    if (!token) {
      return res
        .status(401)
        .json({ code: 0, error: "Unauthorized, please login as Doctor" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      return res.status(403).json({ code: 0, error: "Invalid patient token" });
    }
    req.user = await User.findById(decoded.userId);
    if (req.user.role !== "Doctor") {
      return res
        .status(403)
        .json({
          code: 0,
          error: "You are not authorized to access this resource",
        });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 0, error: "Server error" });
  }
};


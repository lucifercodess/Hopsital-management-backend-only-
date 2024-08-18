import jwt from "jsonwebtoken";
export const generateToken = async (user, res) => {
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
  let cookieName;
  if(user.role === 'Admin'){
    cookieName = "AdminToken";
  }
  else if(user.role === 'Patient'){
    cookieName = "PatientToken";
  }
  else if (user.role === "Doctor"){
    cookieName = "DoctorToken";
  }
  console.log("Setting cookie:", cookieName); // Debugging line
  console.log(user.role);
  res.cookie(cookieName, token, {
    expires: new Date(Date.now() + 86400000), // 1 day
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Secure in production
    sameSite: "none", // Cross-site cookies
  });
};

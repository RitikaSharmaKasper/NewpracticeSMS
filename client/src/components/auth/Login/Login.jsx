// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import api from "../services/axiosInstance";
// import { useAuth } from "../context/AuthContext";

// const Login = () => {
//   const navigate = useNavigate();
//   const { setUser } = useAuth();
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
    
//     try {
//       const response = await api.post("/auth/login", formData);
      
//       // User data is automatically in cookie from server
//       // We just need to update the context
//       if (response.data.user) {
//         setUser(response.data.user);
//         toast.success("Login successful!");
//         navigate("/dashboard");
//       } else if (response.data.twoFactor) {
//         // Handle 2FA flow
//         navigate("/otp", { state: { email: response.data.email } });
//       }
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || "Login failed";
//       toast.error(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       {/* Your login form JSX */}
//       <input
//         type="text"
//         placeholder="Username/Email/Student ID"
//         value={formData.username}
//         onChange={(e) => setFormData({ ...formData, username: e.target.value })}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={formData.password}
//         onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//       />
//       <button type="submit" disabled={loading}>
//         {loading ? "Logging in..." : "Login"}
//       </button>
//     </form>
//   );
// };

// export default Login;
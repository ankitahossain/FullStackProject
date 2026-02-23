import { useState } from "react"; // Removed the duplicate line
import axios from "axios";
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from "../features/auth/authSlice";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Line 17 starts the logic here
      const response = await axios.post(
        "http://localhost:4000/auth/login",
        { email, password }
      );
      
      console.log("RESPONSE DATA:", response.data);

      // Ensure your backend sends the user/token in response.data
      dispatch(loginSuccess(response.data));
      alert("Login successful!");
      navigate("/dashboard");

    } catch (error: any) {
      console.error("Login Error:", error.response);
      // This helps catch if the server is down or rejecting credentials
      const errorMessage = error.response?.data?.message || "Login failed - Server might be unreachable";
      alert(errorMessage);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>

        <TextField
          fullWidth
          margin="normal"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button 
          variant="contained" 
          fullWidth 
          onClick={handleLogin}
          sx={{ mt: 3, mb: 2 }}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default LoginPage;
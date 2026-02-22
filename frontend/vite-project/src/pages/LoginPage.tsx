import {useState} from 'react';
import axios from "axios";
import { TextField,Button,Container,Typography} from '@mui/material';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { loginSuccess} from "../features/authSlice";

const LoginPage = ()=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

   const navigate = useNavigate(); 

    const handleLogin = async() =>{
    try{
        const response = await axios.post(
            "http://localhost:4000/auth/login",
        {
            email,password,
        }
        )
        console.log("RESPONSE DATA:",response.data);

        dispatch(loginSuccess(response.data));
        alert("Login successfull!")
        navigate("/dashboard")

    }
    catch(error:any){
       console.log(error.response);
       alert(error.response?.data?.message || "Login failed");
    }
}
    return(
         <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>

      <TextField
        fullWidth
        margin="normal"
        label="Email"
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

      <Button variant="contained" fullWidth onClick={handleLogin}>
        Login
      </Button>
         </Container>
    )
}


export default LoginPage;
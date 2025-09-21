"use client";
import AuthService from "@/libs/AuthService";
import { RegisterForm } from "@/types/RegisterForm";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Input,
  Stack,
  Button,
  Alert,
} from "@mui/material";
import { useState } from "react";

export default function RegisterPage() {
  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    setError("");

    if (registerForm.password !== registerForm.confirmPassword) {
      setError("รหัสผ่านไม่ตรงกัน");
      return;
    }

    const data: RegisterForm = {
      username: registerForm.username,
      email: registerForm.email,
      password: registerForm.password,
    };

    try {
      await AuthService.register(data);
      window.location.href = "/login";
    } catch (err) {
      setError("ไม่สามารถสมัครสมาชิกได้");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Card>
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="h5">Register Page</Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <Input
              name="username"
              placeholder="Username"
              value={registerForm.username}
              onChange={handleChange}
              fullWidth
            />
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={registerForm.email}
              onChange={handleChange}
              fullWidth
            />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={registerForm.password}
              onChange={handleChange}
              fullWidth
            />
            <Input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={registerForm.confirmPassword}
              onChange={handleChange}
              fullWidth
            />
            <Button onClick={handleRegister} variant="contained" fullWidth>
              Register
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}

"use client";
import AuthService from "@/libs/AuthService";
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

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    setError("");
    try {
      const user = await AuthService.login(form);
      localStorage.setItem("user", JSON.stringify(user));
      window.location.href = "/";
    } catch (err) {
      setError("เข้าสู่ระบบไม่สำเร็จ");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Card>
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="h5">Login Page</Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              fullWidth
            />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              fullWidth
            />
            <Button onClick={handleLogin} variant="contained" fullWidth>
              Login
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}

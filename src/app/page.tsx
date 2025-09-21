"use client";

import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Stack,
} from "@mui/material";
import Link from "next/link";
import type { BookResponse, Book } from "@/types/book";

export default function Home() {
  const [booksData, setBooksData] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  const getData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/books");
      if (response.ok) {
        const data: BookResponse = await response.json();
        setBooksData(data.books);
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <Container sx={{ py: 5 }}>
      {user ? (
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 3 }}
        >
          <Typography variant="h6">
            👋 สวัสดี {user.user?.username} ({user.user?.email})
          </Typography>
          <Button onClick={handleLogout} variant="outlined" color="error">
            ออกจากระบบ
          </Button>
        </Stack>
      ) : (
        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          <Button component={Link} href="/register" variant="contained">
            สมัครสมาชิก
          </Button>
          <Button component={Link} href="/login" variant="outlined">
            เข้าสู่ระบบ
          </Button>
        </Stack>
      )}

      <Typography variant="h3" gutterBottom textAlign="center" sx={{ mb: 4 }}>
        📚 หนังสือทั้งหมด
      </Typography>

      {isLoading && <Typography textAlign="center">Loading...</Typography>}

      <Grid container spacing={4}>
        {booksData.map((book) => (
          <Grid key={book._id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Link href={`/book/${book._id}`} style={{ textDecoration: "none" }}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "0.3s",
                  "&:hover": { transform: "scale(1.03)", boxShadow: 6 },
                  cursor: "pointer",
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={`https://picsum.photos/200/300?random=${book._id}`}
                  alt={book.title}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {book.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ผู้แต่ง: {book.author}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

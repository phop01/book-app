"use client";

import { useEffect, useState } from "react";
import { Container, Typography, Card, CardContent, CardMedia, Box } from "@mui/material";
import { Grid } from "@mui/material";
import type { BookResponse, Book } from "../types/book";
import Link from "next/link";

export default function Home() {
  const [booksData, setBooksData] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/books");
      if (response.ok) {
        const data: BookResponse = await response.json();
        setBooksData(data.books);
      } else {
        console.error("Failed to fetch books");
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h3" gutterBottom textAlign="center" sx={{ mb: 4 }}>
        📚 หนังสือทั้งหมด
      </Typography>

      {isLoading && <Typography textAlign="center">Loading...</Typography>}

      <Grid container spacing={4}>
        {booksData.map((book) => ( 
          <Grid key={book._id}>
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
                {/* ถ้ามีรูปปกหนังสือ ให้ใส่ใน CardMedia */}
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

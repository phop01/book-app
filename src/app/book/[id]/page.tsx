"use client";
import { Book } from "@/types/book";
import { Box, Container, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
export default function page() {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3000/api/books/${id}`);
      if (response.ok) {
        const data = await response.json();
        const _book: Book = data["book"];
        setBook(_book);
      }
    };
    if (id !== undefined) {
      fetchData();
    }
  }, [id]);

  return (
    <Container maxWidth="md">
      {book && (
        <Box>
          <Typography variant="h2">{book.title}</Typography>
          <Typography variant="body1">{book.description}</Typography>
        </Box>
      )}
    </Container>
  );
}

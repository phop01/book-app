"use client";

import { Book } from "@/types/book";
import { Container, Typography, Paper, Divider, Grid, Chip, Box } from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:3000/api/books/${id}`);
        if (res.ok) {
          const data = await res.json();
          setBook(data.book);
        } else {
          console.error("Failed to fetch book");
        }
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    if (id) fetchBook();
  }, [id]);

  if (loading || !book) {
    return <Typography textAlign="center" mt={4}>Loading...</Typography>;
  }

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 5 }}>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, mb: 3, gap: 3 }}>
          {/* รูปปกหนังสือ */}
          <Box sx={{ flexShrink: 0 }}>
            <img
              src={`https://picsum.photos/200/300?random=${book._id}`}
              alt={book.title}
              style={{ width: 200, borderRadius: 8 }}
            />
          </Box>

          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h4" gutterBottom>{book.title}</Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>ผู้แต่ง: {book.author}</Typography>
            <Typography variant="body1">{book.description}</Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={2}>
          <Grid size={{ xs: 4}}><b>ประเภท:</b> {book.genre}</Grid>
          <Grid size={{ xs: 4}}><b>ปีที่พิมพ์:</b> {book.year}</Grid>
          <Grid size={{ xs: 4}}><b>ราคา:</b> {book.price} บาท</Grid>
          <Grid size={{ xs: 4}}>
            <b>สถานะ:</b>{" "}
            <Chip
              label={book.available ? "มีจำหน่าย" : "หมด"}
              color={book.available ? "success" : "error"}
              size="small"
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Typography variant="subtitle2">
          เพิ่มโดย: {book.addedBy?.username} ({book.addedBy?.email})
        </Typography>
        <Typography variant="caption" display="block">
          สร้างเมื่อ: {new Date(book.createdAt).toLocaleString()}
        </Typography>
        <Typography variant="caption" display="block">
          แก้ไขล่าสุด: {new Date(book.updatedAt).toLocaleString()}
        </Typography>
      </Paper>
    </Container>
  );
}

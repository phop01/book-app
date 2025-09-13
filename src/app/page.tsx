"use client";
import { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import type { BookResponse, Book } from "../types/book";
import Link from "next/link";

export default function Home() {
  const [booksData, setBooksData] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
    // Fetch data from the API
    const response = await fetch("http://localhost:3000/api/books");
    if (response.ok) {
      const data = await response.json();
      const resData: BookResponse = data;
      const books = resData.books;
      setBooksData(books);
    }
  };

  //React hook to fetch data on component mount
  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <Typography variant="h1">Hello World</Typography>
      {isLoading && <Typography>Loading...</Typography>}
      {booksData &&
        booksData.map((book) => {
          return (
            //localhost:3000/book/12345
            <Link href={`/book/${book._id}`} key={book._id}>
              <Typography key={book._id}>{book.title}</Typography>
            </Link>
          );
        })}
    </Container>
  );
}

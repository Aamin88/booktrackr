import "./App.css";

import instance from "./config/axios";
import { Card, Pagination } from "./components";

import { useLoaderData } from "react-router-dom";
import { useState, useMemo } from "react";

export async function loader() {
  try {
    const res = await instance.get("/");
    const books = res.data.books;
    return books;
  } catch (error) {
    return error.message;
  }
}

export async function action() {}

function App() {
  const books = useLoaderData();

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const currentBooksData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return books.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, books]);

  return (
    <div className="books">
      <div className="books__container section__padding section__margin">
        <div className="books__container-header">
          <h2 className="section__heading">All books</h2>
          <p className="section__text">
            Just go through the list of books to find the book that best suit
            your reading interests.
          </p>
        </div>
        <div className="books__container-content">
          {books.length === 0 ? (
            <p className="no__books section__text">
              No books on display, however you can add some books.
            </p>
          ) : (
            currentBooksData?.map((book, idx) => {
              return <Card book={book} key={idx} />;
            })
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalCount={books.length}
          pageSize={pageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}

export default App;

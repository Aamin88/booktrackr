import "./index.css";
import { data } from "../../../public/features.js";

import instance from "../../config/axios";

import { useLoaderData, useNavigate, Form, Link } from "react-router-dom";
import { Card, Spinner, Feature } from "../../components";

// imgs
import cover from "../../assets/header-cover.png";

export async function action({ request, params }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data, formData.get("fName"));
  return null;
}

export async function loader() {
  const res = await instance.get("/");
  const data = res.data;

  // recommendations => selects three books randomly
  const getBookRecommendation = (books, numberOfRecommendations) => {
    const shuffled = books.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numberOfRecommendations);
  };
  const books = getBookRecommendation(data?.books, 4);
  return { books };
}

function Home() {
  const { books } = useLoaderData();

  console.log(books);
  const navigate = useNavigate();

  if (navigate.state == "loading" || navigate.state === "pending") {
    return (
      <div className="home">
        <div className="home__container section__padding">
          <Spinner />
        </div>
      </div>
    );
  }

  return (
    <div className="home">
      <div className="home__container section__padding">
        <div className="home__container-header section__margin">
          <div className="home__container-header_illustration">
            <div className="header__container-header_illustration-text">
              <h1 className="page__heading">Welcome to Booktrackr</h1>
              <p>
                At Booktrackr, we believe in the magic of sharing stories. Our
                platform is designed for book lovers like you to keep track of
                your reading adventures and share your favorite books with
                others. Whether you&apos;ve just finished an unforgettable novel
                or discovered a hidden gem, your recommendations can help fellow
                readers find their next great read.
              </p>

              <Link to={"/add"} className="main__btn">
                Add a book
              </Link>
            </div>
            <div className="home__container-header_illustration-img">
              <img src={cover} alt="header cover" />
            </div>
          </div>
        </div>

        <div className="home__container-content ">
          {/* how it works */}
          <div className="home__container-content_howitworks section__margin">
            <h3 className="section__heading">How it works</h3>
            <div className="home__container-content_howitworks-items ">
              {data?.map((info, idx) => (
                <Feature key={idx} data={info} />
              ))}
            </div>
          </div>

          {/* 
          some in collection 
          - render section based on the books in store
           - if no books dont render
           - should be random
          */}
          <div className="home__container-content_books section__margin">
            <h3 className="section__heading">Some books in the collections</h3>
            <div className="home__container-content_books-content">
              {books.length == 0 ? (
                <p className="section__text">No books on records</p>
              ) : (
                books.slice(0, 6)?.map((book, idx) => {
                  return <Card key={idx} book={book} />;
                })
              )}
            </div>
          </div>

          {/* join our reading community */}
          <div className="home__container-content_community section__margin">
            <h3 className="section__heading">Join Our Reading Community</h3>
            <div className="home__container-content_community-info">
              <p className="section__text">
                Book Haven is more than just a tracking tool—it&apos;s a vibrant
                community of readers who love to share and discover new books.
                Connect with others, exchange recommendations, and dive into
                discussions about your favorite reads.
              </p>
            </div>
          </div>
          {/* start sharing */}
          <div className="home__container-content_share section__margin">
            <h3 className="section__heading">Start Sharing Today</h3>
            <div className="home__container-content_share-info">
              <p className="section__text">
                Ready to make your mark in the reading world? Sign up now and
                start adding books to your personal library. Your next favorite
                read—and a community of fellow book enthusiasts—awaits.
              </p>
            </div>
          </div>
          {/* About us */}
          <div className="home__container-content_aboutus section__margin">
            <h3 className="section__heading">About us</h3>
            <div className="home__container-content_aboutus-info">
              <p className="section__text">
                Created by a team of passionate readers, Book Haven is dedicated
                to fostering a love of reading and the joy of sharing stories.
                We believe that every book recommendation has the potential to
                spark a new adventure, and we&apos;re excited to see what
                you&apos;ll share.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

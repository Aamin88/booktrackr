import "./home.css";
import { data } from "../../data/features";

import { useLoaderData, useNavigate, Link } from "react-router-dom";
import { Card, Spinner, Feature } from "../../components";

// imgs
import cover from "../../assets/header-cover.png";

function Home() {
  const { books } = useLoaderData();

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
                At Booktrackr, we believe in the magic of sharing stories. The
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
                Booktrackr is more than just a tracking tool—it&apos;s a vibrant
                community of readers who love to share and discover new books.
                Connect with others through a books title, exchange
                recommendations, and dive into discussions about your favorite
                reads.
              </p>
            </div>
          </div>
          {/* start sharing */}
          <div className="home__container-content_share section__margin">
            <h3 className="section__heading">Start Sharing Today</h3>
            <div className="home__container-content_share-info">
              <p className="section__text">
                Ready to make your mark in the reading world? Start adding books
                to the library. Your next favorite read—and a community of
                fellow book enthusiasts—awaits.
              </p>
            </div>
          </div>
          {/* About us */}
          <div className="home__container-content_aboutus section__margin">
            <h3 className="section__heading">About us</h3>
            <div className="home__container-content_aboutus-info">
              <p className="section__text">
                Created by a team of passionate readers, Booktrackrs is
                dedicated to fostering a love of reading and the joy of sharing
                stories. We believe that every book recommendation has the
                potential to spark a new adventure, and we&apos;re excited to
                see what you&apos;ll share.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

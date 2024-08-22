import "./BookDetailPage.css";
import { FaPlusSquare, FaMinusSquare } from "react-icons/fa";
import cover from "../../assets/cover.jpg";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";

const BookDetailPage = () => {
  const { book, summary } = useLoaderData();

  const bookSummary = summary?.summary[0];

  console.log(book);

  const [activeIndex, setActiveIndex] = useState(null);
  const [audienceToogle, setAudienceToggle] = useState(false);

  const handleAccordionClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  const toogleAudience = () => {
    setAudienceToggle(!audienceToogle);
  };

  return (
    <div className="book__details section__padding">
      <div className="book__details-cover">
        <img src={book?.coverImg || cover} alt={book?.title} />
      </div>
      <div className="book__details-content">
        <h1 className="book__details-title section__heading">{book?.title}</h1>
        <p className="book__details-author leading__text">by {book?.author}</p>
        <p className="book__details-summary ">{bookSummary?.overall_summary}</p>
        {/*  */}
        <div
          className={`book__details-audience ${audienceToogle ? "active" : ""}`}
          onClick={() => toogleAudience()}
        >
          <div className="book__details-audience_title">
            <h3>Audience</h3>
            <span>{audienceToogle ? <FaMinusSquare /> : <FaPlusSquare />}</span>
          </div>
          <p className="book__details-summary ">
            {audienceToogle && bookSummary?.target_audience}
          </p>
        </div>
        {/*  */}
        <div className="book__details-chapters">
          <h2>Chapters</h2>

          {bookSummary?.chapter_summary.length !== 0 &&
            bookSummary?.chapter_summary.map((chapter, idx) => {
              return (
                <div
                  key={idx}
                  className={`book__details-chapter ${
                    activeIndex === idx ? "active" : ""
                  }`}
                  onClick={() => handleAccordionClick(idx)}
                >
                  <div className="book__details-chapter_title">
                    <h3>{chapter.chapter}</h3>
                    <span>
                      {activeIndex === idx ? (
                        <FaMinusSquare />
                      ) : (
                        <FaPlusSquare />
                      )}
                    </span>
                  </div>
                  {activeIndex === idx && (
                    <ul className="book__details-chapter_content ">
                      <p className="book__details-chapter_explain section__text">
                        {chapter.description}
                      </p>
                      <div className="book__details-chapter_content-points">
                        <h5>Key Lessons</h5>
                        {bookSummary.length !== 0 &&
                          bookSummary?.key_lessons.key_lessons.map(
                            (lesson, id) => {
                              return (
                                <div key={id} className="lesson">
                                  <li>{lesson.concept}</li>
                                  <p>{lesson.description}</p>
                                </div>
                              );
                            }
                          )}
                      </div>
                    </ul>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;

{
  /* {activeIndex === idx && (
                  <ul className="book__details-chapter_content ">
                    <p className="book__details-chapter_explain section__text">
                      {chapter.contextual_explanation}
                    </p>
                    <div className="book__details-chapter_content-points">
                      <h5>Main Concepts</h5>
                      {chapter.main_concepts.map((concept, id) => (
                        <li key={id}>{concept}</li>
                      ))}
                    </div>
                    <div className="book__details-chapter_content-points">
                      <h5>Key Lessons</h5>
                      {chapter.key_lessons.map((lesson, id) => (
                        <li key={id}>{lesson}</li>
                      ))}
                    </div>
                  </ul>
                )} */
}

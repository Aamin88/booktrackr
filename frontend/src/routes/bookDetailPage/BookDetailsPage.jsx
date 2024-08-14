import "./BookDetailPage.css";
import { FaPlusSquare, FaMinusSquare } from "react-icons/fa";
import cover from "../../assets/cover.jpg";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";

const BookDetailPage = () => {
  const {
    _id,
    title,
    author,
    dateOfPublication,
    description,
    aiText,
    genre,
    coverImg,
    createdAt,
    updatedAt,
  } = useLoaderData();

  console.log(
    _id,
    title,
    author,
    dateOfPublication,
    description,
    aiText,
    genre,
    coverImg,
    createdAt,
    updatedAt
  );

  const [activeIndex, setActiveIndex] = useState(null);

  const handleAccordionClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="book__details section__padding">
      <div className="book__details-cover">
        <img src={coverImg || cover} alt={title} />
      </div>
      <div className="book__details-content">
        <h1 className="book__details-title section__heading">{title}</h1>
        <p className="book__details-author leading__text">by {author}</p>
        <p className="book__details-summary ">{aiText.overall_summary}</p>
        <div className="book__details-chapters">
          <h2>Chapters</h2>

          {aiText.chapters.map((chapter, idx) => {
            return (
              <div
                key={idx}
                className={`book__details-chapter ${
                  activeIndex === idx ? "active" : ""
                }`}
                onClick={() => handleAccordionClick(idx)}
              >
                <div className="book__details-chapter_title">
                  <h3>{chapter.title}</h3>
                  <span>
                    {activeIndex === idx ? <FaMinusSquare /> : <FaPlusSquare />}
                  </span>
                </div>
                {activeIndex === idx && (
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

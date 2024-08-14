# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
  [x] - add predictions model for the most popular book by clicks.
  [x] - where to buy the book from.

<!--  -->

- revamp home page and make it responsive
- add recapcha on the add form and make the form responsive
- make all page remove and integrate AI with the book detail page to generate

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

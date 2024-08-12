import "./card.css";
import coverImg from "../../assets/cover.jpg";
import { Link } from "react-router-dom";

import useEllipsisText from "../../utils/EllipsisText";

function Card({ book }) {
  // truncate long text
  const ellipsis = useEllipsisText();

  const { _id, title, author, coverImg: img, description } = book;
  return (
    <Link to={`/${_id}`}>
      <article className="card">
        <div className="card__container">
          <img src={img || coverImg} draggable={"false"} />
          <div className="card__container-details">
            <div className="card__container-details_title">
              <h4>{ellipsis(title)}</h4>
            </div>
            <div className="card__container-details_author">
              <small>{author}</small>
            </div>
            <div className="card__container-details_description">
              <p>{description}</p>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default Card;

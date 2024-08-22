import { useNavigate, useLocation } from "react-router-dom";
import "./Error.css";
import errImg from "../../assets/errImg.jpg";

function Notfound() {
  const navigate = useNavigate();

  const location = useLocation();

  const from = location.state?.from?.pathname || "/books";

  return (
    <div>
      <div className="error__page">
        <div className="error__page-container section__padding">
          <h2 className="error__page-container_title">Oops!</h2>
          <p className="error__page-container_info">Resource Not Found</p>
          <img src={errImg} alt="error illustration" />
          <p className="error__page-container_status"></p>
          <button className="main__btn" onClick={() => navigate(from)}>
            Go back
          </button>
        </div>
      </div>
    </div>
  );
}

export default Notfound;

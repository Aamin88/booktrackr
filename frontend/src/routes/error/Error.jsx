import { useNavigate, useRouteError } from "react-router-dom";
import "./Error.css";
import errImg from "../../assets/errImg.jpg";

function Error() {
  const navigate = useNavigate();

  const error = useRouteError();
  return (
    <div>
      <div className="error__page">
        <div className="error__page-container section__padding">
          <h2 className="error__page-container_title">Oops!</h2>
          <p className="error__page-container_info">
            Something unexpected occurred
          </p>
          <img src={errImg} alt="error illustration" />
          <p className="error__page-container_status">
            {error.statusText || error.message}
          </p>
          <button className="main__btn" onClick={() => navigate(-1)}>
            Go back
          </button>
        </div>
      </div>
    </div>
  );
}

export default Error;

import "./feature.css";

function Feature({ data }) {
  return (
    <div className="feature">
      <div className="feature__container">
        <div className="feature__container-icon">
          <data.icon size={32} />
        </div>
        <div className="feature__container-text">
          <div className="feature__container-text_title">
            <h4>{data?.title}</h4>
          </div>
          <p className="section__text">{data?.desc}</p>
        </div>
      </div>
    </div>
  );
}

export default Feature;

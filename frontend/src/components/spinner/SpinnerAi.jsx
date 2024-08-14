import "./spinnerai.css";
function SpinnerAi() {
  return (
    <div className="spinner__container">
      <div className="spinner">
        <div className="loader"></div>
      </div>
      <h5 className="text">Getting book summary from Gemini</h5>
    </div>
  );
}

export default SpinnerAi;

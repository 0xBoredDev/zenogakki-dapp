import { useNavigate } from "react-router-dom";
import throne from "../../images/throne.png";
import arrow from "../../images/arrow.png";

function RafflePage() {
  const navigate = useNavigate();

  function toDashboard() {
    var arrow = document.getElementById("arrow");
    arrow.classList.add("flash");
    setTimeout(() => {
      navigate("/raffle/dashboard");
    }, 2000);
  }

  return (
    <main>
      <div className="relative lg:block h-screen w-full overflow-hidden">
        <div
          className="overflow-hidden bg-black aspect-[4250/2490] min-h-screen min-w-[100vw] absolute transform -translate-x-1/2 -translate-y-1/2"
          id="mouse-parallax-container"
          style={{
            overflow: "hidden",
            position: "relative",
            top: "50%",
            left: "50%",
          }}
        >
          <div style={{ willChange: "transform" }}>
            <img
              height="100%"
              className="absolute throne-ratio"
              src={throne}
              alt="throne raffle room"
            />
            <img
              height="100%"
              className="absolute"
              id="arrow"
              src={arrow}
              onClick={toDashboard}
              alt="arrow to enter"
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default RafflePage;

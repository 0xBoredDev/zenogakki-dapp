import { useContext } from "react";
import { Link } from "react-router-dom";
// import gem from "../images/gem.png";
import menu_light from "../images/menu_light.png";
import menu_dark from "../images/menu_dark.png";
import gem from "../images/gem3.png";
import { FaTwitter, FaDiscord } from "react-icons/fa";
import { GiSailboat } from "react-icons/gi";
import { themeContext } from "../App";
import themes from "../helpers/themes";

const Menu = () => {
  const theme = useContext(themeContext).theme;
  return (
    <div
      className={`offcanvas offcanvas-start`}
      tabIndex="-1"
      id="sideMenu"
      aria-labelledby="sideMenuLabel"
    >
      <img
        src={theme == themes.DARK ? menu_dark : menu_light}
        className="menu-bg"
      />
      <div className="offcanvas-body">
        <div className="flex flex-row h-full">
          <div className="basis-0 sm:basis-1/4 relative">
            {/* <div className="menu-spinners">
              <img
                src={menu_spinner1}
                className="menu-spinner"
                style={{ top: "30%", left: "5%", width: "250px" }}
              />
              <img
                src={menu_spinner3}
                className="menu-spinner"
                style={{ top: "5%", left: "1%", width: "9rem" }}
              />
              <img
                src={menu_spinner2}
                className="menu-spinner-reverse"
                style={{ top: "4%", left: "60%", width: "8rem" }}
              />
              <img
                src={menu_spinner4}
                className="menu-spinner"
                style={{ top: "73%", left: "2%", width: "8rem" }}
              />
              <img
                src={menu_spinner5}
                className="menu-spinner-reverse"
                style={{ top: "80%", left: "60%", width: "8rem" }}
              />
            </div> */}
          </div>
          <div className="basis-3/4 px-1 lg:mt-10">
            <ul className="menu-links h-3/4 flex flex-col justify-evenly xl:space-y-10">
              <li className="flex">
                {/* <a href="/home" className={`menu-link ${theme.current}`}> */}
                <Link
                  to="/home"
                  data-bs-dismiss="offcanvas"
                  className="dark:text-white menu-link flex items-start text-4xl sm:text-6xl lg:text-8xl 2xl:text-9xl"
                >
                  <span className="primary uppercase">Home</span>
                  <span className="secondary uppercase">Home</span>
                  {/* <img src={menu_line} className="menu-line" alt="menu-line" /> */}
                </Link>
              </li>
              <li className="flex">
                <Link
                  to="/utopia"
                  data-bs-dismiss="offcanvas"
                  className="dark:text-white menu-link flex items-start text-4xl sm:text-6xl lg:text-8xl 2xl:text-9xl"
                >
                  <span className="primary uppercase">Utopia</span>
                  <span className="secondary uppercase">Utopia</span>
                  {/* <img src={menu_line} className="menu-line" alt="menu-line" /> */}
                </Link>
              </li>
              <li className="flex">
                <Link
                  to="/story"
                  data-bs-dismiss="offcanvas"
                  className="dark:text-white menu-link flex items-start text-4xl sm:text-6xl lg:text-8xl 2xl:text-9xl"
                >
                  <span className="primary uppercase">Story</span>
                  <span className="secondary uppercase">Story</span>
                  {/* <img src={menu_line} className="menu-line" alt="menu-line" /> */}
                </Link>
              </li>
              <li className="flex">
                <Link
                  to="/staking"
                  data-bs-dismiss="offcanvas"
                  className="dark:text-white menu-link flex items-start text-4xl sm:text-6xl lg:text-8xl 2xl:text-9xl"
                >
                  <span className="primary uppercase">Staking</span>
                  <span className="secondary uppercase">Staking</span>
                  {/* <img src={menu_line} className="menu-line" alt="menu-line" /> */}
                </Link>
              </li>
              <li className="flex">
                <Link
                  to="/raffle"
                  data-bs-dismiss="offcanvas"
                  className="dark:text-white menu-link flex items-start text-4xl sm:text-6xl lg:text-8xl 2xl:text-9xl"
                >
                  <span className="primary uppercase">Raffle</span>
                  <span className="secondary uppercase">Raffle</span>
                  {/* <img src={menu_line} className="menu-line" alt="menu-line" /> */}
                </Link>
              </li>
            </ul>
          </div>
          <div className="basis-1/6 grow bg-purple z-10 overflow-hidden">
            <div className="flex flex-col h-full">
              <div className="basis-1/2">
                {/* <img
                  className="mt-12"
                  src={theme == themes.LIGHT ? logo_light : logo_dark}
                /> */}
                {/* <p className="dark:text-black mt-14 sm:mt-20 text-3xl lg:text-4xl v-text secondary-font uppercase pl-2 tracking-widest">
                  Zenogakki
                </p> */}
                {/* <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                > */}
                {/* </button> */}
                <a data-bs-dismiss="offcanvas">
                  <img src={gem} className="menu-open cursor-pointer"></img>
                </a>
              </div>
              <div className="basis-1/2 flex flex-col justify-end lg:flex-row lg:justify-center lg:items-end pl-2">
                <a
                  className="social-icon"
                  target="_blank"
                  rel="noreferrer"
                  href="https://twitter.com/zenogakki?s=11&t=0yRkX8FJTYUdvCdP1SzhHg"
                >
                  <FaTwitter className="dark:text-black drop-shadow-lg bg-white/[.3] rounded p-1" />
                </a>
                <a
                  className="social-icon"
                  target="_blank"
                  rel="noreferrer"
                  href="https://discord.com/invite/projectzenogakki"
                >
                  <FaDiscord className="dark:text-black drop-shadow-lg bg-white/[.3] rounded p-1" />
                </a>
                <a
                  className="social-icon"
                  target="_blank"
                  rel="noreferrer"
                  href="https://t.co/ruxXGaXmer"
                >
                  <GiSailboat className="dark:text-black drop-shadow-lg bg-white/[.3] rounded p-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;

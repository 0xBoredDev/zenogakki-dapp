import { useContext } from "react";
import { Link } from "react-router-dom";
// import menu_light from "../images/menu_light.png";
// import menu_dark from "../images/menu_dark.png";
import menu_bg from "../images/menu_bg.svg";
import logo_light from "../images/logo_light.png";
import logo_dark from "../images/logo_dark.png";
import gem from "../images/gem.svg";
import twitter from "../images/twitter.svg";
import discord from "../images/discord.svg";
import opensea from "../images/opensea.svg";
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
      <div className="offcanvas-body dark:bg-[#000000]">
        <div className="flex flex-row h-full overflow-hidden">
          <div className="basis-3/4 sm:basis-1/2 flex relative">
            <img src={menu_bg} className="bg-fixed scale-150" />
            <div className="absolute h-full w-full">
              <ul className="menu-links h-full flex flex-col justify-evenly items-center xl:space-y-10 p-3">
                <li className="flex">
                  <Link
                    to="/home"
                    data-bs-dismiss="offcanvas"
                    className="menu-link flex items-start text-4xl sm:text-5xl lg:text-7xl 2xl:text-8xl"
                  >
                    <span className="text-black dark:text-white primary uppercase">
                      Home
                    </span>
                    <span className="text-black dark:text-white secondary uppercase">
                      Home
                    </span>
                  </Link>
                </li>
                <li className="flex">
                  <Link
                    to="/utopia"
                    data-bs-dismiss="offcanvas"
                    className="dark:text-white menu-link flex items-start text-4xl sm:text-5xl lg:text-7xl 2xl:text-8xl"
                  >
                    <span className="text-black dark:text-white primary uppercase">
                      Utopia
                    </span>
                    <span className="text-black dark:text-white secondary uppercase">
                      Utopia
                    </span>
                  </Link>
                </li>
                <li className="flex">
                  <Link
                    to="/story"
                    data-bs-dismiss="offcanvas"
                    className="dark:text-white menu-link flex items-start text-4xl sm:text-5xl lg:text-7xl 2xl:text-8xl"
                  >
                    <span className="text-black dark:text-white primary uppercase">
                      Story
                    </span>
                    <span className="text-black dark:text-white secondary uppercase">
                      Story
                    </span>
                  </Link>
                </li>
                <li className="flex">
                  <Link
                    to="/staking"
                    data-bs-dismiss="offcanvas"
                    className="dark:text-white menu-link flex items-start text-4xl sm:text-5xl lg:text-7xl 2xl:text-8xl"
                  >
                    <span className="text-black dark:text-white primary uppercase">
                      Staking
                    </span>
                    <span className="text-black dark:text-white secondary uppercase">
                      Staking
                    </span>
                  </Link>
                </li>
                <li className="flex">
                  <Link
                    to="/raffle"
                    data-bs-dismiss="offcanvas"
                    className="dark:text-white menu-link flex items-start text-4xl sm:text-5xl lg:text-7xl 2xl:text-8xl"
                  >
                    <span className="text-black dark:text-white primary uppercase">
                      Raffle
                    </span>
                    <span className="text-black dark:text-white secondary uppercase">
                      Raffle
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="basis-0 sm:basis-2/6">
            <div className="h-full flex justify-center items-center p-2 lg:p-10">
              <img
                src={theme == themes.DARK ? logo_light : logo_dark}
                className="bg-center"
                alt="logo"
              />
            </div>
          </div>
          <div className="basis-1/4 sm:basis-1/6 grow bg-purple z-10 overflow-hidden">
            <div className="flex flex-col h-full">
              <div className="basis-1/4 flex justify-center items-center">
                <a data-bs-dismiss="offcanvas">
                  <img
                    src={gem}
                    className="menu-open cursor-pointer hover:scale-75"
                    alt="gem"
                  ></img>
                </a>
              </div>
              <div className="basis-3/4 flex flex-col justify-evenly items-center content-center p-3 sm:p-2">
                <a
                  className="social-icon sm:p-5 hover:scale-75"
                  target="_blank"
                  rel="noreferrer"
                  href="https://twitter.com/zenogakki?s=11&t=0yRkX8FJTYUdvCdP1SzhHg"
                >
                  <img src={twitter} alt="twitter" />
                  {/* <FaTwitter className="dark:text-black drop-shadow-lg bg-white/[.3] rounded p-1" /> */}
                </a>
                <a
                  className="social-icon sm:p-5 hover:scale-75"
                  target="_blank"
                  rel="noreferrer"
                  href="https://discord.com/invite/projectzenogakki"
                >
                  <img src={discord} alt="discord" />
                  {/* <FaDiscord className="dark:text-black drop-shadow-lg bg-white/[.3] rounded p-1" /> */}
                </a>
                <a
                  className="social-icon sm:p-5 hover:scale-75"
                  target="_blank"
                  rel="noreferrer"
                  href="https://t.co/ruxXGaXmer"
                >
                  <img src={opensea} alt="opensea" />
                  {/* <GiSailboat className="dark:text-black drop-shadow-lg bg-white/[.3] rounded p-1" /> */}
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

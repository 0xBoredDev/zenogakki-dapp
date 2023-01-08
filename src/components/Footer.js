import { useState, useEffect, useContext } from "react";
import orb_light from "../images/orb_light.png";
import orb_dark from "../images/orb_dark.png";
import {
  TbPlayerPlay,
  TbPlayerPause,
  TbPlayerSkipBack,
  TbPlayerSkipForward,
} from "react-icons/tb";
import { themeContext } from "../App";
import themes from "../helpers/themes";
import { FaTwitter, FaDiscord } from "react-icons/fa";
import { GiSailboat } from "react-icons/gi";
import music_icon_light from "../images/music_icon_light.png";
import music_icon_dark from "../images/music_icon_dark.png";
import cyberpunkAudio from "../music/Cyberpunk.wav";
import futuristicAudio from "../music/Futuristic.mp3";
import introcyberpunkAudio from "../music/Into_Cyberpunk.mp3";
// import MediaPlayer from "./MediaPlayer";

const Footer = () => {
  const { changeTheme } = useContext(themeContext);
  const theme = useContext(themeContext).theme;
  const [mediaIconSrc, setMediaIconSrc] = useState(music_icon_light);

  useEffect(() => {
    if (theme == themes.LIGHT) {
      setMediaIconSrc(music_icon_light);
    } else {
      setMediaIconSrc(music_icon_dark);
    }
  });

  const [smallView, setSmallView] = useState(window.innerWidth <= 639.98);
  function updateSize() {
    setSmallView(window.innerWidth <= 639.98);
  }

  useEffect(() => {
    window.addEventListener("resize", (e) => {
      updateSize();
    });
  }, []);

  const trackData = [
    {
      id: 0,
      src: new Audio(cyberpunkAudio),
      name: "CyberPunk",
      artist: "VXZ",
    },
    {
      id: 1,
      src: new Audio(introcyberpunkAudio),
      name: "Into CyberPunk",
      artist: "Paul Velchev",
    },
    {
      id: 2,
      src: new Audio(futuristicAudio),
      name: "Futuristic",
      artist: "Progressence",
    },
  ];
  const [darkModeOn, setDarkModeOn] = useState(false);
  const [songs, setSongs] = useState(trackData);
  const [showIcons, setShowIcons] = useState(false);
  const [showMusicPlayer, setShowMusicPlayer] = useState(false);
  const [curTrackNum, setCurTrackNum] = useState(0);
  const [trackIsPlaying, setTrackIsPlaying] = useState(false);
  const [curTrack, setCurTrack] = useState(songs[0]);

  function toggleMediaPlayer() {
    console.log("toggle media player");
    var mediaLogo = document.getElementById("mediaLogo").classList;

    if (mediaLogo.contains("zoomed")) {
      mediaLogo.remove("zoomed");
    } else {
      mediaLogo.add("zoomed");
    }

    var media = document.getElementById("controls").classList;

    if (media.contains("d-none")) {
      media.remove("d-none");
      media.add("d-flex");
    } else if (media.contains("d-flex")) {
      media.remove("d-flex");
      media.add("d-none");
    }

    setShowMusicPlayer(!showMusicPlayer);
  }

  function togglePlay(e) {
    console.log("togglePlay()");
    // console.log(
    //   `${trackIsPlaying ? "track is playing" : "track is not playing"}`
    // );
    trackIsPlaying ? curTrack.src.pause() : curTrack.src.play();
    setTrackIsPlaying(!trackIsPlaying);

    var bounceIcon = document.getElementById("bounceIcon").classList;

    if (bounceIcon.contains("paused-icon")) {
      bounceIcon.remove("paused-icon");
      bounceIcon.add("playing-icon");
    } else if (bounceIcon.contains("playing-icon")) {
      bounceIcon.remove("playing-icon");
      bounceIcon.add("paused-icon");
    }
  }

  function skipForward() {
    return new Promise((resolve) => {
      const trackWasPlaying = trackIsPlaying;
      if (trackIsPlaying) {
        togglePlay();
      }
      resolve(trackWasPlaying);
    })
      .then((wasPlaying) => {
        console.log("then");
        const numTracks = songs.length;
        var nextTrackNum = curTrackNum + 1;
        if (nextTrackNum >= numTracks) {
          nextTrackNum = 0;
        }
        console.log(`next song ${songs[nextTrackNum].name}`);
        setCurTrackNum(nextTrackNum);
        setCurTrack(songs[nextTrackNum]);
        console.log(wasPlaying);
        if (wasPlaying) {
          songs[nextTrackNum].src.currentTime = 0;
          songs[nextTrackNum].src.play();
          togglePlay();
          setTrackIsPlaying(true);
        }
        return wasPlaying;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }

  function skipBack() {
    return new Promise((resolve) => {
      const trackWasPlaying = trackIsPlaying;
      if (trackIsPlaying) {
        togglePlay();
      }
      resolve(trackWasPlaying);
    })
      .then((wasPlaying) => {
        console.log("then");
        const numTracks = songs.length;
        var nextTrackNum = curTrackNum - 1;
        if (nextTrackNum < 0) {
          nextTrackNum = numTracks - 1;
        }
        console.log(`next song ${songs[nextTrackNum].name}`);
        setCurTrackNum(nextTrackNum);
        setCurTrack(songs[nextTrackNum]);
        if (wasPlaying) {
          songs[nextTrackNum].src.currentTime = 0;
          songs[nextTrackNum].src.play();
          togglePlay();
          setTrackIsPlaying(true);
        }
        return wasPlaying;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <nav className="navbar fixed-bottom footer">
      <div className="container-fluid no-pad">
        <div className="flex flex-row footer-section">
          {!smallView || (smallView && !showMusicPlayer) ? (
            <div className="grow-0 social" id="social">
              <div>
                {showIcons && (
                  <div className="social-icons">
                    <a
                      className="social-icon"
                      target="_blank"
                      rel="noreferrer"
                      href=""
                    >
                      <FaTwitter className="dark:text-black drop-shadow-lg bg-white/[.3] rounded p-1" />
                    </a>
                    <a
                      className="social-icon"
                      target="_blank"
                      rel="noreferrer"
                      href=""
                    >
                      <FaDiscord className="dark:text-black drop-shadow-lg bg-white/[.3] rounded p-1" />
                    </a>
                    <a
                      className="social-icon"
                      target="_blank"
                      rel="noreferrer"
                      href=""
                    >
                      <GiSailboat className="dark:text-black drop-shadow-lg bg-white/[.3] rounded p-1" />
                    </a>
                  </div>
                )}
                <a
                  className="relative"
                  onClick={(e) => {
                    // setShowIcons(!showIcons);
                    setDarkModeOn(!darkModeOn);
                    changeTheme(!darkModeOn ? themes.DARK : themes.LIGHT);
                  }}
                >
                  <img
                    id="orbicon"
                    className="flex"
                    width="155px"
                    height="155px"
                    src={!darkModeOn ? orb_dark : orb_light}
                  ></img>
                </a>
              </div>
              {showIcons && (
                <div id="nightmode" className="form-check form-switch">
                  <label
                    className="form-check-label dark:text-black secondary-font drop-shadow-lg bg-white/[.3] rounded p-1"
                    htmlFor="flexSwitchCheckDefault"
                  >
                    Dark Mode
                  </label>
                  <input
                    className="form-check-input drop-shadow-lg bg-white/[.3] rounded p-1"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                    checked={darkModeOn}
                    onChange={(e) => {
                      setDarkModeOn(!darkModeOn);
                      changeTheme(!darkModeOn ? themes.DARK : themes.LIGHT);
                    }}
                  />
                </div>
              )}
            </div>
          ) : (
            <></>
          )}
          <div className="grow media-player">
            <div className="row media-section justify-content-end dark:bg-black">
              <div id="controls" className="col d-none">
                <div id="media" className="col media-controls">
                  <TbPlayerSkipBack
                    fill="solid"
                    className="media-control dark:text-white"
                    onClick={skipBack}
                  />
                  {!trackIsPlaying ? (
                    <TbPlayerPlay
                      fill="solid"
                      className="media-control dark:text-white"
                      onClick={togglePlay}
                    />
                  ) : (
                    <TbPlayerPause
                      fill="solid"
                      className="media-control dark:text-white"
                      onClick={togglePlay}
                    />
                  )}
                  <TbPlayerSkipForward
                    fill="solid"
                    className="media-control dark:text-white"
                    onClick={skipForward}
                  />
                </div>
                <div className="col media-info">
                  <h3 id="track-name" className="text-truncate dark:text-white">
                    {curTrack.name}
                  </h3>
                  <h4
                    id="track-artist"
                    className="text-truncate dark:text-white"
                  >
                    {curTrack.artist}
                  </h4>
                </div>
              </div>
              <div className="col bounce p-0">
                <div id="bounceIcon" className="bounce-icon paused-icon">
                  <span className="bg-black dark:bg-white"></span>
                  <span className="bg-black dark:bg-white"></span>
                  <span className="bg-black dark:bg-white"></span>
                </div>
              </div>
              <div className="col media-img">
                <a onClick={toggleMediaPlayer}>
                  <img
                    id="mediaLogo"
                    className="media-logo"
                    src={mediaIconSrc}
                  ></img>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Footer;

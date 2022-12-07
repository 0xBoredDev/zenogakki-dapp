import { useState, useEffect, useRef, useContext } from "react";
import orb from "../images/orb_icon.png";
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
// import resolve from "path-browserify";

const Footer = () => {
  const { changeTheme } = useContext(themeContext);
  const theme = useContext(themeContext);
  const [mediaIconSrc, setMediaIconSrc] = useState(music_icon_light);

  useEffect(() => {
    if (theme.current == themes.LIGHT) {
      setMediaIconSrc(music_icon_light);
    } else {
      setMediaIconSrc(music_icon_dark);
    }
  });

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
  const [nightModeOn, setNightModeOn] = useState(false);
  const [songs, setSongs] = useState(trackData);
  const [showIcons, setShowIcons] = useState(false);
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
        <div className="row footer-section">
          <div className="col-2 social">
            <div>
              {showIcons && (
                <div className="social-icons">
                  <a
                    className="social-icon"
                    target="_blank"
                    rel="noreferrer"
                    href=""
                  >
                    <FaTwitter />
                  </a>
                  <a
                    className="social-icon"
                    target="_blank"
                    rel="noreferrer"
                    href=""
                  >
                    <FaDiscord />
                  </a>
                  <a
                    className="social-icon"
                    target="_blank"
                    rel="noreferrer"
                    href=""
                  >
                    <GiSailboat />
                  </a>
                </div>
              )}
              <a
                onClick={(e) => {
                  setShowIcons(!showIcons);
                }}
              >
                <img id="orbicon" src={orb}></img>
              </a>
            </div>
            {showIcons && (
              <div id="nightmode" className="form-check form-switch">
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckDefault"
                >
                  Dark Mode
                </label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                  checked={nightModeOn}
                  onChange={(e) => {
                    setNightModeOn(!nightModeOn);
                    changeTheme(!nightModeOn ? themes.DARK : themes.LIGHT);
                  }}
                />
              </div>
            )}
          </div>
          <div className="col-10 media-player">
            <div className="row media-section justify-content-end">
              {/* <div id="controls" className="col-xl-11 col-sm-10 d-none">
                <div id="media" className="col media-controls">
                <MediaPlayer musicTracks={trackData} />
                </div>
              </div> */}
              <div id="controls" className="col d-none">
                <div id="media" className="col media-controls">
                  <TbPlayerSkipBack
                    fill="solid"
                    className="media-control"
                    onClick={skipBack}
                  />
                  {!trackIsPlaying ? (
                    <TbPlayerPlay
                      fill="solid"
                      className="media-control"
                      onClick={togglePlay}
                    />
                  ) : (
                    <TbPlayerPause
                      fill="solid"
                      className="media-control"
                      onClick={togglePlay}
                    />
                  )}
                  <TbPlayerSkipForward
                    fill="solid"
                    className="media-control"
                    onClick={skipForward}
                  />
                </div>
                <div className="col media-info">
                  <h3 id="track-name" className="text-truncate">
                    {curTrack.name}
                  </h3>
                  <h4 id="track-artist" className="text-truncate">
                    {curTrack.artist}
                  </h4>
                </div>
              </div>
              <div className="col bounce">
                <div id="bounceIcon" className="bounce-icon paused-icon">
                  <span className="bg-black"></span>
                  <span className="bg-black"></span>
                  <span className="bg-black"></span>
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

import React, { useState, useEffect } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const MediaPlayer = (musicTracks) => {
  const trackData = [
    {
      id: 0,
      src: cyberpunkAudio,
      name: "CyberPunk",
      artist: "VXZ",
    },
    {
      id: 1,
      src: introcyberpunkAudio,
      name: "Into CyberPunk",
      artist: "Paul Velchev",
    },
    {
      id: 2,
      src: futuristicAudio,
      name: "Futuristic",
      artist: "Progressence",
    },
  ];
  const [trackIndex, setTrackIndex] = useState(0);
  const [tracks, setTracks] = useState(musicTracks.musicTracks);
  const [isMobile, setIsMobile] = useState(false);
  function updatePredicate() {
    setIsMobile(window.innerWidth <= 575.98);
  }

  useEffect(() => {
    window.addEventListener("resize", (e) => {
      updatePredicate();
    });
  }, []);

  const handleClickPrevious = () => {
    setTrackIndex((currentTrack) =>
      currentTrack === 0 ? tracks.length - 1 : currentTrack - 1
    );
  };

  const handleClickNext = () => {
    setTrackIndex((currentTrack) =>
      currentTrack < tracks.length - 1 ? currentTrack + 1 : 0
    );
  };

  return (
    <div className="audio-player">
      <AudioPlayer
        style={{ borderRadius: "1rem" }}
        autoPlay={false}
        loop={true}
        layout="horizontal"
        src={tracks[trackIndex].src}
        onPlay={(e) => console.log("onPlay")}
        showSkipControls={true}
        showJumpControls={false}
        showFilledVolume={true}
        customAdditionalControls={[]}
        // header={`Now playing: ${tracks[trackIndex].name}`}
        header={
          <>
            <span id="track-title">{tracks[trackIndex].name}</span>
            <br />
            <span id="track-artist">{tracks[trackIndex].artist}</span>
          </>
        }
        // footer={`By: ${tracks[trackIndex].artist}`}
        onClickPrevious={handleClickPrevious}
        onClickNext={handleClickNext}
        onEnded={handleClickNext}
      />
    </div>
  );
};
export default MediaPlayer;

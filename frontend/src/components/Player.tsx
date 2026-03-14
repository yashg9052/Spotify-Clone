import React, { useEffect, useRef, useState } from "react";
import { useSongData } from "../context/SongContext";
import { GrChapterNext, GrChapterPrevious } from "react-icons/gr";
import { FaPause, FaPlay } from "react-icons/fa";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";

const formatTime = (seconds: number) => {
  if (!seconds || isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};

const Player = () => {
  const {
    song,
    fetchSingleSong,
    selectedSong,
    isplaying,
    setIsplaying,
    prevSong,
    nextSong,
  } = useSongData();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [volume, setVolume] = useState<number>(1);
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetaData = () => setDuration(audio.duration || 0);
    const handleTimeUpdate = () => setProgress(audio.currentTime || 0);

    audio.addEventListener("loadedmetadata", handleLoadedMetaData);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetaData);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [song]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      isplaying ? audioRef.current.pause() : audioRef.current.play();
      setIsplaying(!isplaying);
    }
  };

  const volumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value) / 100;
    setVolume(newVolume);
    if (audioRef.current) audioRef.current.volume = newVolume;
    setMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      const newMuted = !muted;
      audioRef.current.volume = newMuted ? 0 : volume;
      setMuted(newMuted);
    }
  };

  const durationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = (parseFloat(e.target.value) / 100) * duration;
    if (audioRef.current) audioRef.current.currentTime = newTime;
    setProgress(newTime);
  };

  useEffect(() => {
    fetchSingleSong();
  }, [selectedSong]);

  if (!song) return null;

  return (
    <div className="h-[10%] min-h-[70px] bg-black border-t border-gray-800 flex items-center justify-between text-white px-3 sm:px-6 gap-2">
      
      {/* Left — Song Info */}
      <div className="flex items-center gap-3 w-[140px] sm:w-[200px] md:w-[260px] flex-shrink-0">
        <img
          src={song.thumbnail || "/download.jpeg"}
          alt={song.title}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-md object-cover flex-shrink-0"
        />
        <div className="hidden sm:block overflow-hidden">
          <p className="text-sm font-semibold truncate">{song.title}</p>
          <p className="text-xs text-gray-400 truncate">{song.description}</p>
        </div>
      </div>

      {/* Center — Controls + Progress */}
      <div className="flex flex-col items-center gap-1 flex-1 max-w-[420px]">
        {song.audio && (
          <audio ref={audioRef} src={song.audio} autoPlay={isplaying} />
        )}

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <span className="cursor-pointer text-gray-400 hover:text-white transition" onClick={prevSong}>
            <GrChapterPrevious size={18} />
          </span>
          <button
            className="bg-white text-black rounded-full p-2 hover:scale-105 transition-transform cursor-pointer"
            onClick={handlePlayPause}
          >
            {isplaying ? <FaPause size={14} /> : <FaPlay size={14} />}
          </button>
          <span className="cursor-pointer text-gray-400 hover:text-white transition" onClick={nextSong}>
            <GrChapterNext size={18} />
          </span>
        </div>

        {/* Progress bar + time */}
        <div className="flex items-center gap-2 w-full">
          <span className="text-[10px] text-gray-400 w-8 text-right hidden sm:block">
            {formatTime(progress)}
          </span>
          <input
            type="range"
            min="0"
            max="100"
            className="flex-1 h-1 accent-green-400 cursor-pointer"
            value={(progress / duration) * 100 || 0}
            onChange={durationChange}
          />
          <span className="text-[10px] text-gray-400 w-8 hidden sm:block">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* Right — Volume */}
      <div className="flex items-center gap-2 w-[80px] sm:w-[130px] justify-end flex-shrink-0">
        <button onClick={toggleMute} className="text-gray-400 hover:text-white transition hidden sm:block">
          {muted ? <HiVolumeOff size={18} /> : <HiVolumeUp size={18} />}
        </button>
        <input
          type="range"
          className="w-16 sm:w-24 h-1 accent-green-400 cursor-pointer hidden sm:block"
          min="0"
          max="100"
          step="1"
          value={muted ? 0 : volume * 100}
          onChange={volumeChange}
        />
      </div>
    </div>
  );
};

export default Player;
"use client";

import React, { useRef, useState, useEffect } from "react";
import { Play, Pause, RotateCcw, Volume2, FastForward } from "lucide-react";

interface VideoPlayerProps {
  videoUrl: string;
  onEnded?: () => void;
}

export function VideoPlayer({ videoUrl, onEnded }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setIsPlaying(false);
    setProgress(0);
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [videoUrl]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration || 1;
      setProgress((current / duration) * 100);
    }
  };

  const changeSpeed = () => {
    const rates = [1, 1.25, 1.5, 2];
    const currentIndex = rates.indexOf(playbackRate);
    const nextIndex = (currentIndex + 1) % rates.length;
    const newRate = rates[nextIndex];
    setPlaybackRate(newRate);
    if (videoRef.current) {
      videoRef.current.playbackRate = newRate;
    }
  };

  const restart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black shadow-lg group">
      <video
        ref={videoRef}
        src={videoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}
        className="h-full w-full object-contain"
        onTimeUpdate={handleTimeUpdate}
        onEnded={onEnded}
        onClick={togglePlay}
      />

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-3">
        <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden cursor-pointer">
          <div className="bg-blue-600 h-full transition-all duration-100" style={{ width: `${progress}%` }} />
        </div>

        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-4">
            <button onClick={togglePlay} className="hover:text-blue-400 transition-colors">
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </button>
            <button onClick={restart} className="hover:text-blue-400 transition-colors">
              <RotateCcw className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-1.5">
              <Volume2 className="h-5 w-5" />
              <span className="text-xs">Muted/Audio</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={changeSpeed}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-xs font-semibold transition-colors"
            >
              <FastForward className="h-3 w-3" />
              {playbackRate}x
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

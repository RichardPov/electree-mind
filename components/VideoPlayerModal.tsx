"use client";
import { useEffect } from "react";
import type { Video } from "@/lib/videos";

export default function VideoPlayerModal({ video, onClose }: { video: Video; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-[#0D3D34]/90 backdrop-blur-sm z-[100] flex items-center justify-center p-6"
      onClick={onClose}
    >
      <div
        className="bg-black rounded-2xl overflow-hidden w-full max-w-3xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-3 bg-[#0D3D34]">
          <h3 className="text-white text-sm font-semibold truncate pr-4">{video.title}</h3>
          <button
            onClick={onClose}
            className="text-white/50 hover:text-white flex-shrink-0 w-7 h-7 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <video
          src={video.src}
          poster={video.thumb}
          controls
          autoPlay
          className="w-full block"
          style={{ maxHeight: "75vh" }}
        />
      </div>
    </div>
  );
}

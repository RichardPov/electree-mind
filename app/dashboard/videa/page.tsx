"use client";
import { useState } from "react";
import Image from "next/image";
import { VIDEOS } from "@/lib/videos";
import VideoPlayerModal from "@/components/VideoPlayerModal";

export default function VideaPage() {
  const [playing, setPlaying] = useState<string | null>(null);
  const activeVideo = VIDEOS.find(v => v.id === playing);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0D3D34]">Videa</h1>
        <p className="text-sm text-[#0D3D34]/50 mt-1">Krátká vysvětlující videa o energetice a tarifech</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {VIDEOS.map((v) => (
          <button
            key={v.id}
            onClick={() => setPlaying(v.id)}
            className="bg-white border border-[#D1DFD8] rounded-2xl overflow-hidden text-left hover:shadow-md hover:border-[#0D3D34]/25 transition-all group"
          >
            <div className="relative aspect-video bg-[#0D3D34] overflow-hidden">
              <Image
                src={v.thumb}
                alt={v.title}
                fill
                className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-[#D7FF00] flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <svg width="16" height="16" fill="#0D3D34" viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21" /></svg>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-[#0D3D34] text-sm group-hover:text-[#1A6B5A] transition-colors mb-1.5">{v.title}</h3>
              <p className="text-xs text-[#0D3D34]/45 leading-snug mb-3">{v.subheadline}</p>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#1A6B5A]">
                <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21" /></svg>
                Přehrát video
              </div>
            </div>
          </button>
        ))}
      </div>

      {activeVideo && (
        <VideoPlayerModal video={activeVideo} onClose={() => setPlaying(null)} />
      )}
    </div>
  );
}

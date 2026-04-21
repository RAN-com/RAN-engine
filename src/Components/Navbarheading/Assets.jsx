import React from 'react';

export default function MyWork() {
  const videos = [
    { id: 1, title: "Gaming Editing", url: "#" },
    { id: 2, title: "Commercial Ads", url: "#" },
    { id: 3, title: "Cinematic Edits", url: "#" },
    { id: 4, title: "Corporate Promo", url: "#" },
  ];

  return (
    <section id="work" className="min-h-screen bg-[#071c1f] flex flex-col items-center justify-center py-20 overflow-hidden">
      <h2 className="text-4xl font-bold mb-12 text-white">
        My <span className="text-red-500">Work</span>
      </h2>

      {/* Horizontal Auto-Slide Container */}
      <div className="relative w-full overflow-hidden group">
        <div className="flex space-x-6 animate-scroll hover:pause-scroll px-6">
          {/* Mapping twice to create seamless loop effect */}
          {[...videos, ...videos].map((video, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 w-72 h-[450px] bg-black/40 border border-red-500/20 rounded-2xl relative overflow-hidden group/card shadow-2xl"
            >
              {/* Video Placeholder - Replace 'src' with your actual video paths */}
              <video 
                className="w-full h-full object-cover opacity-60 group-hover/card:opacity-100 transition-opacity duration-300"
                autoPlay 
                loop 
                muted 
                playsInline
              >
                <source src={`/videos/sample-${video.id}.mp4`} type="video/mp4" />
              </video>

              {/* Title Overlay at Bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
                <h3 className="text-white font-bold text-xl text-center">
                  {video.title}
                </h3>
                <div className="w-12 h-1 bg-red-500 mx-auto mt-2 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS for Auto-Scroll Animation */}
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          display: flex;
          width: calc(288px * 8 + 1.5rem * 8); /* Adjust based on card width + gap */
          animation: scroll 20s linear infinite;
        }
        .pause-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
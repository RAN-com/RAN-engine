import React from 'react';

export default function About() {
  return (
    <section id="about" className="min-h-screen py-20 bg-[#071c1f] text-white px-6 flex flex-col items-center">
      {/* Header */}
      <h2 className="text-5xl font-bold text-red-500 mb-12 tracking-tight">About Me</h2>

      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
        
        {/* Myself Section */}
        <div className="bg-[#0a262a] p-8 rounded-2xl shadow-lg border-l-4 border-red-500">
          <h3 className="text-2xl font-bold mb-4 text-white uppercase tracking-wider">Myself</h3>
          <p className="text-gray-400 leading-relaxed">
            I am a versatile **Developer and Creative Editor** based in Chennai. My journey is unique—transitioning from the automotive industry to high-level software engineering. I have a deep-rooted passion for blending technical code with visual storytelling to create user-centric digital experiences.
          </p>
        </div>

        {/* Experience Section */}
        <div className="bg-[#0a262a] p-8 rounded-2xl shadow-lg border-l-4 border-red-500">
          <h3 className="text-2xl font-bold mb-4 text-white uppercase tracking-wider">Experience</h3>
          <p className="text-gray-400 leading-relaxed">
            Starting at **Nissan** (2017-2020), I pivoted to tech during the lockdown. I mastered the **MERN Stack**, React Native, and Game Development (**Unity/Unreal**). With professional experience as a Developer (2023-2024), I specialize in building scalable apps and immersive digital logic.
          </p>
        </div>

        {/* Startup Section (Full Width) */}
        <div className="md:col-span-2 bg-[#0a262a] p-8 rounded-2xl shadow-lg border-t-4 border-red-500">
          <h3 className="text-2xl font-bold mb-4 text-white uppercase tracking-wider text-center">My Startup Journey</h3>
          <p className="text-gray-400 leading-relaxed text-center max-w-3xl mx-auto">
            In 2024, I founded <span className="text-red-400 font-semibold">Ran Software Solutions (raninfo.in)</span>. 
            Managing the full product lifecycle taught me the "Founder Mentality"—combining technical execution with project management and resilience. I now leverage this grit to deliver high-quality results in fast-paced professional environments.
          </p>
        </div>
      </div>

      {/* Skills / Tools Summary Tags */}
      <div className="mt-12 flex flex-wrap justify-center gap-4">
        {['React.js', 'MERN Stack', 'Video Editing', 'Unity', 'Project Management'].map((skill) => (
          <span key={skill} className="px-4 py-2 bg-red-500/10 border border-red-500/50 text-red-500 rounded-full text-sm font-medium">
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}
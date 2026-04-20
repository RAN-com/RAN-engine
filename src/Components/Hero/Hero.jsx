import { Repeat, ShieldCheck, Globe, ArrowRight } from "lucide-react";


export default function LandingPage() {
  return (
    <>
    <div className=" p-6">
      {/* Main Card */}
      <div className="w-full max-w-7xl bg-black rounded-3xl p-10 relative overflow-hidden shadow-2xl">

        {/* Glow Effect */}
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-b from-purple-500/40 to-transparent blur-3xl"></div>

        {/* Navbar */}
        <nav className="flex justify-between items-center mb-16">

          {/* Logo */}
          <div className="flex items-center gap-2 text-white text-xl font-semibold">
            {/* <img src={profile} alt="logo" className="w-8 h-8 bg-white rounded-full" /> */}
            RAN Software
          </div>

          {/* Menu */}
       <div className="hidden md:flex gap-8 bg-white/10 backdrop-blur-md px-6 py-3 rounded-xl text-gray-300">
  
  <a href="#" className="relative text-white group">
    Home
    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
  </a>

  <a href="#" className="relative group">
    About
    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
  </a>

  <a href="#" className="relative group">
    Platform
    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
  </a>

  <a href="#" className="relative group">
    Assets
    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
  </a>

  <a href="#" className="relative group">
    Contact
    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
  </a>

</div>

          {/* Contact Button */}
         <button className="border border-white/30 text-white px-5 py-2 rounded-lg transition duration-300 hover:bg-white/10 hover:scale-105 hover:shadow-lg">
  Contact Us
</button>
        </nav>

        {/* Hero Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div>
            <h1 className="text-4xl font-bold leading-tight mb-6 bg-gradient-to-r from-red-500 via-green-400 to-blue-500 bg-[length:300%_300%] bg-clip-text text-transparent animate-gradientMove">
              RAN IT TECH <br />
              Transforming Ideas into Powerful Digital Solutions
            </h1>

            <p className="text-gray-400 mb-8 max-w-lg">
              Started by a passionate full-stack developer, RAN IT Tech began as a small creative initiative focused on building modern websites and unique app logos.
            </p>

            <button className="flex items-center gap-3 bg-gradient-to-r from-purple-500 to-indigo-500 px-6 py-3 rounded-xl text-white shadow-lg hover:scale-105 transition">
              Book Now
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Right Image */}
          <div className="relative flex justify-center group">
            <div className="w-80 h-80 bg-gradient-to-br from-purple-500/40 to-indigo-500/30 rounded-3xl blur-2xl absolute group-hover:hidden"></div>

            {/* <img
              src={}
              alt="Worker"
              className="relative w-80 rounded-2xl shadow-2xl"
            /> */}
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-10 mt-20 border-t border-white/10 pt-10 text-gray-300">

          <div className="flex gap-4 items-start">
            <Globe className="text-purple-400 mt-1" size={24} />
            <div>
              <h3 className="text-white font-semibold text-lg">
                Website UI Design
              </h3>
              <p className="text-sm text-gray-400">
                Modern, responsive and high-performance website interfaces tailored for your brand.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <Repeat className="text-purple-400 mt-1" size={24} />
            <div>
              <h3 className="text-white font-semibold text-lg">
                App UI Design
              </h3>
              <p className="text-sm text-gray-400">
                Clean and intuitive mobile app designs focused on user experience and engagement.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <ShieldCheck className="text-purple-400 mt-1" size={24} />
            <div>
              <h3 className="text-white font-semibold text-lg">
                Logo & Icon Customization
              </h3>
              <p className="text-sm text-gray-400">
                Unique brand identities with professional logos and modern icon redesign solutions.
              </p>
            </div>
          </div>

        </div>
      </div>
      </div></>
    
  );
} 
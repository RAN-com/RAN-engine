import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { PlayCircle } from "lucide-react"; // Lucide React for the play icon
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const games = [
  {
    title: "Dota 2",
    description: "Multiplayer online battle arena by Valve.",
    image: "https://www.yudiz.com/codepen/expandable-animated-card-slider/dota-2.jpg",
    youtubeSearch: "https://www.youtube.com/results?search_query=Dota+2+gameplay",
  },
  {
    title: "The Witcher 3",
    description: "Open-world RPG developed by CD Projekt Red.",
    image: "https://www.yudiz.com/codepen/expandable-animated-card-slider/winter-3.jpg",
    youtubeSearch: "https://www.youtube.com/results?search_query=The+Witcher+3+gameplay",
  },
  {
    title: "RDR 2",
    description: "Western action-adventure game by Rockstar Games.",
    image: "https://www.yudiz.com/codepen/expandable-animated-card-slider/rdr-2.jpg",
    youtubeSearch: "https://www.youtube.com/results?search_query=Red+Dead+Redemption+2+gameplay",
  },
  {
    title: "PUBG Mobile",
    description: "Battle royale game where 100 players fight to be the last one standing.",
    image: "https://www.yudiz.com/codepen/expandable-animated-card-slider/pubg.jpg",
    youtubeSearch: "https://www.youtube.com/results?search_query=PUBG+Mobile+gameplay",
  },
  {
    title: "Fortnite",
    description: "Battle royale game with fast-paced building mechanics.",
    image: "https://www.yudiz.com/codepen/expandable-animated-card-slider/fortnite.jpg",
    youtubeSearch: "https://www.youtube.com/results?search_query=Fortnite+gameplay",
  },
  {
    title: "Far Cry 5",
    description: "First-person shooter developed by Ubisoft.",
    image: "https://www.yudiz.com/codepen/expandable-animated-card-slider/far-cry-5.jpg",
    youtubeSearch: "https://www.youtube.com/results?search_query=Far+Cry+5+gameplay",
  },
];

const Home = () => {
  // Function to trigger a laptop notification
  const showNotification = (gameTitle) => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification("Game Selected", {
            body: `${gameTitle} clicked!`,
            icon: "https://cdn-icons-png.flaticon.com/512/1041/1041916.png", // Sample icon
          });
        }
      });
    }
  };

  return (
    <section className="py-10 px-5 bg-gray-900 text-white text-center">
      <h2 className="text-2xl font-bold mb-5 border-b-4 border-red-500 w-40 mx-auto">
        Trending Games
      </h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        spaceBetween={20}
        loop={true}
        autoplay={{ delay: 3000 }}
        navigation
        pagination={{ clickable: false }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="w-full"
      >
        {games.map((game, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-80 h-80 rounded-xl overflow-hidden cursor-pointer shadow-lg"
              onClick={() => showNotification(game.title)} // Trigger notification on click
            >
              <img src={game.image} alt={game.title} className="w-full h-full object-cover" />

              {/* Overlay Gradient */}
              <div className="absolute bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent p-4 w-full text-white">
                <h3 className="text-xl font-bold">{game.title}</h3>
                <p className="text-sm">{game.description}</p>
              </div>

              {/* YouTube Play Icon */}
              <a
                href={game.youtubeSearch}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/60 transition"
              >
                <PlayCircle className="w-16 h-16 text-red-500 opacity-80 hover:opacity-100 transition" />
              </a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Home;


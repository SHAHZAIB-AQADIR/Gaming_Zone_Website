import React from "react";

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black text-white p-8">
      {/* Page Heading */}
      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-500 mb-6">
        About Our Gaming Zone
      </h1>

      {/* Description */}
      <p className="text-lg md:text-xl mb-10">
        Welcome to the ultimate gaming experience! Here at{" "}
        <span className="text-red-500 font-semibold">Gaming Zone</span>, we
        provide a world full of adventures, competitions, and fun for every
        gamer.
      </p>

      {/* Cards Section */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
          <h2 className="text-2xl font-bold text-red-400 mb-2">
            Multiplayer Arenas
          </h2>
          <p>
            Play with your friends in intense multiplayer battles and show your
            skills on the leaderboard!
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
          <h2 className="text-2xl font-bold text-red-400 mb-2">High-end PCs</h2>
          <p>
            Experience ultra-smooth gameplay with our top-of-the-line gaming
            rigs and accessories.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
          <h2 className="text-2xl font-bold text-red-400 mb-2">24/7 Gaming</h2>
          <p>
            Our gaming zone is open all day, every day. Dive in anytime and
            never miss the action!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

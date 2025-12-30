import GameCard from "@/app/components/GameCard/GameCard";

const games = [
  { title: "VALORANT", img: "/VALORANT.png", link: "/games/valorant" },
  { title: "FORZA", img: "/Forza.png", link: "/games/forza" },
  { title: "CS-GO", img: "/csgo.png", link: "/games/csgo" },
  { title: "GTA-V", img: "/GTA5.png", link: "/games/gta5" },
  { title: "Fortnite", img: "/Fortnite.png", link: "/games/fortnite" },
  { title: "ASPHALT", img: "/ASPHALT.png", link: "/games/asphalt" },
];

export default function GamesPage() {
  return (
    <div className="min-h-screen px-10 py-20">
      <h1 className="text-3xl font-bold text-center mb-10">
        ALL GAMES
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {games.map((game) => (
          <GameCard
            key={game.title}
            title={game.title}
            img={game.img}
            link={game.link} // ✅ now always defined
          />
        ))}
      </div>
    </div>
  );
}

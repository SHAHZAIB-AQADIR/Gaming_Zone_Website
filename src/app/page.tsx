import GameCard from "@/app/components/GameCard/GameCard";

const games = [
  { title: "VALORANT", img: "VALORANT.png" },
  { title: "FORZA", img: "FORZA.png" },
  { title: "CS-GO", img: "csgo.png" },
  { title: "FORTNITE", img: "Fortnite.png" },
  { title: "ASPHALT", img: "ASPHALT.png" },
  { title: "GTA-V", img: "GTA5.png" },
];

export default function Home() {
  return (
    <main className="text-white">

      {/* ===== HERO / BACKGROUND SECTION ===== */}
      <section
  className="relative min-h-screen bg-cover bg-center flex items-center justify-center"
  style={{ backgroundImage: "url('/cover.png')" }}
>
  <div className="absolute inset-0 bg-black/60"></div>

  <div className="relative z-10 text-center">
    <h1 className="text-4xl md:text-6xl font-bold mb-4">
      WELCOME TO RED ZONE GAMING 
    </h1>
    <p className="text-lg">
      your gateway to hassle-free game bookings. Choose your game lock your time, and let the fun begin
    </p>
  </div>
</section>

      {/* ===== GAMES SECTION ===== */}
      <section className="py-20 bg-black">
        <h2 className="text-3xl font-bold text-center mb-10">
          Popular Games
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 px-10">
          {games.map((g) => (
            <GameCard key={g.title} {...g} />
          ))}
        </div>
      </section>

    </main>
  );
}

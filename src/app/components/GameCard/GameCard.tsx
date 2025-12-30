import Link from "next/link";
import Image from "next/image";

interface GameCardProps {
  title: string;
  img: string;
  link?: string;
}

export default function GameCard({
  title,
  img,
  link = "/booking",
}: GameCardProps) {

  // 🔒 SAFETY: always force leading slash
  const safeImg =
    img.startsWith("/") || img.startsWith("http")
      ? img
      : `/${img}`;

  return (
    <div className="bg-white/10 rounded-xl p-4 text-center">
      <Image
        src={safeImg}          // ✅ always valid for next/image
        alt={title}
        width={300}
        height={200}
        className="mx-auto rounded-lg"
      />

      <h3 className="mt-4 font-semibold text-white">
        {title}
      </h3>

      <Link href={link}>
        <button className="mt-3 bg-blue-600 px-4 py-2 rounded text-white">
          BOOK NOW
        </button>
      </Link>
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";

const defaultMovieIcon = "/def-movie.png";

interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    poster_path: string;
  };
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <div key={movie.id} className="bg-gray-800 rounded-lg overflow-hidden ">
      <div className="p-4 w-30">
        <Link
          href={`/movie/${movie.id}`}
          className="text-blue-400 hover:underline"
        >
          <Image
            width={500}
            height={750}
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : defaultMovieIcon
            }
            alt={movie.title}
            className="w-full  max-h-80 object-contain"
          />
        </Link>
      </div>

      <h2 className="text-xl font-semibold">{movie.title}</h2>
    </div>
  );
}

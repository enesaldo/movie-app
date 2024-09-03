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
    <Link href={`/movie/${movie.id}`}>
      <div
        key={movie.id}
        className="flex backdrop-blur-2xl text-center transition-colors justify-center  hover:bg-[#12121280] bg-gray-800 rounded-lg overflow-hidden "
      >
        <div className="flex justify-between flex-col ">
          <div className="p-4 max-w-30">
            <Image
              width={500}
              height={500}
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : defaultMovieIcon
              }
              alt={movie.title}
              className="w-full min-h-80 rounded-xl object-contain"
            />
          </div>

          <h2 className="text-xl pb-4 max-h-14  font-semibold">
            {movie.title}
          </h2>
        </div>
      </div>
    </Link>
  );
}

import Link from "next/link";
import { fetcher } from "../lib/fetcher";
import Image from "next/image";
import { Genres } from "../../type";
import Pagination from "@/components/pagination";

type HomeProps = {
  searchParams: {
    page?: string;
  };
};

const Home = async ({ searchParams }: HomeProps) => {
  const data = await fetcher("https://api.themoviedb.org/3/movie/popular");
  const movies = data.results;

  const url = "https://api.themoviedb.org/3/genre/movie/list?language=en";
  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_KEY}`,
    },
  };

  const response = await fetch(url, options);
  const dataGenre = (await response.json()) as Genres;

  return (
    <div className="p-4 overflow-hidden">
      <div>
        {" "}
        {dataGenre?.genres?.map((genre) => (
          <Link href={`/genre/${genre?.id}?genre=${genre.name}`}>
            {genre?.name}
          </Link>
        ))}{" "}
      </div>
      <h1 className="text-3xl font-bold mb-4">Popular Movies</h1>
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie: any) => (
          <div
            key={movie.id}
            className="bg-gray-800 rounded-lg overflow-hidden"
          >
            <Image
              width={500}
              height={750}
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full min-h-max object-cover"
            />{" "}
            <div className="p-4">
              <h2 className="text-xl font-semibold">{movie.title}</h2>
              <Link
                href={`/movie/${movie.id}`}
                className="text-blue-400 hover:underline"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

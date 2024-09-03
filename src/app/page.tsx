import Link from "next/link";
import { fetcher, fetchGenres } from "../lib/fetcher";
import Image from "next/image";
import MovieCard from "@/components/MovieCard";
import { Genres } from "../../type"; // Burada `Genres` tipini içe aktardık

type HomeProps = {
  searchParams: {
    page?: string;
  };
};

const Home = async ({ searchParams }: HomeProps) => {
  const data = await fetcher("https://api.themoviedb.org/3/movie/popular");
  const movies = data.results;

  const dataGenre = await fetchGenres();

  return (
    <div className="p-4 overflow-hidden">
      <div>
        {dataGenre?.genres?.map((genre: Genres["genres"][number]) => (
          <Link key={genre.id} href={`/genre/${genre.id}?genre=${genre.name}`}>
            {genre.name}
          </Link>
        ))}
      </div>
      <h1 className="text-3xl font-bold mb-4">Popular Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie: any) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Home;

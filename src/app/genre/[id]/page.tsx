import Pagination from "../../../components/Pagination";
import { fetcher } from "../../../lib/fetcher";
import MovieCard from "@/components/MovieCard";

type GenreMoviesProps = {
  params: {
    id: string;
  };
  searchParams: {
    page?: string;
  };
};

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
};

export default async function GenreMovies({
  params,
  searchParams,
}: GenreMoviesProps) {
  const { id } = params;

  const page = searchParams.page || "1";
  const url = `https://api.themoviedb.org/3/discover/movie`;

  const moviesData = await fetcher(url, {
    with_genres: id,
    page: page,
  });

  const totalPages = moviesData.total_pages;
  const movies = moviesData.results;

  return (
    <div className="p-4">
      <div className="flex-wrap grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10  rounded-xl">
        {movies.map((movie: Movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <Pagination
        currentPage={parseInt(page)}
        totalPages={totalPages}
        basePath={`/genre/${id}`}
      />
    </div>
  );
}

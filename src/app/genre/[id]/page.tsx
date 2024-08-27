import Pagination from "../../../components/pagination";
import { fetcher } from "../../../lib/fetcher";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
};

type GenreMoviesProps = {
  params: {
    id: string;
  };
  searchParams: {
    page?: string;
  };
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
    <div className="">
      <div className="flex-wrap grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10  rounded-xl">
        {movies.map((movie: Movie) => (
          <div className="lg:space-y-5 space-x-5 rounded-xl" key={movie.id}>
            <img
              className="w-full"
              src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
              alt={movie.title}
            />

            <div className="space-y-2">
              {" "}
              <h2 className="text-xl font-semibold">{movie.title}</h2>
              <p className=" ml-2 truncate h-12 ">{movie.overview}</p>{" "}
            </div>
          </div>
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

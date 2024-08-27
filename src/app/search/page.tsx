import { fetcher } from "../../lib/fetcher";

import Pagination from "../../components/pagination";

type SearchResultsProps = {
  searchParams: {
    query: string;
    page: string;
  };
};
type Movie = {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
};

export default async function SearchResults({
  searchParams,
}: SearchResultsProps) {
  const { query, page = "1" } = searchParams;
  const url = `https://api.themoviedb.org/3/search/movie`;

  const searchResults = await fetcher(url, { query, page });
  const movies = searchResults.results;
  const totalPages = searchResults.total_pages;

  return (
    <div>
      <nav className="flex-wrap grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 text-overflow rounded-xl">
        {movies.map((movie: Movie) => (
          <div className="" key={movie.id}>
            <img
              className="w-full"
              src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
              alt={movie.title}
            />
            <h2 className="lg:space-y-5 space-x-5 truncate h-12  rounded-xl">
              {movie.title}
            </h2>
            <p className="truncate h-12 ">{movie.overview}</p>
          </div>
        ))}
      </nav>
      <Pagination
        currentPage={parseInt(page)}
        totalPages={totalPages}
        basePath={`/search`}
        queryParam={`query=${query}&`}
      />
    </div>
  );
}

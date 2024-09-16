import { fetcher } from "@/lib/fetcher";
import Pagination from "@/components/Pagination";
import MovieCard from "@/components/MovieCard";

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

  if (!searchResults.results || searchResults.results.length === 0) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold">Film Bulunamadı</h1>
        <p className="text-gray-500">
          Aradığınız kriterlere uygun bir film bulunamadı. Lütfen başka bir
          arama yapın.
        </p>
      </div>
    );
  }

  const movies = searchResults.results;
  const totalPages = searchResults.total_pages;

  return (
    <div>
      <nav className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 text-overflow rounded-xl">
        {movies.map((movie: Movie) => (
          <MovieCard key={movie.id} movie={movie} />
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

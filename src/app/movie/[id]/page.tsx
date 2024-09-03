import Image from "next/image";
import { fetcher } from "../../../lib/fetcher";

const defaultUserIcon = "/def-icon.png";
const defaultMovieIcon = "/def-movie.png";

const MovieDetail = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const movie = await fetcher(`https://api.themoviedb.org/3/movie/${id}`);
  const videos = await fetcher(
    `https://api.themoviedb.org/3/movie/${id}/videos`
  );
  const credits = await fetcher(
    `https://api.themoviedb.org/3/movie/${id}/credits`
  );

  const trailer = videos.results.find((video: any) => video.type === "Trailer");

  return (
    <div className="p-4 overflow-hidden relative">
      <div className="flex justify-center flex-col  sm:flex-row">
        <div className="flex md:w-1/2 w-full h-max justify-center items-center">
          <Image
            width={500}
            height={500}
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : defaultMovieIcon
            }
            alt={movie.title}
            className="sm:w-full w-1/2 h-max object-cover mb-4 md:mb-0"
          />
        </div>
        <div className="md:ml-4 flex-1 relative overflow-scroll">
          <h1 className="text-3xl flex text-center font-bold mb-4">
            {movie.title}
          </h1>

          <p className="flex justify-start text-start mb-4">{movie.overview}</p>
          {trailer && (
            <div className="mb-4">
              <h2 className="text-xl flex text-center font-semibold mb-2">
                Trailer
              </h2>
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}`}
                className="w-full h-64"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          )}
          <div>
            <h2 className="text-xl font-semibold mb-2">Cast</h2>
            <div className="justify-start grid lg:grid-cols-4 sm:grid-cols-2  gap-2">
              {credits.cast.map((cast: any, index: number) => (
                <div
                  key={index}
                  className="mb-2 flex text-center  whitespace-nowrap  text-ellipsis"
                >
                  <Image
                    width={500}
                    height={750}
                    src={
                      cast.profile_path
                        ? `https://image.tmdb.org/t/p/w200${cast.profile_path}`
                        : defaultUserIcon
                    }
                    alt={cast.name}
                    className="max-w-12 max-h-12 object-cover rounded-full mr-2"
                  />
                  <div className="max-w-32 truncate  flex items-center">
                    <strong>{cast.name}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;

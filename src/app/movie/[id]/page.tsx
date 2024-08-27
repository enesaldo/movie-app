import Image from "next/image";
import { fetcher } from "../../../lib/fetcher";

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
    <div className=" p-4 overflow-hidden relative">
      <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
      <div className="flex flex-col max-h-dvh md:flex-row">
        <Image
          width={1000}
          height={1000}
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full md:w-1/3 h-full  object-cover mb-4 md:mb-0"
        />
        <div className="md:ml-4 flex-1 relative overflow-scroll">
          <p className="mb-4">{movie.overview}</p>
          {trailer && (
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Trailer</h2>
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}`}
                className="w-full h-64"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          )}
          <div className="">
            <h2 className="text-xl font-semibold mb-2">Cast</h2>
            <ul className="flex-wrap grid grid-cols-4 gap-2">
              {credits.cast.map((cast: any, index: number) => (
                <li
                  key={index}
                  className="mb-2 overflow-hidden whitespace-nowrap hover:text-pretty  text-ellipsis"
                >
                  {cast.profile_path && (
                    <Image
                      width={500}
                      height={750}
                      src={`https://image.tmdb.org/t/p/w200${cast.profile_path}`}
                      alt={cast.name}
                      className="inline-block w-12 h-12 object-cover rounded-full mr-2"
                    />
                  )}
                  <strong>{cast.name}</strong> as {cast.character}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;

export const fetcher = async (
  url: string,
  params: Record<string, string> = {}
) => {
  const response = await fetch(
    `${url}?${new URLSearchParams({
      ...params,
    }).toString()}`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }

  return response.json();
};

export const fetchGenres = async () => {
  const url = "https://api.themoviedb.org/3/genre/movie/list";
  const data = await fetcher(url);
  return data.genres;
};

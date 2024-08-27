import React, { useEffect, useState } from "react";
import Link from "next/link";
import { fetchGenres } from "../lib/fetcher";

type Genre = {
  id: number;
  name: string;
};

export default function SideBar() {
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    const getGenres = async () => {
      const genresData = await fetchGenres();
      setGenres(genresData);
    };
    getGenres();
  }, []);

  return (
    <div className="flex fixed flex-col w-64 overflow-hidden text-overflow">
      <h1 className=" text-2xl m-1 text-center justify-center">KATEGORİLER</h1>
      <nav className="font-semibold text-lg w-64">
        {genres.map((genre) => (
          <div
            key={genre.id}
            className="m-1 ml-6 w-32 border-2 p-0.5 hover:bg-teal-700   opacity-80 hover:opacity-100"
          >
            <Link
              className="space-y-2 text-xs flex"
              href={`/genre/${genre.id}`}
            >
              {genre.name}
            </Link>
          </div>
        ))}
      </nav>
    </div>
  );
}

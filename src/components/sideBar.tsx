"use client";

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
    <div className="flex  flex-col w-64 overflow-hidden text-overflow  bg-gray-900 text-white shadow-lg">
      <h1 className=" text-2xl ml-6 m-2 text-start justify-start">Genres</h1>
      <nav className="space-y-2 px-6 flex flex-col overflow-y-auto">
        {genres.map((genre) => (
          <Link key={genre.id} href={`/genre/${genre.id}`}>
            <div className="group flex items-center justify-between py-2 px-4 rounded-md bg-gray-800 hover:bg-purple-700 transition-colors duration-300">
              <span className="text-base truncate group-hover:text-white">
                {genre.name}
              </span>
              <svg
                className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
}

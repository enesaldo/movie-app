"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { fetchGenres } from "../lib/fetcher";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

type Genre = {
  id: number;
  name: string;
};

export default function SideBar() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const content = useRef<HTMLDivElement>(null);

  function toggleIsOpen() {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    const getGenres = async () => {
      const genresData = await fetchGenres();
      setGenres(genresData);
    };
    getGenres();
  }, []);

  return (
    <div
      className={`fixed top-[76px] left-0 h-full w-full z-50 ${
        isOpen ? "bg-[#12121280]" : ""
      }`}
    >
      <div
        className="text-2xl w-max backdrop-blur-2xl transition-colors bg-[#12121280] p-3 cursor-pointer flex justify-start items-center"
        onClick={toggleIsOpen}
      >
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
      </div>
      <div
        ref={content}
        className={`${
          isOpen ? "max-h-full" : "max-h-0"
        } overflow-y-auto transition-all duration-300 ease-in-out`}
      >
        <h1 className="md:text-2xl text-lg m-1 ml-3 text-center justify-center">
          Genres
        </h1>
        <nav className="space-y-2 p-6">
          {genres.map((genre) => (
            <Link key={genre.id} href={`/genre/${genre.id}`}>
              <div className="group flex items-center justify-between py-2 px-4 rounded-md bg-gray-800 hover:bg-purple-700 transition-colors duration-300">
                <span className="text-xs truncate group-hover:text-white">
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
    </div>
  );
}

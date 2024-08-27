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
  const [height, setHeight] = useState("0px");

  const content = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (content?.current) {
      setHeight(isOpen ? `${content.current.scrollHeight}px` : "0px");
    }
  }, [isOpen]);

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
    <div className="fixed h-full z-50">
      <div
        className="text-2xl w-max backdrop-blur-2xl transition-colors bg-[#12121280] p-3 cursor-pointer flex justify-start items-center"
        onClick={toggleIsOpen}
      >
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
      </div>
      <div
        ref={content}
        style={{ maxHeight: height }}
        className="flex flex-col md:w-64 w-32 overflow-y-auto text-overflow backdrop-blur-2xl transition-all bg-[#12121280] h-full"
      >
        <h1 className="md:text-2xl text-lg m-1 text-center justify-center">
          KATEGORİLER
        </h1>
        <nav className="font-semibold text-lg md:grid-cols-1 grid-cols-2 ">
          {genres.map((genre) => (
            <div
              key={genre.id}
              className="m-1 md:ml-6 md:w-32 w-24 border-2 p-0.5 hover:bg-teal-700 opacity-80 hover:opacity-100"
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
    </div>
  );
}

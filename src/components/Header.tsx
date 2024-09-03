"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const [query, setQuery] = useState<string>("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?query=${query}`);
    }
  };

  return (
    <div className="flex backdrop-blur-2xl justify-between transition-colors p-5 bg-[#12121280] gap-4 md:gap-0 sticky z-50 top-0 ">
      <Link href={"/"}>
        <Image
          src="/logo.svg"
          alt="Logo"
          width={40}
          height={40}
          priority={true}
          className="cursor-pointer  w-24  h-auto"
        />
      </Link>
      <form
        onSubmit={handleSearch}
        className="flex sm:flex-row gap-2 flex-col max-md:w-full items-center"
      >
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 rounded  md:w-96 w-full  bg-gray-800 text-white"
        />
        <button
          type="submit"
          className="sm:m-0 m-2 sm:p-2 p-0.5 sm:w-max w-full sm:text-base text-xs bg-purple-700 text-white rounded"
        >
          Search
        </button>
      </form>
      <div></div>
    </div>
  );
};

export default Header;

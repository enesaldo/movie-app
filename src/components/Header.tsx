import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?query=${query}`);
    }
  };

  return (
    <div className="flex backdrop-blur-2xl transition-colors p-5 bg-[#12121280] gap-4 md:gap-0 sticky z-50 top-0  justify-between">
      <Link href={"/"}>
        <Image
          src="/logo.png"
          alt="Logo"
          width={120}
          height={100}
          priority={true}
          className="cursor-pointer sm:w-40 h-auto"
        />
      </Link>
      <form
        onSubmit={handleSearch}
        className="flex sm:flex-row flex-col items-center"
      >
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 rounded sm:w-full w-20  bg-gray-800 text-white"
        />
        <button
          type="submit"
          className="sm:m-0 mt-2 sm:p-2 p-0.5 sm:w-max w-full sm:text-base text-xs bg-blue-600 text-white rounded"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Header;

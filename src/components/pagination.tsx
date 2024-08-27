import Link from "next/link";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  basePath: string;
  queryParam?: string;
};

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
  queryParam = "",
}: PaginationProps) {
  return (
    <div className="flex justify-center space-x-4 md:mt-4 mt-2">
      {currentPage > 1 && (
        <Link
          className="md:px-4 md:py-2 p-1 bg-gray-700 text-white rounded"
          href={`${basePath}?${queryParam}page=${currentPage - 1}`}
        >
          Previous
        </Link>
      )}
      <span className="px-4 py-2 bg-gray-200 rounded">
        Page {currentPage} of {totalPages}
      </span>
      {currentPage < totalPages && (
        <Link
          className="md:px-4 md:py-2 p-1 bg-gray-700 text-white rounded"
          href={`${basePath}?${queryParam}page=${currentPage + 1}`}
        >
          Next
        </Link>
      )}
    </div>
  );
}

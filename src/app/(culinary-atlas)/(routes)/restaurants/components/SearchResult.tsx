import { memo } from "react";

interface SearchResultProps {
  totalResults: number;
  searchTime: number;
}

const SearchResult = memo(function SearchResult({ totalResults, searchTime }: SearchResultProps) {
  return (
    <p className="text-gray-600">
      Found{" "}
      <span className="font-semibold text-[#44BACA]">
        {totalResults} result{totalResults !== 1 ? "s" : ""}
      </span>{" "}
      in <span className="font-semibold">{searchTime} seconds</span>
    </p>
  );
});

export default SearchResult;
import { memo } from "react";

type SortOption = "rating-low-high" | "rating-high-low" | "price-low-high" | "price-high-low";

interface SortDropdownProps {
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "rating-low-high", label: "Rating: Low to High" },
  { value: "rating-high-low", label: "Rating: High to Low" },
  { value: "price-low-high", label: "Price: Low to High" },
  { value: "price-high-low", label: "Price: High to Low" },
];

const SortDropdown = memo(function SortDropdown({ sortBy, setSortBy }: SortDropdownProps) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort-select" className="text-sm text-gray-600 whitespace-nowrap">
        Sort by
      </label>
      <select
        id="sort-select"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value as SortOption)}
        className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#44BACA] focus:border-transparent"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
});

export default SortDropdown;
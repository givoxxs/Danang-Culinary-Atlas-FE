"use client";

import { useState, useMemo, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import RestaurantCard from "@/components/restaurants/RestaurantCard";
import Pagination from "./components/Pagination";
import FilterSideBar from "./components/FilterSideBar";
import FindRestaurants from "./components/FindRestaurants";
import SortDropdown from "./components/SortDropdown";
import SearchResultPages from "./components/SearchResultPages";
import ViewToggle from "./components/ViewToggle";
import SearchResult from "./components/SearchResult";
import restaurants from "@/stores/mockRestaurants";
import SortOption from "@/types/sort-option";
import ViewMode from "@/types/view-mode";
import { FilterState } from "@/types/filter";
// Separate the main content into its own component to use useSearchParams
function RestaurantSearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // URL-synced state
  const [currentPage, setCurrentPage] = useState(() => 
    parseInt(searchParams.get("page") || "1", 10)
  );
  const [sortBy, setSortBy] = useState<SortOption>(() => 
    (searchParams.get("sort") as SortOption) || "rating-low-high"
  );
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [resultsPerPage, setResultsPerPage] = useState(6);
  
  // Filter state (could be lifted to URL params as well)
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [],
    cuisineTypes: [],
    minRating: null,
  });

  // Memoized filtered and sorted restaurants
  const filteredRestaurants = useMemo(() => {
    let result = [...restaurants];

    // Apply filters
    if (filters.priceRange.length > 0) {
      //result = result.filter(r => filters.priceRange.includes(r.price));
    }
    
    if (filters.cuisineTypes.length > 0) {
      result = result.filter(r => filters.cuisineTypes.includes(r.category));
    }
    
    if (filters.minRating) {
      result = result.filter(r => r.rating >= filters.minRating!);
    }

    // Apply sorting
    switch (sortBy) {
      case "rating-high-low":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "rating-low-high":
        result.sort((a, b) => a.rating - b.rating);
        break;
      case "price-high-low":
        //result.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
        break;
      case "price-low-high":
        // result.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
        break;
    }

    return result;
  }, [restaurants, filters, sortBy]);

  // Paginated results
  const paginatedRestaurants = useMemo(() => {
    const startIndex = (currentPage - 1) * resultsPerPage;
    return filteredRestaurants.slice(startIndex, startIndex + resultsPerPage);
  }, [filteredRestaurants, currentPage, resultsPerPage]);

  const totalPages = Math.ceil(filteredRestaurants.length / resultsPerPage);

  // Callbacks with useCallback to prevent unnecessary re-renders
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    // Update URL
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  }, [router, searchParams]);

  const handleSortChange = useCallback((newSort: SortOption) => {
    setSortBy(newSort);
    setCurrentPage(1); // Reset to first page on sort change
    
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", newSort);
    params.set("page", "1");
    router.push(`?${params.toString()}`, { scroll: false });
  }, [router, searchParams]);

  const handleFilterChange = useCallback((newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1); // Reset to first page on filter change
  }, []);

  const handleRestaurantClick = useCallback((restaurantId: string) => {
    router.push(`/restaurants/${restaurantId}`);
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <FindRestaurants />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <FilterSideBar 
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <SearchResult 
                totalResults={filteredRestaurants.length}
                searchTime={54}
              />

              <div className="flex flex-wrap items-center gap-3">
                <SortDropdown 
                  sortBy={sortBy} 
                  setSortBy={handleSortChange} 
                />
                
                <SearchResultPages 
                  resultsPerPage={resultsPerPage}
                  setResultsPerPage={setResultsPerPage}
                />
                
                <ViewToggle 
                  viewMode={viewMode} 
                  setViewMode={setViewMode} 
                />
              </div>
            </div>

            {/* Restaurant Grid/List */}
            {paginatedRestaurants.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No restaurants found matching your criteria.</p>
                <button 
                  onClick={() => handleFilterChange({ priceRange: [], cuisineTypes: [], minRating: null })}
                  className="mt-4 text-[#44BACA] hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <>
                <div className={`
                  ${viewMode === "grid" 
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" 
                    : "flex flex-col gap-4"
                  }
                `}>
                  {paginatedRestaurants.map((restaurant) => (
                    <RestaurantCard 
                      key={restaurant.id}
                      restaurant={restaurant}
                      onClick={() => handleRestaurantClick(restaurant.id.toString())}
                      />
                  ))}
                </div>
                {/* Pagination */}
                {/* {totalPages > 1 && ( */}
                  <Pagination 
                    currentPage={currentPage} 
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                {/* )} */}
                
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

// Helper function
function parsePrice(priceString: string): number {
  // Extract numeric value from price string like "$30 and under"
  const match = priceString.match(/\$(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

// Main page component with Suspense boundary
export default function Page() {
  return (
    <Suspense fallback={<LoadingState />}>
      <RestaurantSearchContent />
    </Suspense>
  );
}

// Loading state component
function LoadingState() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#44BACA] mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading restaurants...</p>
      </div>
    </div>
  );
}
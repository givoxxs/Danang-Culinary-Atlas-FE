import { memo } from "react";
import { Grid, List } from "lucide-react";

type ViewMode = "grid" | "list";

interface ViewToggleProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

const ViewToggle = memo(function ViewToggle({ viewMode, setViewMode }: ViewToggleProps) {
  return (
    <div className="flex gap-1 bg-gray-100 p-1 rounded-lg" role="group" aria-label="View mode">
      <button
        onClick={() => setViewMode("grid")}
        className={`p-2 rounded transition ${
          viewMode === "grid" ? "bg-white shadow" : "hover:bg-gray-200"
        }`}
        aria-label="Grid view"
        aria-pressed={viewMode === "grid"}
      >
        <Grid className="w-5 h-5 text-gray-700" />
      </button>
      <button
        onClick={() => setViewMode("list")}
        className={`p-2 rounded transition ${
          viewMode === "list" ? "bg-white shadow" : "hover:bg-gray-200"
        }`}
        aria-label="List view"
        aria-pressed={viewMode === "list"}
      >
        <List className="w-5 h-5 text-gray-700" />
      </button>
    </div>
  );
});

export default ViewToggle;
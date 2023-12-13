import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useLocation, useNavigate } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
export default function SearchBar({
  placeholder,
  onSearch,
}: {
  placeholder: string;
  onSearch?: (query: string) => void;
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const currentParams = new URLSearchParams(location.search);
  const defaultQuery = currentParams.get("query") || "";

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(location.search);

    if (e.target.value !== "") {
      params.set("query", e.target.value);
    } else {
      params.delete("query");
    }

    // Update the URL with the new search parameters
    navigate(`${location.pathname}?${params.toString()}`);
    if (onSearch) {
      onSearch(params.get("query") || "");
    }
  };

  const debouncedSearch = useDebouncedCallback(handleSearch, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        id="search"
        type="text"
        onChange={debouncedSearch}
        defaultValue={defaultQuery}
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 focus:outline-1 focus:border-none focus:outline-green-700"
        placeholder={placeholder}
        aria-label="Search"
        aria-describedby="search-icon"
      />
      <MagnifyingGlassIcon
        id="search-icon"
        className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"
        aria-hidden="true"
      />
    </div>
  );
}

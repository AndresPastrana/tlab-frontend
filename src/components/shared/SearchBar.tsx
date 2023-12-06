import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import { useDebouncedCallback } from "use-debounce";
export default function SearchBar({ placeholder }: { placeholder: string }) {
  const hanldeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Searching");
    console.log(e);
    //TODO: Update the url

    // const params = new URLSearchParams(current_params);
    // params.set("page", "1");
    // if (e.target.value !== "") {
    //   params.set("query", e.target.value);
    // } else {
    //   params.delete("query");
    // }
    // replace(`${pathname}?${params.toString()}`);
  };
  const serarch = useDebouncedCallback(hanldeSearch, 300);
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        onChange={serarch}
        // defaultValue={current_params.get("query") || ""}
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 focus:outline-1 focus:border-none focus:outline-green-700"
        placeholder={placeholder}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}

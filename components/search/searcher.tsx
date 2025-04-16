import { useState } from "react";

interface SearchProps<T> {
  data: T[];
  searchKeys: (keyof T)[];
  onSearchResults: (results: T[]) => void;
  placeholder?: string;
}

function Searcher<T>({ data, searchKeys, onSearchResults, placeholder = "Search..." }: SearchProps<T>) {
  const [query, setQuery] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setQuery(value);
    
    const filteredData = data.filter((item) =>
      searchKeys.some((key) =>
        String(item[key]).toLowerCase().includes(value)
      )
    );
    
    onSearchResults(filteredData);
  };

  return (
    <input
      type="text"
      value={query}
      onChange={handleSearch}
      placeholder={placeholder}
      className="p-2 border rounded w-full"
    />
  );
}

export default Searcher;

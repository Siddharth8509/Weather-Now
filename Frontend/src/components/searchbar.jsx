import { useState } from "react";
import "./SearchBar.css";

function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input);
      setInput(""); // clear after search
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <span className="search-icon">🔍</span>
      <input
        type="text"
        value={input}
        placeholder="Enter city name"
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;

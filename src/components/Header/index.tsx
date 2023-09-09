import React, { useEffect, useState } from "react";
import { useFlipFlop } from "../../hooks/useFlipFlop";
import Logo from "../../logo.svg";

const Header: React.FC = () => {
  const [isPinned, , , togglePin] = useFlipFlop(false);
  const [searchInput, setSearchInput] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = () => {
    if (searchInput.trim() !== "") {
      window.location.href = `/anime/search?q=${searchInput}`;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    const listenScrollEvent = () => {
      togglePin(window.scrollY > 1);
    };

    window.addEventListener("scroll", listenScrollEvent);

    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
    };
  }, [togglePin]);

  return (
    <header
      className={`flex vertical-center header-color${
        isPinned ? "-pinned" : "-unpinned"
      }`}
    >
      <a href="/">
        <img src={Logo} alt="logo" />
      </a>
      <ul className="site-nav">
        <li>
          <a href="/anime/top">Top</a>
        </li>
        <li>
          <a href="/anime/seasonal">Seasonal</a>
        </li>
        <li>
          <a href="/anime/genre">Genre</a>
        </li>
        <li>
          <a href="/anime/recommendation">Recommendation</a>
        </li>
        <li>
          <a href="/anime/search">Search</a>
        </li>
      </ul>
      <div className="search-box horizontal-right">
        <button className="btn-search" onClick={handleSearch}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
        <input
          id="header-search"
          type="text"
          className="input-search"
          placeholder="Type to Search..."
          value={searchInput}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        ></input>
      </div>
    </header>
  );
};

export default Header;

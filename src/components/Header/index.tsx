import React, { useEffect, useState } from "react";
import { setLowerCaseAndDashTo } from "../../helpers/string";
import Logo from "../../logo.svg";

const Header: React.FC = () => {
  const [pinned, setPinned] = useState("-unpinned");
  const [searchInput, setSearchInput] = useState(""); // State to store the input value

  const listenScrollEvent = () => {
    if (window.scrollY > 1) {
      setPinned("-pinned");
    } else {
      setPinned("-unpinned");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value); // Update the search input state
  };

  const handleSearch = () => {
    if (searchInput.trim() !== "") {
      window.location.href = `/search?q=${setLowerCaseAndDashTo(searchInput)}`;
      // Check if the search input is not empty    }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // Listen for Enter key press
      handleSearch();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
  });

  return (
    <header className={`flex vertical-center header-color${pinned}`}>
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
      </ul>
      <div className="search-box horizontal-right">
        <button className="btn-search" onClick={handleSearch}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
        <input
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

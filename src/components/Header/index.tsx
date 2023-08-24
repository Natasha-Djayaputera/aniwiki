import React, { useEffect, useState } from "react";
import Logo from "../../logo.svg";

const Header: React.FunctionComponent = () => {
  const [pinned, setPinned] = useState("-unpinned");

  const listenScrollEvent = () => {
    if (window.scrollY > 1) {
      setPinned("-pinned");
    } else {
      setPinned("-unpinned");
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
          <a href="/top">Top</a>
        </li>
        <li>
          <a href="/seasonal">Seasonal</a>
        </li>
        <li>
          <a href="/genre">Genre</a>
        </li>
        <li>
          <a href="/recommendation">Recommendation</a>
        </li>
      </ul>
      <div className="search-box horizontal-right">
        <button className="btn-search">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
        <input
          type="text"
          className="input-search"
          placeholder="Type to Search..."
        ></input>
      </div>
    </header>
  );
};

export default Header;

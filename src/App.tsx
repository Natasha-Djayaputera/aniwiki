import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import AnimePage from "./pages/anime";
import AnimeSearchPage from "./pages/animeSearch";
import AnimeSeasonalPage from "./pages/animeSeasonal";
import AnimeTopPage from "./pages/animeTop";
import HomePage from "./pages/home";

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Router>
        <Routes>
          <Route caseSensitive path="/" Component={HomePage}></Route>
          <Route caseSensitive path="/anime/:id" Component={AnimePage}></Route>
          <Route
            caseSensitive
            path="/anime/top"
            Component={AnimeTopPage}
          ></Route>
          <Route
            caseSensitive
            path="/anime/seasonal"
            Component={AnimeSeasonalPage}
          ></Route>
          <Route
            caseSensitive
            path="/search"
            Component={AnimeSearchPage}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import AnimePage from "./pages/anime";
import AnimeAdvancedSearchPage from "./pages/animeAdvancedSearch";
import AnimeGenrePage from "./pages/animeGenre";
import AnimeRecommendationPage from "./pages/animeRecommendation";
import AnimeSeasonalPage from "./pages/animeSeasonal";
import AnimeTopPage from "./pages/animeTop";
import HomePage from "./pages/home";

const App: React.FC = () => {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <Header />
        <Router>
          <Routes>
            <Route caseSensitive path="/" Component={HomePage}></Route>
            <Route
              caseSensitive
              path="/anime/:id"
              Component={AnimePage}
            ></Route>
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
              path="/anime/genre"
              Component={AnimeGenrePage}
            ></Route>
            <Route
              caseSensitive
              path="/anime/recommendation"
              Component={AnimeRecommendationPage}
            ></Route>
            <Route
              caseSensitive
              path="/anime/search"
              Component={AnimeAdvancedSearchPage}
            ></Route>
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
};

export default App;

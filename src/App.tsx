import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import AnimePage from "./pages/anime";
import HomePage from "./pages/home";

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Router>
        <Routes>
          <Route caseSensitive path="/" Component={HomePage}></Route>
          <Route caseSensitive path="/anime/:id" Component={AnimePage}></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;

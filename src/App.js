import Main from "./components/Main/Main";
import Header from "./components/Header/Header";
import Details from "./components/Details/Details";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" exact element={<Main />}></Route>
          <Route path="/:id/details" element={<Details />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home, CreatePost, Login, Register } from "./page";
import { Navigator } from "./components";

const App = () => {
  return (
    <Router>
      <Navigator />
      <main className="sm:px-8 px-4 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      <footer className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-t border-t-[$e6ebf4]">
        My Foot
      </footer>
    </Router>
  );
};

export default App;

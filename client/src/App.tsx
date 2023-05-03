import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home, CreatePost, Login, Register, Profile } from "./page";
import { Navigator } from "./components";
import { Modal } from "./components";
import { useAppSelector } from "./store";
import ProtectedRoute from "./utils/ProtectedRoute";
import { selectIsModalOpen } from "./store/Reducers/modalSlice";

const App = () => {
  const isModalOpen = useAppSelector(selectIsModalOpen);

  return (
    <Router>
      {isModalOpen && <Modal />}
      <Navigator />
      <main className="w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreatePost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/:user"
            element={
              <ProtectedRoute>
                <Profile />{" "}
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      <footer className="w-full flex justify-between items-center bg-white py-4 border-t border-t-[$e6ebf4]">
        @Mar 2023 - Apr 2023
      </footer>
    </Router>
  );
};

export default App;

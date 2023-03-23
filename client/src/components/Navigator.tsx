import { Link } from "react-router-dom";
import { logo } from "../assets";
import { useAppSelector } from "../store";
import { selectIsLoggedIn } from "../store/Reducers/authSlice";

function Navigator() {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return (
    <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[$e6ebf4]">
      <Link to="/">
        <img src={logo} alt="logo" className="w-28 object-contain" />
      </Link>
      <div>
        {isLoggedIn ? (
          <Link
            to="/create"
            className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
          >
            Create
          </Link>
        ) : (
          <Link
            to="/login"
            className="font-inter font-medium bg-green-600 text-white px-4 py-2 rounded-md"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
}

export default Navigator;

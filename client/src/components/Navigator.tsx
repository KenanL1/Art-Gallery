import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store";
import {
  selectIsLoggedIn,
  selectUser,
  selectUsername,
  logout,
} from "../store/Reducers/authSlice";

const Navigator = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const user = useAppSelector(selectUser);
  const username = useAppSelector(selectUsername);

  const ProfileDropdown = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };

    const handleLogout: React.MouseEventHandler<HTMLButtonElement> = () => {
      dispatch(logout());
      navigate("/");
    };

    const handleGoToProfile: React.MouseEventHandler<
      HTMLButtonElement
    > = () => {
      navigate(`/profile/${user}`);
    };

    const MenuItem = ({
      name,
      clickHandler,
    }: {
      name: string;
      clickHandler: React.MouseEventHandler;
    }) => {
      return (
        <a
          href="#"
          role="button"
          className="block px-4 py-2 w-full text-gray-800 hover:bg-blue-500 hover:text-white"
          onClick={clickHandler}
        >
          {name}
        </a>
      );
    };

    return (
      <div className="relative inline-block">
        <button
          onClick={toggleDropdown}
          className="px-4 py-2 rounded-md bg-green-700 hover:bg-green-900 text-white font-bold"
        >
          {username && username[0]}
        </button>
        {isOpen && (
          <div className="absolute right-0 origin-top-right mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-10">
            {/* Dropdown content */}
            <MenuItem name="Profile" clickHandler={handleGoToProfile} />
            <MenuItem name="Logout" clickHandler={handleLogout} />
          </div>
        )}
      </div>
    );
  };

  return (
    <header className="w-full flex justify-between items-center bg-white p-3 border-b border-b-[$e6ebf4]">
      <Link to="/">
        <div className="text-3xl font-bold text-gray-900">Muse</div>
      </Link>
      <div>
        {isLoggedIn ? (
          <div className="">
            <ProfileDropdown />
            <Link
              to="/create"
              className="font-inter font-medium bg-purple-600 hover:bg-purple-800 text-white px-4 py-2 rounded-md ml-3"
            >
              Create
            </Link>
          </div>
        ) : (
          <Link
            to="/login"
            className="font-inter font-medium bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-md"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navigator;

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store";
import {
  selectIsLoggedIn,
  selectUser,
  selectUsername,
  logout,
} from "../store/Reducers/authSlice";
import { selectDarkMode, switchMode } from "../store/Reducers/themeSlice";
import { Moon, Sun } from "../assets";

const Navigator = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const user = useAppSelector(selectUser);
  const username = useAppSelector(selectUsername);
  const darkMode = useAppSelector(selectDarkMode);

  // useEffect(() => {
  //   dispatch(switchMode);
  // }, [darkMode]);

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
      <div className="">
        <button
          onClick={toggleDropdown}
          className=" bg-green-700 hover:bg-green-900 dark:text-white"
        >
          {username && username[0].toUpperCase()}
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
    <header className="w-full flex justify-between items-center bg-white dark:bg-slate-800 p-3 border-b border-b-[$e6ebf4]">
      <Link to="/">
        <div className="text-3xl font-bold text-slate-800 dark:text-white">
          Muse
        </div>
      </Link>
      <div className="flex">
        <div
          className="mx-3 flex items-center transition cursor-pointer hover:text-blue-600"
          onClick={() => dispatch(switchMode())}
        >
          {!darkMode ? (
            <Sun width="24px" height="24px" />
          ) : (
            <Moon width="24px" height="24px" />
          )}
        </div>
        {isLoggedIn ? (
          <div className="flex">
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

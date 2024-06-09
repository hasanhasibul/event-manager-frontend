import { Link } from "react-router-dom";

const HeaderNavigation = () => {
  return (
    <div className="bg-white   px-16 py-1">
      <nav className=" border-b ">
        <div>
          <ul className="flex justify-start items-center">
            <li>
              <Link to="/" className="block py-2 px-3  rounded text-blue-700 ">
                Events
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="block py-2 px-3  rounded text-blue-700 "
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                to="/add-event"
                className="block py-2 px-3  rounded text-blue-700 "
              >
                Create Event
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default HeaderNavigation;

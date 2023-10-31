import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import { useAuth } from "../users/UsersContext";
import User from "./User";

function PageNav() {
  const { user } = useAuth();
  return (
    <nav className="navbar ">
      <div className="container bg-white">
        <Logo />

        <ul className="ul">
          <li>
            <NavLink to="/home">Home</NavLink>
          </li>
          <li>
            <NavLink to="/newQuote">Quote</NavLink>
          </li>
          {user === "" && (
            <li>
              <NavLink to="/login">Přihlásit</NavLink>
            </li>
          )}
          <User />
        </ul>
      </div>
    </nav>
  );
}

export default PageNav;

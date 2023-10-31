import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/">
      <img src="/brand.png" alt="Sameday logo" className="logo" />
    </Link>
  );
}

export default Logo;

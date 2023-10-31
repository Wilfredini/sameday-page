import { useAuth } from "../users/UsersContext";
import Button from "./Button";

function User() {
  const { user, logout } = useAuth();

  function handleClick() {
    logout();
  }
  if (user === "") return;
  return (
    <>
      <div className="user">
        <span className="user-name">
          <img
            src="/public/1652377513815.jpg"
            alt="avatar"
            className="avatar"
          />
          {user.name}
        </span>
        <Button onClick={handleClick}>Logout</Button>
      </div>
    </>
  );
}
export default User;

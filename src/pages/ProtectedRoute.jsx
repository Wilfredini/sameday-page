import { useNavigate } from "react-router-dom";
import { useAuth } from "../users/UsersContext";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (user === "") navigate("/login");
    },
    [user, navigate]
  );

  return children;
}

export default ProtectedRoute;

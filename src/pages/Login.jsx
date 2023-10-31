import { useEffect, useState } from "react";
import PageNav from "../components/PageNav";
import { useAuth } from "../users/UsersContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (email && password) login(email, password);
  }

  useEffect(
    function () {
      if (isAuthenticated) navigate("/home", { replace: true });
    },
    [isAuthenticated, navigate]
  );

  return (
    <>
      <div className="login">
        <PageNav />
        <main className="main-login">
          <div className="overlay"></div>

          <div className="loginForm">
            <form className="form" onSubmit={handleSubmit}>
              <input
                id="email"
                type="email"
                className="input"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <input
                id="password"
                type="password"
                className="input"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <Button type="submit">Přihlásit</Button>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}

export default Login;

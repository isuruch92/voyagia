import { useEffect, useState } from "react";
import PageNav from "../components/PageNav";
import styles from "./Login.module.css";
import { useAuth } from "../context/FakeAuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("isuru922@hotmail.com");
  const [password, setPassword] = useState("qwerty@123");

  const { login, isAuthenticated, error } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (isAuthenticated) {
        //replace = true will replace the login page in broswer history to the new page
        //so when we click browser back button after the log-in, we will be at the page before the login page
        navigate("/app", { replace: true });
      }
    },
    [isAuthenticated, navigate]
  );

  function handleSubmit(e) {
    e.preventDefault();

    if (email && password) {
      login(email, password);
    }
  }

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
      {error && <div className={styles.error}>{error}</div>}
    </main>
  );
}

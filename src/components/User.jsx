import { useAuth } from "../context/FakeAuthContext";
import { useNavigate } from "react-router-dom";

import styles from "./User.module.css";
import useScreenSize from "../hooks/userScreenSize";

function User() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const screenSize = useScreenSize();

  function handleClick() {
    logout();
    navigate("/");
  }

  if (!user) {
    return null;
  }

  return (
    <div
      className={styles.user}
      style={{
        flexDirection: screenSize.width < 640 ? "column" : "row",
      }}
    >
      <img src={user.avatar} alt={user.name} />
      <span>Welcome, {user.name}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default User;

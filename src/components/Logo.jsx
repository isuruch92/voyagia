import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo({ isSidebarCollapsed }) {
  return (
    <Link to="/" className={styles.logoContainer}>
      <img
        src={isSidebarCollapsed ? "/logo-icon.svg" : "/logo.svg"}
        alt="TravellersLogue logo"
        className={styles.logo}
      />
    </Link>
  );
}

export default Logo;

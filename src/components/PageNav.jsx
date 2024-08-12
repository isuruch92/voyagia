import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";
import { useAuth } from "../context/FakeAuthContext";

function PageNav() {
  const { isAuthenticated, user } = useAuth();

  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.ctaLink}>
            {isAuthenticated ? `Hi, ${user.name}` : "Login"}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;

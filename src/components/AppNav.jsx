import { NavLink } from "react-router-dom";
import styles from "./AppNav.module.css";

function AppNav({ isSidebarCollapsed }) {
  return (
    <nav
      className={`${styles.nav} ${
        isSidebarCollapsed ? styles.collapsedNav : ""
      }`}
    >
      <ul
        className={`${styles.ul} ${
          isSidebarCollapsed ? styles.collapsedUl : ""
        }`}
      >
        <li className={isSidebarCollapsed ? styles.collapsedLi : ""}>
          <NavLink
            className={isSidebarCollapsed ? styles.collapsedLink : ""}
            to="citiies"
          >
            Cities
          </NavLink>
        </li>
        <li className={isSidebarCollapsed ? styles.collapsedLi : ""}>
          <NavLink
            className={isSidebarCollapsed ? styles.collapsedLink : ""}
            to="countries"
          >
            Countries
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AppNav;

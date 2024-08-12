import { useContext } from "react";
import { Outlet } from "react-router-dom";
import styles from "./Sidebar.module.css";
import Logo from "./Logo";
import AppNav from "./AppNav";
import { AppContext } from "../context/AppContext";

function Sidebar() {
  const { isCollapsed, handleCollapse } = useContext(AppContext);

  return (
    <div
      className={`${styles.sidebar} ${
        isCollapsed ? styles.sidebarCollapsed : ""
      }`}
    >
      <button onClick={handleCollapse}>{"<<"}</button>
      <Logo />
      <AppNav />

      <Outlet />

      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()} by Voyagia Inc.
        </p>
      </footer>
    </div>
  );
}

export default Sidebar;

import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import styles from "./Sidebar.module.css";
import Logo from "./Logo";
import AppNav from "./AppNav";
import { AppContext } from "../context/AppContext";
import { PanelRightOpen, PanelLeftOpen } from "lucide-react";
import useScreenSize from "../hooks/userScreenSize";

function Sidebar() {
  const {
    isCollapsed,
    handleCollapse,
    isManuallyToggled,
    setIsManuallyToggled,
  } = useContext(AppContext);
  const screenSize = useScreenSize();

  useEffect(() => {
    // Only handle automatic toggle based on screen size if it was not manually toggled
    if (!isManuallyToggled) {
      if (screenSize.width < 700 && !isCollapsed) {
        // Collapse the sidebar if it's not already collapsed
        handleCollapse();
      }
    }
  }, [screenSize.width, isCollapsed, handleCollapse, isManuallyToggled]);

  useEffect(() => {
    // Reset manual toggle flag when screen is resized below 700px
    if (screenSize.width >= 700) {
      setIsManuallyToggled(false);
    }
  }, [screenSize.width, setIsManuallyToggled]);

  return (
    <div
      className={`${styles.sidebar} ${
        isCollapsed ? styles.sidebarCollapsed : ""
      }`}
    >
      <div className={styles.sidebarInnerContainer}>
        <Logo isSidebarCollapsed={isCollapsed} />
        <AppNav isSidebarCollapsed={isCollapsed} />
        <Outlet />
      </div>

      <footer className={styles.footer}>
        <button className={styles.toggleButton} onClick={handleCollapse}>
          {isCollapsed ? (
            <PanelLeftOpen color="white" size={40} />
          ) : (
            <PanelRightOpen color="white" size={40} />
          )}
        </button>

        <p className={styles.copyright}>
          {!isCollapsed ? (
            <span>
              &copy; Copyright {new Date().getFullYear()} by Voyagia Inc.
            </span>
          ) : (
            <span>&copy;{new Date().getFullYear()} Voyagia Inc.</span>
          )}
        </p>
      </footer>
    </div>
  );
}

export default Sidebar;

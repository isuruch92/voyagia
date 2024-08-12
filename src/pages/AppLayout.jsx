import Sidebar from "../components/Sidebar";
import Map from "../components/Map";
import User from "../components/User";
import { AppProvider } from "../context/AppContext";

import styles from "./AppLayout.module.css";

function AppLayout() {
  return (
    <div className={styles.app}>
      <AppProvider>
        <Sidebar />
        <Map />
        <User />
      </AppProvider>
    </div>
  );
}

export default AppLayout;

import { useContext } from "react";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { useCities } from "../context/CititesContext";
import { AppContext } from "../context/AppContext";
import styles from "./CityItem.module.css";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city, Flag }) {
  const { isCollapsed } = useContext(AppContext);
  const { currentCity, deleteCity } = useCities();
  const { cityName, date, id, position } = city;

  function handleClick(e) {
    e.preventDefault();
    deleteCity(id);
  }

  return (
    <li
      data-tooltip-id="city-tooltip"
      data-tooltip-content={cityName}
      data-tooltip-place="right"
      data-tooltip-offset={0}
      className={isCollapsed ? styles.collapsedLi : ""}
      style={{ margin: isCollapsed ? "auto" : "" }}
    >
      <Link
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : ""
        } ${isCollapsed ? styles.collapsedLink : ""}`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>
          {Flag && <Flag style={{ height: "20px", borderRadius: "4px" }} />}
        </span>

        {!isCollapsed && (
          <>
            <h3 className={styles.name}>{cityName}</h3>
            <time className={styles.date}>({formatDate(date)})</time>
          </>
        )}
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
      {isCollapsed && (
        <Tooltip
          className={styles.tooltip}
          id="city-tooltip"
          style={{
            backgroundColor: "rgb(0, 0, 0)",
            color: "#fafafa",
            fontSize: "16px",
            borderRadius: "8px",
            padding: "8px 16px",
            overflow: "visible",
            zIndex: 99999,
          }}
        />
      )}
    </li>
  );
}

export default CityItem;

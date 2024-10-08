import { useContext } from "react";
import { Link } from "react-router-dom";
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
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>
          {Flag && <Flag style={{ height: "20px", borderRadius: "4px" }} />}
        </span>
        <h3 className={styles.name}>{cityName}</h3>

        {!isCollapsed && (
          <>
            <time className={styles.date}>({formatDate(date)})</time>
            <button className={styles.deleteBtn} onClick={handleClick}>
              &times;
            </button>
          </>
        )}
      </Link>
    </li>
  );
}

export default CityItem;

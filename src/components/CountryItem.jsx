import { useContext } from "react";
import styles from "./CountryItem.module.css";
import { AppContext } from "../context/AppContext";
import { Tooltip } from "react-tooltip";

function CountryItem({ country }) {
  const { isCollapsed } = useContext(AppContext);
  console.log(country);

  return (
    <li
      data-tooltip-id="country-tooltip"
      data-tooltip-content={country.countryName}
      data-tooltip-place="right"
      data-tooltip-offset={5}
      className={`${styles.countryItem} ${
        isCollapsed ? styles.countryItemCollapsed : ""
      }`}
    >
      {country.Flag && (
        <country.Flag style={{ height: "24px", borderRadius: "4px" }} />
      )}
      {isCollapsed ? (
        <span className={styles.code}>{country.countryCode}</span>
      ) : (
        <span>{country.countryName}</span>
      )}
      {isCollapsed && (
        <Tooltip
          className={styles.tooltip}
          id="country-tooltip"
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

export default CountryItem;

import styles from "./CountryItem.module.css";

function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      {country.Flag && (
        <country.Flag style={{ height: "24px", borderRadius: "4px" }} />
      )}
      <span>{country.countryName}</span>
    </li>
  );
}

export default CountryItem;

import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import Message from "./Message";
import { useCities } from "../context/CititesContext";
import Flags from "country-flag-icons/react/3x2";

function CountryList() {
  const { cities, isLoading } = useCities();

  if (isLoading) {
    return <Spinner />;
  }

  if (!cities.length) {
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  }

  const countries = cities.reduce((accumArray, curCity) => {
    if (
      !accumArray.map((itm) => itm.countryCode).includes(curCity.countryCode)
    ) {
      return [
        ...accumArray,
        {
          countryCode: curCity.countryCode,
          countryName: curCity.countryName,
          emoji: curCity.emoji,
          cityId: curCity.id,
          Flag: Flags[curCity.countryCode?.toUpperCase()],
        },
      ];
    } else {
      return accumArray;
    }
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.cityId} />
      ))}
    </ul>
  );
}

export default CountryList;

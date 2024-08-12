import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message";
import { useCities } from "../context/CititesContext";
import Flags from "country-flag-icons/react/3x2";

function CityList() {
  const { cities, isLoading } = useCities();

  if (isLoading) {
    return <Spinner />;
  }

  if (!cities.length) {
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  }

  return (
    <>
      <ul className={styles.cityList}>
        {cities.map((city) => (
          <CityItem
            city={city}
            key={city.id}
            Flag={Flags[city.countryCode?.toUpperCase()]}
          />
        ))}
      </ul>
    </>
  );
}

export default CityList;

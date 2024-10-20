import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUrlPosition } from "../hooks/useUrlPosition";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useCities } from "../context/CititesContext";

import Button from "./Button";
import Message from "./Message";
import Spinner from "./Spinner";

import styles from "./Form.module.css";
import { AppContext } from "../context/AppContext";
import Flags from "country-flag-icons/react/3x2";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const API_KEY = import.meta.env.VITE_LOCATIONQ_API_KEY;

// const BASE_URL_OLD = "https://api.bigdatacloud.net/data/reverse-geocode-client";
const BASE_URL = `https://us1.locationiq.com/v1/reverse?key=${API_KEY}&format=json&normalizeaddress=1&extratags=1`;

function Form() {
  const navigate = useNavigate();
  const [lat, lng] = useUrlPosition();
  const { createCity, isLoading } = useCities();

  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [cityName, setCityName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [gecodingError, setGecodingError] = useState("");
  const { isCollapsed } = useContext(AppContext);

  const Flag = Flags[countryCode?.toUpperCase()];

  useEffect(
    function () {
      if (!lat && !lng) return;

      async function fetchCityData() {
        try {
          setGecodingError("");
          setIsLoadingGeocoding(true);
          const res = await fetch(`${BASE_URL}&lat=${lat}&lon=${lng}`);
          const data = await res.json();

          if (!data?.address?.country_code) {
            throw new Error(
              "That doesn't seems to be a city. Click on somewhere else! 🥸"
            );
          }

          setCityName(data.address?.city);
          setCountryCode(data.address?.country_code);
          setCountryName(data.address?.country);
          setEmoji(convertToEmoji(data.address?.country_code));
          setGecodingError("");
        } catch (err) {
          setGecodingError(err.message);
        } finally {
          setIsLoadingGeocoding(false);
        }
      }
      fetchCityData();
    },
    [lat, lng]
  );

  async function handleSubmit(e) {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity = {
      cityName,
      countryName,
      countryCode,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };

    await createCity(newCity);
    navigate("/app/citiies");
  }

  if (isLoadingGeocoding) {
    return <Spinner />;
  }

  if (!lat && !lng) {
    return <Message message="Start by clicking somewhere on the map" />;
  }

  if (gecodingError) {
    return <Message message={gecodingError} />;
  }

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""} ${
        isCollapsed ? styles.formCollapsed : ""
      }`}
      onSubmit={handleSubmit}
    >
      <div
        className={`${styles.row} ${isCollapsed ? styles.rowCollapsed : ""}`}
      >
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span
          className={`${styles.flag} ${
            isCollapsed ? styles.flagCollapsed : ""
          }`}
        >
          {Flag && (
            <Flag
              style={{
                height: isCollapsed ? "18px" : "24px",
                borderRadius: "4px",
              }}
            />
          )}
        </span>
      </div>

      <div
        className={`${styles.row} ${isCollapsed ? styles.rowCollapsed : ""}`}
      >
        <label htmlFor="date">
          {!isCollapsed ? `When did you go to ${cityName}?` : "Visit Date"}{" "}
        </label>
        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div
        className={`${styles.row} ${isCollapsed ? styles.rowCollapsed : ""}`}
      >
        <label htmlFor="notes">
          {!isCollapsed ? `Notes about your trip to ${cityName}` : "Your notes"}
        </label>
        <textarea
          id="notes"
          className={`${styles.textArea} ${
            isCollapsed ? styles.textAreaCollapsed : ""
          }`}
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div
        className={`${styles.buttons} ${
          isCollapsed ? styles.buttonsCollapsed : ""
        }`}
      >
        <Button type="primary">Add</Button>
        <Button
          type="back"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;

import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCities } from "../context/CititesContext";
import { useContext, useEffect } from "react";
import Flags from "country-flag-icons/react/3x2";

import Button from "../components/Button";

import styles from "./City.module.css";
import Spinner from "./Spinner";
import { AppContext } from "../context/AppContext";
import { Calendar, ChevronLeft, ExternalLink, StickyNote } from "lucide-react";

const formatDate = (date, isShortFormat = false) => {
  if (isShortFormat) {
    return new Intl.DateTimeFormat("en", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    }).format(new Date(date));
  } else {
    return new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    }).format(new Date(date));
  }
};

function City() {
  const { id } = useParams();
  const { getCity, currentCity, isLoading } = useCities();
  const navigate = useNavigate();
  const { isCollapsed } = useContext(AppContext);

  useEffect(
    function () {
      getCity(id);
    },
    [id, getCity]
  );

  const { cityName, countryCode, date, notes } = currentCity;
  const Flag = Flags[countryCode?.toUpperCase()];

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div
      className={`${styles.city} ${isCollapsed ? styles.cityCollapsed : ""}`}
    >
      <div
        className={`${styles.row} ${isCollapsed ? styles.rowCollapsed : ""}`}
      >
        {!isCollapsed && <h6>City name</h6>}
        <h3>
          <span>
            {Flag && <Flag style={{ height: "24px", borderRadius: "4px" }} />}
          </span>{" "}
          {cityName}
        </h3>
      </div>

      <div
        className={`${styles.row} ${isCollapsed ? styles.rowCollapsed : ""}`}
      >
        {!isCollapsed ? (
          <h6>You went to {cityName} on</h6>
        ) : (
          <h6>
            <Calendar size={20} /> Visited Date{" "}
          </h6>
        )}
        <p>{formatDate(date || null, isCollapsed)}</p>
      </div>

      {notes && (
        <div
          className={`${styles.row} ${isCollapsed ? styles.rowCollapsed : ""}`}
        >
          {!isCollapsed ? (
            <h6>Your notes</h6>
          ) : (
            <h6>
              <StickyNote size={20} /> Notes{" "}
            </h6>
          )}
          <p>{notes}</p>
        </div>
      )}

      {!isCollapsed ? (
        <div className={styles.row}>
          <h6>Learn more</h6>
          <a
            href={`https://en.wikipedia.org/wiki/${cityName}`}
            target="_blank"
            rel="noreferrer"
          >
            Check out {cityName} on Wikipedia &rarr;
          </a>
        </div>
      ) : (
        <div className={styles.rowCollapsed}>
          <a
            href={`https://en.wikipedia.org/wiki/${cityName}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.anchorLink}
          >
            <span>More</span>
            <ExternalLink className={styles.externalLinkIcon} />
          </a>
        </div>
      )}

      {!isCollapsed ? (
        <div>
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
      ) : (
        <>
          <button
            className={styles.fullWidthButton}
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            <ChevronLeft className={styles.buttonIcon} />
            <span className={styles.buttonText}>BACK</span>
          </button>
        </>
      )}
    </div>
  );
}

export default City;

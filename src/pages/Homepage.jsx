import { Link } from "react-router-dom";
import styles from "./Homepage.module.css";
import PageNav from "../components/PageNav";

export default function Homepage() {
  return (
    <main className={styles.homepage}>
      <PageNav />
      <section>
        <span className={styles.line}>
          <h1 className={styles.primaryH1}>You</h1>
          <h2> create memories.</h2>
        </span>
        <span className={styles.line}>
          <h1 className={styles.secondaryH1}>Voyagia</h1>
          <h2> will keep them safe.</h2>
        </span>

        <h2>
          Discover the world with Voyagia. Pinpoint every city you've explored
          on a dynamic world map, capturing your unique journey one step at a
          time. Relive your adventures through vivid memories and share your
          global footprint with friends, showcasing how you've wandered and
          experienced the wonders of the world.
        </h2>
        <Link to="/login" className="cta">
          Start Mapping Your Memories
        </Link>
      </section>
    </main>
  );
}

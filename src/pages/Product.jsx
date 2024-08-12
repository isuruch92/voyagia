import styles from "./Product.module.css";
import PageNav from "../components/PageNav";

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />
      <section>
        <img
          src="img-1.jpg"
          alt="person with dog overlooking mountain with sunset"
        />
        <div>
          <h2>About Voyagia.</h2>
          <p>
            Voyagia is the perfect travel companion for adventurers who love to
            capture and cherish their journey. Our platform allows you to easily
            map every city you've explored, creating a visual record of your
            travels that is both organized and personal.
          </p>
          <p>
            With Voyagia, each location on your map is enriched with memories,
            photos, and stories, giving you a vibrant way to relive your
            adventures. It's more than just a diary—it's a dynamic storytelling
            tool that keeps your travel experiences alive.
          </p>
          <p>
            Share your global travels with friends and connect with other
            explorers. Voyagia makes it easy to showcase your unique journey and
            inspire others with your adventures.
          </p>
        </div>
      </section>
    </main>
  );
}

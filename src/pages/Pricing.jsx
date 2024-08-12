import styles from "./Product.module.css";
import PageNav from "../components/PageNav";

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />
      <section>
        <div>
          <h2>
            One Price, Full Access.
            <br />
            Just $9/month.
          </h2>
          <p>
            With Voyagia, you get unlimited access to all features for a single,
            straightforward price. No hidden fees, no complicated tiers—just
            everything you need to document, map, and relive your adventures.
          </p>
        </div>
        <img src="img-2.jpg" alt="overview of a large city with skyscrapers" />
      </section>
    </main>
  );
}

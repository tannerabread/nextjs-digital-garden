import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <div>
          <Image
            className={styles.logo}
            src="/logo.svg"
            alt="bannon.cloud Logo"
            width={720}
            height={148}
            priority
          />
          <div className={styles.description}>
            <a
              href="https://github.com/tannerabread/nextjs-digital-garden"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{" "}
              <Image
                src="/tannerabread-logo.svg"
                alt="tannerabread Logo"
                className={styles.vercelLogo}
                width={200}
                height={48}
                priority
              />
            </a>
          </div>
        </div>
      </div>

      <div className={styles.grid}>
        <a
          href="/blog"
          className={styles.card}
          rel="noopener noreferrer"
        >
          <h2>
            Blog <span>-&gt;</span>
          </h2>
          <p>
            Where I write about the creation of this site and other projects.
          </p>
        </a>

        <a
          href="/resume"
          className={styles.card}
          rel="noopener noreferrer"
        >
          <h2>
            Resume <span>-&gt;</span>
          </h2>
          <p>Learn about my professional history as a software engineer!</p>
        </a>

        <a
          href="/portfolio"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Portfolio <span>-&gt;</span>
          </h2>
          <p>Explore my recent and showcased projects.</p>
        </a>

        <a
          href="https://www.linkedin.com/in/bannon-tanner/"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            LinkedIn <span>-&gt;</span>
          </h2>
          <p>
            Check out my LinkedIn where you can contact me and get more details about my history.
          </p>
        </a>
      </div>
    </main>
  );
}

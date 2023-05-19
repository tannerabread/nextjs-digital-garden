import Link from "next/link";
import styles from './navigation.module.css';
import LoginBtn from "./login-btn";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div>
        <Link href="/">Home</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/resume">Resume</Link>
        <Link href="/portfolio">Portfolio</Link>
      </div>
      <div>
        <LoginBtn />
      </div>
    </nav>
  );
}

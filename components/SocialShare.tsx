"use client";

import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  RedditShareButton,
} from "react-share";
import {
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  RedditIcon,
} from "react-share";
import { FacebookShareCount, RedditShareCount } from "react-share";

import styles from "./socialshare.module.css";

export function SocialShare({ url, title }: { url: string; title: string }) {
  return (
    <div className={styles.socialShare}>
      <div className={styles.network}>
        <FacebookShareButton
          url={url}
          quote={title}
          className={styles.networkShareButton}
        >
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <div>
          <FacebookShareCount url={url} />
        </div>
      </div>
      <div className={styles.network}>
        <TwitterShareButton
          url={url}
          title={title}
          className={styles.networkShareButton}
        >
          <TwitterIcon size={32} round />
        </TwitterShareButton>
      </div>
      <div className={styles.network}>
        <LinkedinShareButton
          url={url}
          title={title}
          className={styles.networkShareButton}
        >
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
      </div>
      <div className={styles.network}>
        <RedditShareButton
          url={url}
          title={title}
          className={styles.networkShareButton}
        >
          <RedditIcon size={32} round />
        </RedditShareButton>
        <div>
          <RedditShareCount url={url} className={styles.networkShareCount} />
        </div>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
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
      <div className={styles.group}>
        <div className={styles.network}>
          <FacebookShareButton
            url={url}
            quote={title}
            className={styles.networkShareButton}
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <div>
            <FacebookShareCount
              url={url}
              className={styles.networkShareCount}
            />
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
      <div className={styles.group}>
        <div className={styles.network}>
          <a href="https://www.buymeacoffee.com/bannon">
            <Image
              src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=bannon&button_colour=40DCA5&font_colour=ffffff&font_family=Cookie&outline_colour=000000&coffee_colour=FFDD00"
              alt="buy me a coffee button"
              width="150"
              height="32"
            />
          </a>
        </div>
        <div className={styles.network}>
          <a
            aria-label="Sponsor @tannerabread"
            data-hydro-click='{"event_type":"sponsors.button_click","payload":{"button":"REPOSITORY_HEADER_SPONSOR","sponsorable_login":"tannerabread","originating_url":"https://github.com/tannerabread/nextjs-digital-garden/sponsor_button","user_id":30082936}}'
            data-hydro-click-hmac="413dcfbf1c5cd03fd9522237c639de5f47d1df0bdc0a7931947ea550f36fd231"
            href="https://github.com/sponsors/tannerabread"
            data-view-component="true"
            className={`${styles.btn} ${styles["btn-sm"]}`}
          >
            <svg
              aria-hidden="true"
              height="16"
              viewBox="0 0 16 16"
              version="1.1"
              width="16"
              data-view-component="true"
              className={`${styles.octicon} ${styles["octicon-heart"]} ${styles["icon-sponsor"]} ${styles["mr-1"]} ${styles["v-align-middle"]} ${styles["color-fg-sponsors"]}`}
            >
              <path d="m8 14.25.345.666a.75.75 0 0 1-.69 0l-.008-.004-.018-.01a7.152 7.152 0 0 1-.31-.17 22.055 22.055 0 0 1-3.434-2.414C2.045 10.731 0 8.35 0 5.5 0 2.836 2.086 1 4.25 1 5.797 1 7.153 1.802 8 3.02 8.847 1.802 10.203 1 11.75 1 13.914 1 16 2.836 16 5.5c0 2.85-2.045 5.231-3.885 6.818a22.066 22.066 0 0 1-3.744 2.584l-.018.01-.006.003h-.002ZM4.25 2.5c-1.336 0-2.75 1.164-2.75 3 0 2.15 1.58 4.144 3.365 5.682A20.58 20.58 0 0 0 8 13.393a20.58 20.58 0 0 0 3.135-2.211C12.92 9.644 14.5 7.65 14.5 5.5c0-1.836-1.414-3-2.75-3-1.373 0-2.609.986-3.029 2.456a.749.749 0 0 1-1.442 0C6.859 3.486 5.623 2.5 4.25 2.5Z"></path>
            </svg>
            <span className={styles["v-align-middle"]}>Sponsor</span>
          </a>
        </div>
      </div>
    </div>
  );
}

---
title: Create a Fully Functional Next.js Digital Garden - Part 4 - NavBar
date: 2023-05-09T13:30:00-05:00
author: Bannon Tanner
---

## Introduction

In this part of the project, a navigation bar will be added to enhance user experience. Next.js makes this process efficient and fast, as the `<Link>` component [prefetches](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#prefetching) routes associated with links in the viewport, allowing for almost instantaneous page navigation.

The navigation bar will features links to `home`, `blog`, `resume`, and `portfolio`. Additionally, the [layouts functionality](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#layouts) provided by the Next.js app router will be utilized to distribute the navbar across all pages within the app folder, excluding the home page.

## Create the Resume and Portfolio Stubs

To implement a functional navigation bar, valid destinations for each linnk must exist. Begin by adding two files, `app/resume/page.tsx` and `app/portfolio/page.tsx`. Later in the project, the resume page will be updated to display information about the writer and allow a PDF download of the contents.

```bash
mkdir app/resume
mkdir app/portfolio
touch app/resume/page.tsx
touch app/portfolio/page.tsx
```

```ts
// app/resume/page.tsx

export default function Resume() {
  return (
    <div>
      <h1>Resume</h1>
      <p>This is the Resume page.</p>
    </div>
  )
}
```

```ts
// app/portfolio/page.tsx

export default function Portfolio() {
  return (
    <div>
      <h1>Portfolio</h1>
      <p>This is the Portfolio page.</p>
    </div>
  )
}
```

## Create the Navbar

Next, create a folder for components and the Navbar component itself.

```bash
mkdir components
touch components/Navbar.tsx
```

Modify the `Navbar` component file to contain the four links we want to display on all pages.

```tsx
// components/Navbar.tsx

import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <div>
        <Link href="/">Home</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/resume">Resume</Link>
        <Link href="/portfolio">Portfolio</Link>
      </div>
    </nav>
  );
}
```

## Implement Layout

Next.js provides a default layout file with the app router that can be modified to incorporate the navbar into every page. Open `app/layout.tsx`, import the Navbar component, and include the Navbar in the body of the layout.

```tsx
// app/layout.tsx

import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Next.js Digital Garden",
  description: "Digital Garden built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <div>{children}</div>
      </body>
    </html>
  );
}
```

## Style the Navbar

The current appearance of the Navbar is quite plain. To enhance its visual appeal, create a CSS module `navigation.module.css` and add the necessary classes to the code.

```bash
touch components/navigation.module.css
```

utilize the chrome devtools to use the eye dropper to find colors from the code theme

```css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #282a36;
}

.navbar a {
  color: #95deee;
  text-decoration: none;
  margin-right: 1rem;
}

.navbar a:hover {
  color: #f286c4;
  font-weight: bold;
}
```

Add the `.navbar` class to the `<nav>` element in the component to apply the styling.

```tsx
// components/Navbar.tsx

// ...
return (
  <nav className={styles.navbar}>
```


## Conclusion

The implementation of a navigation bar in the Next.js Digital Garden project greatly improves user experience. This post covered the creation of resume and portfolio page stubs, the Navbar component, and the incorporation of the navigation bar into the layout. Additionally, the styling of the Navbar was addressed for a visually appealing design.

Feel free to explore the [current state of the project](https://bannon.cloud/blog) and the [repository](https://github.com/tannerabread/nextjs-digital-garden).

---
title: Create a Fully Functional Next.js Digital Garden - Part 1 - Initial Project Setup
date: 2023-05-05T12:30:00-05:00
author: Bannon Tanner
---

## Introduction

In this series we will systematically build a digital garden application using [Next.js](https://nextjs.org/). Our aim is to leverage Next.js and React features in realistic, practical scenarios.

The application will incorporate the following:
- Blog posts with Markdown and MDX support
- Navigation Bar
- Layout and Styling
- Dark Mode
- Responsive Design
- Lazy Loading
- Authentication with Social Providers
- ISR, SSR, SSG
- Draft Mode
- Pagination
- Search
- Cloud Services
- Comments
- Subscriptions
- Resume Page with pdf download
- Portfolio/Projects Page
- Webhooks/Websockets/Webmentions
- Many more!

Let's begin with the initial setup.

## Creating the Initial Application

### Install Node.js and NPM

To start, ensure Node.js and npm are installed on your computer. Verify by running the following commands:

```shell
node -v
# node version number

npm -v
# npm version number
```

If they are not installed, download the latest version from the [Node.js website](https://nodejs.org/en).

### Create a New Next.js App

With Node.js installed, choose a directory to create your project in and use the built-in package runner, [Node Package Execute (NPX)](https://docs.npmjs.com/cli/v7/commands/npx), to run the `create-next-app` package without installing it locally:

```shell
npx create-next-app digital-garden
```

You will be prompted with project options. For this tutorial, select the following:

```shell
✔ Would you like to use TypeScript with this project? … Yes
✔ Would you like to use ESLint with this project? … Yes
✔ Would you like to use Tailwind CSS with this project? … No
✔ Would you like to use `src/` directory with this project? … No
✔ Use App Router (recommended)? … Yes
✔ What import alias would you like configured? … @/*
```

Once the setup is complete, navigate to the new directory and open the application in your favorite editor. For example, use [Visual Studio Code](https://code.visualstudio.com/) to open the editor directly from the terminal:

```shell
cd digital-garden
code .
```

### Creating a Repository and Pushing the Initial Project

Create a new GitHub repository and push the initial project. By default, Next.js initializes projects as git 
repositories with the default branch named 'main'. Consequently, an initial commit should already be present.

```shell
git remote add origin git@github.com:<username>/nextjs-digital-garden.git
git push -u origin main
```

### Deploying to Vercel

To make continuous updates to production, deploy this project to Vercel and connect the GitHub repository. You can do this by either navigating to your Vercel dashboard and adding a new project or by using the Vercel CLI. This tutorial will use the CLI.

Click [here](https://vercel.com/signup) to sign up for a Vercel account. Choose the Hobby option and sign up with your GitHub account.

Install the Vercel CLI and log in to your account.

```shell
npm install -g vercel
vercel login
```

Select `Continue with GitHub`, and the browser will automatically connect your account to the CLI. Now, deploy the project.

```shell
vercel
```

The Vercel CLI is designed to automatically detect optimal settings for most Next.js apps, allowing you to accept the default configurations presented in the command prompt. 

Upon completing the configuration, your app will be deployed to Vercel. The CLI provides the deployment URL, which can be copied and opened in your browser to view the live application.

Alternatively you can visit [your dashboard](https://vercel.com/dashboard) and select the `digital-garden` application to see it deployed on a live server! 

As we utilized the CLI for deploying our application, the connecction to the GitHub repository has not yet been established. Fortunately, the Vercel CLI offers a convenient command to link the two.

```shell
vercel git connect
```

This command identifies the local `.git` configuration containing at least one remote URL and subsequently connects the deployment to the associated GitHub repository. This streamlined process ensures seamless integration between the two platforms.

## Conclusion

Throughout this setup guide, we established the foundation for our project by creating the initial application, connecting it to a GitHub repository, and deploying the application to Vercel. In the upcoming post, we will implement pages to showcase blog posts and incorporate a utility to convert markdown content into HTML.
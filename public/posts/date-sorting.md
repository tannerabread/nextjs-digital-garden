---
title: Create a Fully Functional Next.js Digital Garden - Part 5 - Date Sorting
date: 2023-05-09T14:36:00-05:00
author: Bannon Tanner
---

## Introduction

An issue was discovered after the last post, when two posts were published on the same day. The date sorting did not function properly, as the system could not accurately parse the time for posts published on the same day.

## The Fix

To resolve this issue, the time must be added to the string in the front-matter. Additionally, the posts utility function should be updated to return only the desired string. This approach is more efficient than formatting the string in the pages. 

All the correctly formatted times should be added in the format `YYYY-MM-DDTHH:mm:ss-Z`, where Z represents the timezone. The sorting functionality will continue to function correctly, but the date must now be mapped to a more human-friendly string.

Modify the return on the `getSortedPostsData` function as follows:

```ts
// lib/posts.ts

// ...
// sort posts by date
return allPostsData
  .sort((a: PostData, b: PostData) => {
    return a.date < b.date ? 1 : -1;
  })
  .map((post: PostData) => {
    const convertedDate: string = new Date(post.date).toLocaleString();
    return {
      ...post,
      date: convertedDate,
    };
  });
```


## Conclusion

Although adding the dates remains a manual process, the application will be enhanced to address this issue in future updates.

Explore the [current state of the project](https://bannon.cloud/blog) and the [repository](https://github.com/tannerabread/nextjs-digital-garden).

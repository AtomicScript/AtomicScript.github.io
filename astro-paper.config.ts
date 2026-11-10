import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://AtomicScript.github.io",
    title: "AtomicScript",
    description: "A blog about cybersecurity, technology, hardware hacking",
    author: "Atom",
    profile: "https://github.com/AtomicScript",
    ogImage: "default-og.jpg",
    lang: "en",
    timezone: "Asia/Bangkok",
    dir: "ltr",
  },
  posts: {
    perPage: 4,
    perIndex: 4,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    showArchives: true,
    showBackButton: true,
    editPost: {
      enabled: true,
      url: "https://github.com/AtomicScript/astro-paper/edit/main/",
    },
    search: "pagefind",
    toc: true,
  },
  socials: [
    { name: "github",   url: "https://github.com/AtomicScript" },
    { name: "x",        url: "https://x.com/Fra9m3nt" },
    { name: "linkedin", url: "https://www.linkedin.com/in/kalthambinhashim/" },
    { name: "mail",     url: "mailto:atomicscript@proton.me" },
  ],
});
# cv — Vladislav Podymskiy

Personal CV website (Spanish / English), built with React and Tailwind and deployed on Vercel.

- **Sections:** about me, resume, projects, contact form.
- **Contact form** sends messages through my own REST API: [cv-backend](https://github.com/vpodymskiy/cv-backend) (Java 25, Spring Boot 4, Docker, Render).
- **Translations** live in `public/locales/{es,en}/translation.json`; the downloadable CVs are in `public/files/`.

## Run locally

```bash
npm install
npm start          # http://localhost:3000
npm run build      # production build
```

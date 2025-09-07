# 📰 News Service

Учебный проект (Node.js + TypeScript + PostgreSQL + React).

## 🚀 CI/CD

- **CI (Continuous Integration)**:  
  Настроен через **GitHub Actions**.  
  При каждом пуше или pull request в `main` запускаются:
  - установка зависимостей  
  - билд TypeScript  
  - проверка кода линтером (ESLint)  

  👉 [Посмотреть CI workflow](./.github/workflows/ci.yml)

- **CD (Continuous Deployment)**:  
  Фронтенд автоматически деплоится на **Netlify** при изменениях в `main`.  

  🌍 Production: [Открыть сайт](https://bejeweled-cendol-16b08f.netlify.app/)  

## 🛠️ Технологии
- Backend: Node.js, Express, TypeScript, TypeORM
- Frontend: React + TypeScript
- DB: PostgreSQL (ElephantSQL)
- CI: GitHub Actions
- CD: Netlify

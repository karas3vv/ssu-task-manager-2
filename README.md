# TaskFlow

TaskFlow — учебный task-manager проект, разработанный на Next.js, TypeScript, React, MobX и axios. Приложение демонстрирует публичные SSR-страницы, защищенную dashboard-зону, клиентское управление состоянием, типизированные API routes, i18n, базовые metadata-настройки и переключение темы.

## Стек

- Next.js App Router
- TypeScript
- React
- MobX / mobx-react-lite
- axios
- next-intl
- CSS в глобальных стилях layout

## Возможности

- Публичная landing page
- Страницы входа и регистрации
- Защищенная dashboard-зона через middleware
- Редактирование личного профиля
- Создание, редактирование и обновление статусов задач
- Календарь с дедлайнами задач
- Список проектов
- Управление командой для роли owner
- Страница аналитики
- Страница настроек с переключением темы
- Структура локалей RU/EN
- Переключатель языка RU/EN
- Metadata для страниц
- Mock API routes для имитации backend-поведения

## Архитектура

Проект использует упрощенную frontend-структуру с учетом Next.js App Router:

```text
src/app/       маршруты Next.js, layouts, API routes
src/feature/   пользовательские фичи, логика и компоненты
src/widgets/   крупные блоки страниц и app wrappers
src/share/     API-клиент, конфиги, stores, типы, модели, i18n, UI-утилиты
```

Алиасы путей настроены в `tsconfig.json`:

```text
@app/*
@feature/*
@share/*
@widgets/*
```

## Страницы

Публичные страницы:

```text
/ru
/en
/ru/auth/login
/ru/auth/register
```

Защищенные dashboard-страницы:

```text
/ru/dashboard
/ru/dashboard/tasks
/ru/dashboard/projects
/ru/dashboard/calendar
/ru/dashboard/analytics
/ru/dashboard/team
/ru/dashboard/settings
```

Dashboard-страницы находятся внутри route group `(dashboard)` и используют общий dashboard layout.

## Демо-авторизация

Форма входа уже содержит демо-данные:

```text
email: demo@taskflow.local
password: password
```

Демо-пользователь имеет роль `owner`, поэтому на странице команды доступно управление участниками.

## API Routes

Проект использует типизированные Next.js API routes как mock backend:

```text
POST   /api/auth/login
POST   /api/auth/register
POST   /api/auth/logout

GET    /api/profile
PATCH  /api/profile

GET    /api/tasks
POST   /api/tasks
PUT    /api/tasks/[id]
PATCH  /api/tasks/[id]
DELETE /api/tasks/[id]

GET    /api/projects
POST   /api/projects
PUT    /api/projects/[id]
PATCH  /api/projects/[id]
DELETE /api/projects/[id]

GET    /api/team
POST   /api/team
PATCH  /api/team/[id]
DELETE /api/team/[id]

GET    /api/stats
```

Все клиентские API-запросы выполняются через типизированный axios-клиент в `src/share/api`.

## State

В приложении используется MobX root store:

```text
RootStore
AuthStore
TaskStore
ProjectStore
DashboardStore
TeamStore
ThemeStore
```

`RootStore` собирает все хранилища и передается в приложение через `StoreProvider`.

## SEO

Реализован базовый helper для metadata:

- Metadata для страниц через `generateMetadata`
- Icon routes

## i18n

Проект использует `[locale]` routing и `next-intl`.

Поддерживаемые локали:

```text
ru
en
```

Основные файлы:

```text
src/share/i18n/messages.ts
src/share/i18n/request.ts
src/middleware.ts
src/share/config/i18n.ts
```

## Маршрутизация и 404

Основные пользовательские маршруты работают внутри локалей `/ru` и `/en`. Middleware добавляет локаль по умолчанию для путей без префикса, например `/dashboard` перенаправляется в `/ru/dashboard`.

Для неизвестных страниц настроены кастомные 404:

```text
src/app/global-not-found.tsx      глобальная 404-страница вместо дефолтной страницы Next.js
src/app/[locale]/not-found.tsx    404 внутри локализованного приложения
```

Кнопка на 404-страницах возвращает пользователя назад через историю браузера. Если предыдущей страницы нет, используется fallback-переход в dashboard.

## Тема

Тема определяется по настройкам браузера пользователя и может быть изменена вручную на странице настроек.

## Запуск проекта

Установить зависимости:

```bash
npm install
```

Запустить dev-сервер:

```bash
npm run dev
```

Открыть:

```text
http://localhost:3000/ru
```

Собрать production-версию:

```bash
npm run build
```

Запустить production-сервер:

```bash
npm run start
```

Проверить типы:

```bash
npm run test
```

## Примечания

Backend реализован через in-memory mock API routes. Данные, созданные во время работы приложения, доступны пока запущен Next.js сервер. После полного перезапуска сервера mock-данные возвращаются к начальному состоянию.

## Доступные команды

```bash
npm run dev     # запуск development-сервера
npm run build   # сборка production-версии
npm run start   # запуск production-сервера после build
npm run test    # проверка TypeScript
```

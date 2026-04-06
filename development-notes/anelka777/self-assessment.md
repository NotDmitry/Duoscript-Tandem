# Self-Assessment

## Personal Features

| Категория            | Фича                                                                           | Баллы   |
| -------------------- | ------------------------------------------------------------------------------ | ------- |
| **My Components**    | **Complex Component:** Meaning Matcher Widget                                  | +25     |
|                      | **Rich UI Screen:** Dashboard Page                                             | +20     |
| **UI & Interaction** | **Drag & Drop:** Реализация перетаскивания через @dnd-kit/core                 | +10     |
|                      | **Accessibility (a11y):** aria-labels, Audit pass (Lighthouse 100/100)         | +10     |
|                      | **Responsive:** Адаптация верстки под мобильные устройства (от 320px)          | +5      |
| **Quality**          | **Unit Tests (Basic):** Покрытие тестами 20%+ личного кода                     | +10     |
| **Architecture**     | **Design Patterns:** Custom Hook, Container/Presentational, Compound Component | +10     |
|                      | **API Layer:** Выделение слоя работы с API (изоляция от UI компонентов)        | +10     |
| **Frameworks**       | **React:** Использование библиотеки React                                      | +5      |
| **Итого**            |                                                                                | **105** |

---

## 2. Описание проделанной работы

**Tech Stack:**

React 19 + TypeScript — основа приложения, компонентная архитектура и хуки  
Vite — сборка и dev environment  
MUI + Emotion — UI библиотека и стилизация интерфейса  
React Router — навигация и маршрутизация приложения  
Firebase — работа с данными (Firestore integration)  
Vitest + Testing Library — unit testing hooks и компонентов  
dnd-kit — drag & drop взаимодействие в игровом виджете

---

### Структура проекта

Разработала feature-based структуру папок для проекта — отправная точка для всей команды:

- `src/api/` — слой работы с API (изолирован от UI)
- `src/components/` — переиспользуемые UI компоненты
- `src/features/` — фичи по доменам (Dashboard, MeaningMatcher)
- `src/layouts/` — layout компоненты (Header, Footer)
- `src/pages/` — страницы приложения
- `src/shared/` — общие хуки, модели, утилиты, контексты
- `src/styles/` — глобальные стили и темы

В дальнейшем структура эволюционировала вместе с развитием проекта,
однако ключевые архитектурные принципы были заложены мной.

---

### Dashboard Page

Взяла на себя ответственность за дизайн (Figma) и логику Dashboard. Продумала, какие данные пользователь должен видеть на этой странице,  
определила требования к данным и структуру отображаемой статистики.
Синхронизировалась с коллегой по формату данных, чтобы обеспечить согласованность между фронтендом и будущей бэкенд-логикой.

**Компоненты:**

- `ProgressCard` — прогресс бар пользователя
- `StatsGrid` + `StatCard` — статистика дня (минуты, активности, streak)
- `RecentActivity` — история активностей с пагинацией
- `useDashboard` — хук для загрузки данных dashboard
- `useActivityHistory` — хук для истории активностей с пагинацией

**Реализовано:**

- Loading state — CircularProgress спиннер
- Error handling — сообщение об ошибке при неудачном запросе
- State management через кастомные hooks (useState / async logic abstraction)
- Кнопка "Start Practice" — переход в Library для новой практики
- Responsive верстка от 320px (MUI breakpoints)
- Accessibility: aria-labels на все компоненты, семантическая разметка, Lighthouse 100/100 (mobile), 96/100 (desktop)

---

### Meaning Matcher Widget

Интерактивный виджет для изучения терминов через drag-and-drop сопоставление. Разработала UI и реализовала компонент.

**Компоненты:**

- `MeaningMatcher` — главный компонент, управляет состоянием загрузки
- `LevelGame` — игровой экран с тремя уровнями сложности
- `ProgressBar` — визуальный прогресс по уровням
- `Card` — перетаскиваемая карточка с ответом
- `Drop` — зона для сброса карточки
- `OptionsZone` — зона с доступными вариантами
- `ResultBlock` — блок результата после проверки

**Реализовано:**

- Drag & Drop через `@dnd-kit/core` (MouseSensor + TouchSensor для мобильных)
- Три уровня сложности: Basics → Intermediate → Advanced
- State management через кастомные хуки и локальное состояние компонентов
- Построение пошагового UX flow (level progression → check → submit → results)
- Логика проверки ответов и подсчёта результата
- Подсветка правильных (зелёный) и неправильных (красный) ответов
- Loading state и Error handling
- Кнопки Check (проверить) и Submit (отправить результат)
- Responsive верстка от 320px (MUI breakpoints)
- Accessibility: aria-labels, roles, aria-live на ResultBlock, Lighthouse 100/100

---

### Unit Tests

Написала unit тесты для своих компонентов и хуков:

| Файл                         | Тестов | Что проверяет                    |
| ---------------------------- | ------ | -------------------------------- |
| `useActivityHistory.test.ts` | 4      | loading, data, error, вызов API  |
| `useDashboard.test.ts`       | 5      | loading, data, error, пустой uid |
| `StatCard.test.tsx`          | 4      | рендер title и value             |
| `StatsGrid.test.tsx`         | 5      | рендер всех карточек и значений  |

Покрытие: ~22% личного кода (149/659 строк)

---

### Design Patterns

**Custom Hook Pattern**
— `useDashboard`, `useActivityHistory`, `useMeaningMatcher`
— Логика fetch, loading, error вынесена из компонентов в хуки. Компоненты отвечают только за UI, без бизнес-логики.

**Container/Presentational Pattern**
— `Dashboard` (container) — управляет данными и состоянием
— `StatsGrid`, `StatCard`, `RecentActivity`, `ProgressCard` (presentational) — получают props и рендерят UI

**Compound Component Pattern**
— `MeaningMatcher` + `LevelGame` — родительский компонент управляет уровнями и состоянием, дочерний отвечает за игровой процесс

**API Layer Pattern**
— Все запросы к Firebase изолированы в `src/api/dashboard.api.ts`
— Компоненты и хуки не взаимодействуют напрямую от Firebase — взаимодействие происходит через API слой.

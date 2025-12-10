
## 🧾 Project Overview

```md
## Overview

This is a full-stack **Dynamic Contract Explorer**.

- Pages are stored in the database (MongoDB).
- Each Page has its own filter configuration (e.g. `contractType`, `status`, etc.).
- The frontend sidebar is generated from the Pages collection.
- When you click a Page, the contracts list is automatically filtered based on that page’s config.
- New pages can be added from the backend **without writing new frontend code**.
```

---

## 🧰 Tech Stack

```md
## Tech Stack

**Backend**
- Node.js
- Express
- MongoDB (Mongoose)

**Frontend**
- React
- TypeScript
- Vite
- Tailwind CSS
- TanStack React Query
- React Router
```

---

## ⚙️ Project Setup

````md
## Project Setup

### 1. Clone / Download

```bash
git clone <your-repo-url>
cd contract-explorer
````

### 2. Backend Setup

```bash
cd backend
npm install
```

* Configure MongoDB connection inside `index.js` (currently uses `mongodb://localhost:27017/contractDB`).
* Start the backend:

```bash
node index.js
```

Backend will run on: `http://localhost:5000`

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

Frontend will run on: `http://localhost:5173`

````

---

## 🧱 Database Models (Process Explanation)

```md
## Database Design

### Pages Collection

Each Page document defines:
- `title`: Display name in sidebar
- `url`: Used for routing (e.g. `/pages/sow-contracts`)
- `rank`: Sort order in sidebar
- `parent`: For nesting (currently not deeply used)
- `filters`: Object that defines default filters for that page

Example:

```json
{
  "title": "SOW Contracts",
  "url": "sow-contracts",
  "rank": 1,
  "parent": null,
  "filters": {
    "contractType": ["SOW"],
    "status": ["Processed"]
  }
}
````

### Contracts Collection

Each Contract document contains:

* `name`
* `contractType`
* `amount`
* `description`
* `status`

Example:

```json
{
  "name": "TriHexaGlobal Solutions SOW",
  "contractType": "SOW",
  "amount": 25000,
  "description": "Statement of Work for IT Services",
  "status": "Processed"
}
```

````

---

## 🔌 API Design + Dynamic Filter Logic

```md
## Backend API Design

### Pages APIs

- `POST /api/pages` – Create a new page
- `GET /api/pages` – Get all pages
- `GET /api/pages?url=<url>` – Get page by url
- `GET /api/pages/:id` – Get page by id
- `PUT /api/pages/:id` – Update page
- `DELETE /api/pages/:id` – Delete page

### Contracts APIs

- `POST /api/contracts` – Create a contract
- `GET /api/contracts` – Get all contracts (with optional filters)
- `GET /api/contracts?pageId=<pageId>` – Get contracts filtered by page config
- `GET /api/contracts/:id` – Get contract by id
- `PUT /api/contracts/:id` – Update contract
- `DELETE /api/contracts/:id` – Delete contract

### Dynamic Filtering Logic

When the frontend calls:

```http
GET /api/contracts?pageId=<pageId>
````

The backend:

1. Reads the Page document using `pageId`.
2. Extracts the `filters` object from the Page.
3. Converts the filter object into a MongoDB query (e.g. arrays become `$in` queries).
4. Merges page filters with any user filters from query params (e.g. `minAmount`, `status`).
5. Returns the final filtered list of contracts.

````

---

## 🖥 Frontend Flow (Process – Step by Step)

```md
## Frontend Flow

### 1. Sidebar (Dynamic Pages)

- On load, the Sidebar component calls:

```ts
GET /api/pages
````

* The sidebar then:

  * Sorts pages by `rank`
  * Renders a link for each page: `/pages/:url`

So whenever a new page is created in DB, it appears automatically in the sidebar.

### 2. Dynamic Page Routing

* The route `"/pages/:url"` is handled by the `DynamicPage` component.
* It reads the `url` param from React Router.

### 3. Loading Page Config

`DynamicPage` calls:

```ts
GET /api/pages?url=<url>
```

* This returns the Page configuration (including `filters`).
* The frontend shows the title and the filters in the UI.

### 4. Loading Contracts

After the Page is loaded, the component calls:

```ts
GET /api/contracts?pageId=<pageId>
```

* This uses the backend logic to apply page filters.
* The contracts are displayed in a table:

  * Name
  * Contract Type
  * Amount
  * Status
  * Description

### 5. Refresh Button

* There is a `Refresh` button on the page.
* Clicking it triggers `refetch` for:

  * Page data
  * Contracts data
* While refreshing:

  * The button is disabled
  * A spinner + "Refreshing..." text is shown

````

---

## ✍️ “Process while building” (Personal Notes Section)

આ section માં તું થોડું પોતાનાં શબ્દોમાં લખી શકે છે, હું તને base આપું છું:

```md
## Development Process (How I built it)

1. **Backend setup**
   - Initialised a Node.js + Express project.
   - Connected to MongoDB using Mongoose.
   - Created `Page` and `Contract` models based on the assignment.

2. **Page & Contract APIs**
   - Implemented CRUD APIs for Pages and Contracts.
   - Implemented `GET /api/contracts?pageId=<pageId>` to read filters from the Page and apply them to the contracts query.

3. **Frontend setup**
   - Created a React + TypeScript project using Vite.
   - Configured Tailwind CSS for styling.
   - Added React Router and TanStack React Query for routing and data fetching.

4. **Dynamic sidebar**
   - Fetched the pages from `/api/pages`.
   - Rendered them in the sidebar, sorted by `rank`.
   - Clicking on a page navigates to `/pages/:url`.

5. **Dynamic page loading**
   - Used the `url` route param to fetch the page config using `/api/pages?url=<url>`.
   - Then used the `pageId` to call `/api/contracts?pageId=<pageId>` for contracts.

6. **UX improvements**
   - Added loading spinners using a `Loader` component.
   - Added a Refresh button for manually refetching page + contract data.
   - Disabled the refresh button while data is being fetched.
````

# fullstack-demo

# TracEarnly Frontend

The frontend application for **TracEarnly**, a spending tracker and rewards platform.

The application provides an interactive interface for viewing transactions, analyzing spending, managing rewards, and tracking earned coins.

---

## Features

- Dashboard
- Transaction management
- Transaction search and filtering
- Transaction pagination
- Transaction sorting
- Transaction detail view
- Spending analytics
- Category spending breakdown
- Monthly spending trends
- Rewards catalogue
- Coin balance
- Reward redemption
- Redemption history
- Responsive layout
- Mobile-friendly navigation
- Loading states
- Error states
- Reusable UI components

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js | React framework and application routing |
| React | UI development |
| TypeScript | Type-safe application development |
| Tailwind CSS | Styling and responsive UI |
| Axios | Backend API communication |
| Recharts | Analytics and data visualization |

---

## Project Structure

```text
frontend/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   │
│   │   └── (app)/
│   │       ├── layout.tsx
│   │       │
│   │       ├── analytics/
│   │       │   └── page.tsx
│   │       │
│   │       ├── dashboard/
│   │       │   └── page.tsx
│   │       │
│   │       ├── rewards/
│   │       │   └── page.tsx
│   │       │
│   │       └── transactions/
│   │           └── page.tsx
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── CoinBalance.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── TopBar.tsx
│   │   │
│   │   ├── rewards/
│   │   │   ├── RedeemModal.tsx
│   │   │   └── RewardCard.tsx
│   │   │
│   │   ├── transactions/
│   │   │   ├── Pagination.tsx
│   │   │   ├── SortHeader.tsx
│   │   │   ├── TransactionDetail.tsx
│   │   │   ├── TransactionFilters.tsx
│   │   │   └── TransactionTable.tsx
│   │   │
│   │   └── ui/
│   │       ├── Badge.tsx
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Input.tsx
│   │       ├── Modal.tsx
│   │       ├── Select.tsx
│   │       └── Spinner.tsx
│   │
│   ├── hooks/
│   │   ├── useAnalytics.ts
│   │   ├── useRewards.ts
│   │   └── useTransactions.ts
│   │
│   ├── lib/
│   │   ├── api.ts
│   │   └── formatters.ts
│   │
│   └── types/
│       ├── auth.ts
│       ├── reward.ts
│       └── transaction.ts
│
└── README.md
```

---

## Application Structure

### App Routes

The application uses the Next.js App Router.

| Route | Description |
|---|---|
| `/` | Landing page |
| `/dashboard` | Dashboard |
| `/transactions` | Transaction management |
| `/analytics` | Spending analytics |
| `/rewards` | Rewards and redemption |

The application pages are grouped under:

```text
src/app/(app)/
```

---

## Dashboard

The dashboard provides an overview of spending activity.

It includes:

- Total spending
- Transaction count
- Successful transactions
- Failed transactions
- Coin balance
- Spending by category
- Monthly spending trend
- Recent transactions

---

## Transactions

The transaction page provides a complete interface for exploring transaction data.

### Supported Functionality

- Merchant search
- Category filtering
- Status filtering
- Date filtering
- Amount filtering
- Sorting by date
- Sorting by amount
- Pagination
- Transaction details

Clicking a transaction opens a detailed transaction modal.

### Transaction Components

```text
components/transactions/
```

| Component | Purpose |
|---|---|
| `TransactionTable` | Displays transaction records |
| `TransactionFilters` | Search and filter controls |
| `TransactionDetail` | Transaction detail modal |
| `Pagination` | Transaction pagination |
| `SortHeader` | Table sorting controls |

---

## Analytics

The analytics page provides visual spending insights.

It includes:

- Spending by category
- Monthly spending trend
- Top category
- Top merchant
- Total transactions analyzed

Charts are implemented using **Recharts**.

---

## Rewards

The rewards page provides:

- Available rewards
- Current coin balance
- Reward redemption
- Redemption confirmation
- Redemption success state
- Redemption error state
- Redemption history

### Reward Components

```text
components/rewards/
```

| Component | Purpose |
|---|---|
| `RewardCard` | Displays an individual reward |
| `RedeemModal` | Handles reward redemption confirmation and states |

---

## Layout Components

The application layout is managed through reusable layout components.

```text
components/layout/
```

| Component | Purpose |
|---|---|
| `Sidebar.tsx` | Desktop navigation |
| `TopBar.tsx` | Application header and mobile navigation |
| `CoinBalance.tsx` | Displays the current coin balance |

The layout is responsive and adapts the navigation experience for smaller screens.

---

## UI Components

Reusable UI components are located under:

```text
components/ui/
```

| Component | Purpose |
|---|---|
| `Button.tsx` | Reusable buttons |
| `Card.tsx` | Content cards |
| `Badge.tsx` | Status and category badges |
| `Input.tsx` | Form inputs |
| `Select.tsx` | Select/dropdown inputs |
| `Modal.tsx` | Modal dialogs |
| `Spinner.tsx` | Loading indicators |

These components are shared throughout the application to maintain consistent styling and behavior.

---

## Hooks

Application data fetching is separated into reusable React hooks.

### `useTransactions`

Handles transaction API requests and supports dynamic filters.

```text
src/hooks/useTransactions.ts
```

Responsibilities include:

- Fetching transactions
- Applying filters
- Pagination
- Sorting
- Loading state
- Error handling
- Refetching transaction data

### `useAnalytics`

Loads analytics data.

```text
src/hooks/useAnalytics.ts
```

Provides:

- Category breakdown
- Monthly trends
- Summary information
- Loading state

### `useRewards`

Handles reward-related data and operations.

```text
src/hooks/useRewards.ts
```

Provides:

- Reward catalogue
- Coin balance
- Redemption history
- Reward redemption
- Refetching reward data
- Loading state

---

## API Integration

API communication is handled through Axios.

```text
src/lib/api.ts
```

The API base URL is configured using:

```text
NEXT_PUBLIC_API_URL
```

### Local Development

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Production

```env
NEXT_PUBLIC_API_URL=https://tracearnly-backend.onrender.com
```

The Axios client uses the configured backend URL for API requests.

The frontend does not directly access the database. All application data is retrieved through the backend API.

---

## Formatting Utilities

Common formatting functions are located in:

```text
src/lib/formatters.ts
```

They handle:

- Indian currency formatting
- Date formatting
- Transaction status styles
- Transaction category styles

Currency is formatted using INR.

Example:

```text
₹1,000.00
```

---

## Type Definitions

TypeScript interfaces are organized under:

```text
src/types/
```

### `transaction.ts`

Contains types for:

- Transactions
- Pagination
- Transaction filters
- Category analytics
- Monthly analytics
- Dashboard summary

### `reward.ts`

Contains types for:

- Rewards
- Redemption responses
- Redemption history

### `auth.ts`

Contains user and token-related type definitions used by the frontend structure.

---

## Responsive Design

The application is designed to work across:

- Desktop
- Tablet
- Mobile

### Desktop

The desktop application uses a sidebar navigation.

### Mobile

Smaller screens use the mobile top navigation and menu controls.

### Transactions

The transaction table uses horizontal scrolling where necessary to preserve the complete dataset without breaking the layout.

---

## Environment Variables

Create a `.env.local` file in the frontend root directory.

### Local Development

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Production

```env
NEXT_PUBLIC_API_URL=https://tracearnly-backend.onrender.com
```

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Backend API base URL |

Environment variables beginning with `NEXT_PUBLIC_` are intentionally available to browser-side code because the frontend needs the backend API URL.

Do not place private secrets in `NEXT_PUBLIC_` variables.

---

## Installation

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create:

```text
.env.local
```

Add:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 3. Start the Development Server

```bash
npm run dev
```

The frontend will be available at:

```text
http://localhost:3000
```

---

## Production Build

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

---

## Development Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the development server |
| `npm run build` | Creates an optimized production build |
| `npm start` | Starts the production server |
| `npm run lint` | Runs the configured linting checks |

---

## Backend Connection

The frontend communicates with the TracEarnly backend through the configured API URL.

### Local

```text
http://localhost:8000
```

### Production

```text
https://tracearnly-backend.onrender.com
```

The frontend does not directly access the database.

All application data is retrieved through the backend API.

---

## Application Flow

### Dashboard

```text
Dashboard
   │
   ├── Analytics API
   │
   └── Transactions API
          │
          ▼
      Dashboard UI
```

### Transactions

```text
Transaction Filters
        │
        ▼
useTransactions
        │
        ▼
Backend API
        │
        ▼
Transaction Table
        │
        ▼
Transaction Detail
```

### Rewards

```text
Rewards Page
     │
     ▼
useRewards
     │
     ├── Rewards
     ├── Balance
     └── Redemption History
             │
             ▼
        Redeem Modal
             │
             ▼
        Redeem API
```

---

## Deployment

The frontend can be deployed to any platform that supports Next.js.

Before deployment, configure:

```env
NEXT_PUBLIC_API_URL=https://tracearnly-backend.onrender.com
```

The production build can then be generated using:

```bash
npm run build
```

---

## Production URL

```text
https://tracearnly-frontend-coral.vercel.app
```

---

## License

TracEarnly

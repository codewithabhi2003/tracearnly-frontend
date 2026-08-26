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
│       ├── reward.ts
│       └── transaction.ts
│
└── README.md
```

## Application Structure

The application uses the Next.js App Router.

### App Routes

| Route | Description |
|---|---|
| `/` | Landing page |
| `/dashboard` | Spending and rewards overview |
| `/transactions` | Transaction management |
| `/analytics` | Spending analytics |
| `/rewards` | Rewards and redemption |

The main application pages are grouped under `src/app/(app)/`.

## Dashboard

The dashboard provides an overview of spending and rewards activity.

It includes:

- Total spending
- Transaction count
- Successful transactions
- Failed transactions
- Coin balance
- Spending by category
- Monthly spending trend
- Recent transactions

The dashboard also provides quick navigation to the complete transaction list.

## Transactions

The transaction page provides a complete interface for exploring transaction data.

### Supported Functionality

- Merchant search
- Category filtering
- Status filtering
- Date range filtering
- Amount range filtering
- Sorting by date
- Sorting by amount
- Server-side pagination
- Transaction detail view
- Chart-to-transaction filtering

Clicking a transaction opens a detailed transaction modal.

### Transaction Components

`components/transactions/`

| Component | Purpose |
|---|---|
| `TransactionTable.tsx` | Displays transaction records |
| `TransactionFilters.tsx` | Search and filtering controls |
| `TransactionDetail.tsx` | Transaction detail modal |
| `Pagination.tsx` | Pagination controls |
| `SortHeader.tsx` | Table sorting controls |

## Analytics

The analytics page provides visual insights into spending activity.

It includes:

- Spending by category
- Monthly spending trend
- Top category
- Top merchant
- Total transactions analyzed

Charts are implemented using Recharts.

### Category Analytics

The category chart displays spending grouped by transaction category. Selecting a category allows the user to navigate to the transaction list filtered by that category.

### Monthly Analytics

The monthly chart displays spending trends over time, making it easier to understand changes in spending activity.

## Rewards

The rewards page provides a complete coin-based rewards experience.

It includes:

- Available rewards
- Current coin balance
- Reward costs
- Reward redemption
- Redemption confirmation
- Redemption success state
- Redemption error state
- Redemption history

### Reward Components

`components/rewards/`

| Component | Purpose |
|---|---|
| `RewardCard.tsx` | Displays an individual reward |
| `RedeemModal.tsx` | Handles redemption confirmation and result states |

### Redemption Flow

```text
Select Reward
     │
     ▼
Confirm Redemption
     │
     ▼
Backend Validation
     │
     ├── Success
     │     │
     │     ▼
     │  Updated Balance
     │
     └── Failure
           │
           ▼
       Error State
```

The frontend only updates the displayed balance after a successful redemption response.

## Layout Components

The main application layout uses reusable navigation and header components.

`components/layout/`

| Component | Purpose |
|---|---|
| `Sidebar.tsx` | Desktop navigation |
| `TopBar.tsx` | Application header and mobile navigation |
| `CoinBalance.tsx` | Displays the current coin balance |

The layout is responsive and provides navigation controls for both desktop and mobile screens.

## UI Components

Reusable UI components are located under `components/ui/`.

| Component | Purpose |
|---|---|
| `Button.tsx` | Reusable buttons |
| `Card.tsx` | Content cards |
| `Badge.tsx` | Status and category badges |
| `Input.tsx` | Form inputs |
| `Select.tsx` | Select/dropdown inputs |
| `Modal.tsx` | Modal dialogs |
| `Spinner.tsx` | Loading indicators |

These components provide consistent styling and interaction patterns throughout the application.

## Hooks

Application data fetching and state management for API-driven features are separated into reusable React hooks.

### useTransactions

`src/hooks/useTransactions.ts`

Handles:

- Fetching transactions
- Search
- Filtering
- Pagination
- Sorting
- Loading state
- Error handling
- Refetching transaction data

### useAnalytics

`src/hooks/useAnalytics.ts`

Handles:

- Category analytics
- Monthly spending trends
- Summary information
- Loading state

### useRewards

`src/hooks/useRewards.ts`

Handles:

- Reward catalogue
- Coin balance
- Redemption history
- Reward redemption
- Balance updates
- Refetching reward data
- Loading state

## API Integration

API communication is handled through Axios, defined in `src/lib/api.ts`.

The API base URL is configured using the `NEXT_PUBLIC_API_URL` environment variable, for example:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

The Axios client uses the configured backend URL for API requests.

The frontend does not directly access the database. All application data is retrieved through the backend API.

## Formatting Utilities

Common formatting utilities are located under `src/lib/formatters.ts`.

They handle:

- Indian currency formatting
- Date formatting
- Transaction status styles
- Transaction category styles

Currency is formatted using INR.

Example: `₹1,000.00`

## Type Definitions

TypeScript interfaces are organized under `src/types/`.

### transaction.ts

Contains types for:

- Transactions
- Pagination
- Transaction filters
- Category analytics
- Monthly analytics
- Dashboard summary

### reward.ts

Contains types for:

- Rewards
- Redemption responses
- Redemption history

## Responsive Design

The application is designed to work across:

- Desktop
- Tablet
- Mobile

### Desktop

The desktop interface uses a persistent sidebar for navigation.

### Mobile

On smaller screens, the sidebar is replaced by mobile navigation controls accessible from the top bar.

### Transaction Table

The transaction table is designed to preserve all important columns while remaining usable on smaller screens. Horizontal scrolling is used where necessary instead of hiding transaction information.

## Environment Variables

Create a `.env.local` file in the frontend root directory.

Example:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Backend API base URL |

`NEXT_PUBLIC_API_URL` is intentionally public because the frontend browser needs the backend API address.

No private credentials or secrets should be stored in `NEXT_PUBLIC_` variables.

## Installation

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 3. Start the development server

```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`.

## Production Build

Create an optimized production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Development Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the development server |
| `npm run build` | Creates an optimized production build |
| `npm start` | Starts the production server |
| `npm run lint` | Runs the configured linting checks |

## Backend Connection

The frontend communicates with the TracEarnly backend through the configured API URL.

Local backend: `http://localhost:8000`

The frontend does not directly access PostgreSQL. All application data is retrieved through the backend API.

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

### Analytics

```text
Analytics Page
      │
      ▼
useAnalytics
      │
      ├── Category Breakdown
      ├── Monthly Trend
      └── Summary
```

### Rewards

```text
Rewards Page
     │
     ▼
useRewards
     │
     ├── Rewards
     ├── Coin Balance
     └── Redemption History
             │
             ▼
        Redeem Modal
             │
             ▼
        Redeem API
```

## Backend API Dependency

The frontend expects the backend to provide APIs for:

| API Area | Purpose |
|---|---|
| Transactions | Fetch, filter, sort and paginate transactions |
| Analytics | Category, monthly and summary analytics |
| Rewards | Reward catalogue |
| Balance | Current coin balance |
| Redemption | Redeem a selected reward |
| Redemption History | Previously completed redemptions |

The frontend communicates with these endpoints through the Axios client defined in `src/lib/api.ts`.

## License

No license has been specified for this project yet. Add a `LICENSE` file (for example, MIT or Apache 2.0) if this repository will be made public or open-sourced.

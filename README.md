## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Landing page with header and table
│   └── globals.css         # Global styles
├── components/
│   ├── table/
│   │   └── UsersTable.tsx  # Main table component with all features
│   ├── ui/                 # Shadcn UI components
│   │   ├── button.tsx
│   │   ├── table.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── badge.tsx
│   │   └── skeleton.tsx
│   └── providers.tsx       # React Query provider
├── lib/
│   ├── api/
│   │   └── users.ts        # React Query hook for users
│   ├── mock/
│   │   └── users.ts        # Mock data
│   ├── stores/
│   │   └── tableStore.ts   # Zustand state store
│   └── utils.ts            # Utility functions
└── hooks/                  # Custom React hooks (extensible)
```

### Installation

1. Install dependencies (already done):
```bash
npm install
```

2. Shadcn components are already set up:
```bash
npx shadcn add table input select badge skeleton button
```

### Development

Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production

Build for production:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

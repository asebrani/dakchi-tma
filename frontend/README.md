# Spark UI Suite

A modern, feature-rich music streaming UI built with React, TypeScript, and Tailwind CSS. This project showcases a comprehensive dashboard with AI-powered features, playlist management, and a beautiful user interface.

## Features

- 🎵 **Music Dashboard** - Complete music player interface with now playing bar
- 🤖 **AI-Powered** - AI playlist generation and music analysis
- 👤 **User Profile** - Comprehensive user profiles with listening statistics
- ⚙️ **Settings** - Full settings panel with account, privacy, and preferences
- 🎨 **Modern UI** - Built with shadcn/ui and Tailwind CSS
- 📱 **Responsive** - Works seamlessly on desktop and mobile devices
- 🌙 **Dark Mode** - Full dark mode support

## Tech Stack

- **Framework:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui (Radix UI)
- **Routing:** React Router v6
- **State Management:** TanStack Query
- **Forms:** React Hook Form + Zod
- **Icons:** Lucide React
- **Animations:** Framer Motion

## Getting Started

### Prerequisites

- Node.js 18+ (recommended via [nvm](https://github.com/nvm-sh/nvm))
- npm or bun

### Installation

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd spark-ui-suite

# Install dependencies
npm install
# or
bun install

# Start the development server
npm run dev
# or
bun dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build with development mode
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/       # UI components
│   ├── ui/          # shadcn/ui base components
│   ├── shared/      # Shared components
│   ├── icons/       # Custom icons
│   ├── dashboard/   # Dashboard-specific components
│   ├── landing/     # Landing page components
│   ├── layout/      # Layout components
│   ├── profile/     # Profile page components
│   └── settings/    # Settings page components
├── data/            # Mock data
├── hooks/           # Custom React hooks
├── lib/             # Utilities and helpers
├── pages/           # Page components
├── services/        # API services
└── types/           # TypeScript types
```

## Component Library

This project uses [shadcn/ui](https://ui.shadcn.com/) - a collection of re-usable components built with Radix UI and Tailwind CSS. Components are portable and can be easily migrated to other projects.

### Key Components

- **Dashboard Components**: Hero cards, playlist sections, artist displays
- **Profile Components**: User stats, listening history, music journey
- **Layout Components**: Sidebar navigation, top header, now playing bar
- **UI Components**: Buttons, cards, dialogs, forms, and more from shadcn/ui

## Features in Detail

### Dashboard
- AI-generated playlists with smart recommendations
- Recent playlists overview
- Top artists carousel with orbital animation
- Hero feature cards highlighting key features

### Profile
- Comprehensive listening statistics
- Music mastery visualization
- Mood affinity analysis
- Personalized music journey timeline
- AI-powered prompt banner

### Settings
- Account management
- Privacy controls
- Notification preferences
- Integration management
- Two-factor authentication
- Theme customization

## Customization

### Theme
The project uses CSS variables for theming. Modify the colors in [src/index.css](src/index.css) to customize the appearance.

### Components
All components are fully customizable. They're located in `src/components/` and can be modified to fit your needs.

## Deployment

### Build for Production

```sh
npm run build
```

The built files will be in the `dist/` directory.

### Deploy to Vercel

```sh
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify

```sh
# Install Netlify CLI
npm i -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=dist
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE)

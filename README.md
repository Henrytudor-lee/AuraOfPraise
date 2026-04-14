# Aura of Praise

A web application that transforms photos into poetic masterpieces using AI. Upload an image, select a praise style, and receive heartfelt, AI-generated compliments in various literary styles.

## Features

- **Photo Upload**: Drag & drop or browse to upload photos
- **5 Praise Styles**:
  - Ancient Poetry - Classical Chinese Tang and Song dynasty verses
  - English Romance - Victorian-era romantic prose
  - Unconditional Devotion - Playful, hyperbolic affection
  - Long Article - Detailed editorial-style narrative
  - Minimalist - Short, punchy statements
- **Copy & Share**: Easily copy the generated praise or share it
- **Responsive Design**: Works beautifully on desktop and mobile

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local

# Edit .env.local with your MiniMax API credentials
```

### Configure MiniMax API

1. Sign up at [MiniMax Platform](https://platform.minimax.chat/)
2. Get your API Key and Group ID
3. Add them to `.env.local`:

```
MINIMAX_API_KEY=your_api_key_here
MINIMAX_GROUP_ID=your_group_id_here
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Fonts**: Noto Serif, Inter (via Google Fonts)
- **Deployment**: Vercel-ready

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.ts    # MiniMax API integration
│   ├── result/
│   │   └── page.tsx        # Results page
│   ├── upload/
│   │   └── page.tsx        # Upload & style selection
│   ├── globals.css          # Tailwind + custom styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx            # Landing page
├── components/
│   ├── NavBar.tsx
│   ├── HeroSection.tsx
│   ├── StyleShowcase.tsx
│   ├── BentoSection.tsx
│   ├── CTASection.tsx
│   └── Footer.tsx
```

## Design

The design follows the "Digital Keepsake" aesthetic - romantic, soft, and refined with:
- Primary color: Rose pink (#805062)
- Accent: Gold (#efc900)
- Typography: Noto Serif (headlines) + Inter (body)
- Soft shadows and glassmorphism effects

## Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Set your environment variables in the Vercel dashboard:
- `MINIMAX_API_KEY`
- `MINIMAX_GROUP_ID`

## License

MIT

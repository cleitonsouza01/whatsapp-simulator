# WhatsApp Conversation Simulator

A realistic WhatsApp conversation playback tool for advertisement and demo purposes. Define conversations in JSON and watch them play back with authentic animations inside phone frame mockups.

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## Features

- **Realistic WhatsApp UI** - Pixel-faithful message bubbles, check marks, typing indicators
- **Phone Frames** - iPhone (with dynamic island) and Android device mockups
- **Animated Playback** - Messages appear with spring physics animations and timed delays
- **Typing Indicator** - Bouncing dots with "typing..." status in header before received messages
- **Status Transitions** - Animated check marks: sent (single gray) → delivered (double gray) → read (double blue)
- **Playback Controls** - Play, pause, restart, speed adjustment (0.5x, 1x, 1.5x, 2x)
- **Multi-conversation** - Switch between different conversation demos
- **Loop Support** - Auto-restart with configurable delay
- **i18n** - UI labels adapt per conversation language (pt-BR, en)
- **Keyboard Shortcuts** - `Space` = play/pause, `R` = restart

## Creating Conversations

Conversations are defined as JSON files. Place them in `public/conversations/` or add them directly in `src/data/sample-conversations.ts`.

### JSON Schema

```json
{
  "id": "my-demo",
  "meta": {
    "title": "My Demo",
    "theme": "light",
    "device": "iphone",
    "language": "pt-BR"
  },
  "contact": {
    "name": "Support Agent",
    "avatar": "/avatars/agent.jpg",
    "status": "online",
    "isVerified": true
  },
  "messages": [
    {
      "id": "msg-1",
      "type": "received",
      "contentType": "text",
      "text": "Hello! How can I help you?",
      "timestamp": "10:30",
      "delay": 800,
      "showTyping": true,
      "typingDuration": 2000
    },
    {
      "id": "msg-2",
      "type": "sent",
      "contentType": "text",
      "text": "Hi! I have a question about my order",
      "timestamp": "10:31",
      "delay": 2500,
      "status": "read",
      "statusTransitions": [
        { "status": "sent", "delay": 0 },
        { "status": "delivered", "delay": 400 },
        { "status": "read", "delay": 1200 }
      ]
    }
  ],
  "settings": {
    "autoPlay": true,
    "speed": 1,
    "loop": true,
    "loopDelay": 3000
  }
}
```

### Field Reference

#### `meta`

| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Display name in the conversation selector |
| `theme` | `"light"` | Visual theme (light only for now) |
| `device` | `"iphone"` \| `"android"` | Phone frame style |
| `language` | string | UI label language (`"pt-BR"`, `"en"`) |

#### `contact`

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Contact name shown in header |
| `avatar` | string | Path to avatar image (optional, shows default icon if empty) |
| `status` | `"online"` \| `"offline"` | Online indicator in header |
| `isVerified` | boolean | Shows verified badge next to name |

#### `messages[]`

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique message identifier |
| `type` | `"sent"` \| `"received"` | Message direction (sent = green bubble, received = white) |
| `contentType` | `"text"` | Content type |
| `text` | string | Message text (supports emoji and `\n` for line breaks) |
| `timestamp` | string | Time displayed on the message (e.g. `"10:30"`) |
| `delay` | number | Milliseconds to wait before showing this message |
| `showTyping` | boolean | Show typing indicator before this message (received only) |
| `typingDuration` | number | How long the typing indicator shows (ms) |
| `status` | string | Final delivery status for sent messages |
| `statusTransitions` | array | Animated check mark progression (see below) |

#### `statusTransitions[]`

Animates the check marks on sent messages over time:

```json
"statusTransitions": [
  { "status": "sent", "delay": 0 },
  { "status": "delivered", "delay": 400 },
  { "status": "read", "delay": 1200 }
]
```

- `sent` - Single gray check
- `delivered` - Double gray checks
- `read` - Double blue checks

Delays are in milliseconds from when the message appears.

#### `settings`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `autoPlay` | boolean | `true` | Start playing automatically on load |
| `speed` | number | `1` | Playback speed multiplier |
| `loop` | boolean | `false` | Restart conversation after completion |
| `loopDelay` | number | `3000` | Milliseconds to wait before loop restart |

### Adding a New Conversation

1. Create a JSON file following the schema above
2. Add it to `src/data/sample-conversations.ts`:

```typescript
import type { Conversation } from '../types/conversation'

export const myNewConversation: Conversation = {
  // ... your JSON data
}

export const sampleConversations: Conversation[] = [
  demoProductLaunch,
  demoCustomerSupport,
  myNewConversation, // add here
]
```

3. The conversation will appear in the selector below the phone frame.

### Timing Tips

- Use `delay: 500-1000` for quick follow-up messages from the same sender
- Use `delay: 2000-4000` for realistic user typing pauses
- Set `typingDuration` proportional to message length (longer message = longer typing)
- Use `statusTransitions` delays of 200-500ms between each status for natural feel

## Project Structure

```
src/
├── components/
│   ├── phone/          # PhoneFrame, StatusBar
│   ├── chat/           # ChatScreen, ChatHeader, ChatBody, MessageBubble,
│   │                   # MessageStatus, TypingIndicator, ChatInputBar, DateSeparator
│   └── controls/       # PlaybackControls, ProgressBar, ConversationSelector
├── hooks/              # usePlayback, useAutoScroll, useConversation, useStatusTransition
├── engine/             # PlaybackEngine (state machine), MessageScheduler, ConversationParser
├── types/              # TypeScript interfaces
├── styles/             # WhatsApp theme tokens, Framer Motion animation variants
├── utils/              # Message grouping helpers
└── data/               # Sample conversation data
```

## Scripts

```bash
npm run dev       # Start development server
npm run build     # Production build
npm run preview   # Preview production build
```

## Tech Stack

- React 19 + TypeScript
- Vite 7
- Tailwind CSS 4
- Framer Motion
- Lucide React (icons)

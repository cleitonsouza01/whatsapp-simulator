export const whatsappColors = {
  chatBg: '#efeae2',
  bubbleSent: '#d9fdd3',
  bubbleReceived: '#ffffff',
  header: '#008069',
  headerDark: '#00654f',
  textPrimary: '#111b21',
  textSecondary: '#667781',
  timestamp: '#667781',
  tickGray: '#667781',
  tickBlue: '#53bdeb',
  online: '#25d366',
  inputBg: '#f0f2f5',
  divider: '#e9edef',
} as const

export const whatsappTypography = {
  fontFamily: '-apple-system, "Segoe UI", Helvetica, Arial, sans-serif',
  messageFontSize: '14.2px',
  messageLineHeight: '19px',
  timestampFontSize: '11px',
  contactNameFontSize: '16px',
  contactNameWeight: 500,
} as const

export const whatsappBubble = {
  borderRadius: '8px',
  maxWidth: '65%',
  padding: '6px 7px 8px 9px',
  tailWidth: 8,
} as const

export const i18nLabels: Record<string, Record<string, string>> = {
  'pt-BR': {
    online: 'online',
    typing: 'digitando...',
    today: 'HOJE',
    yesterday: 'ONTEM',
    typeMessage: 'Mensagem',
  },
  en: {
    online: 'online',
    typing: 'typing...',
    today: 'TODAY',
    yesterday: 'YESTERDAY',
    typeMessage: 'Type a message',
  },
}

export function getLabels(language: string) {
  return i18nLabels[language] ?? i18nLabels['en']
}

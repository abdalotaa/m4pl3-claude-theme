import type { Register, ThemeSetArgs } from 'claude-code'

import { makeColors } from './make-colors.js'

// M4PL3 "The Studio Canvas" (DESIGN.md): cream paper, ink outlines, one brick-rust mark.
// El sistema rechaza las superficies oscuras, así que el tema es solo claro.
const INK = '#17140F'
const PAPER = '#F3EFE7'
const WHITE = '#FFFFFF'
const BUTTER = '#F1DF9E'
const MINT = '#CFE3CF'
const RUST = '#8C2F1E'

// Sticker: 1.5-2px ink outline, 6px corners, pinned-paper edge. Four colors, each message takes one.
const sticker = { radius: 6, padding: 14, borderColor: INK, borderWidth: 2, shadow: { x: 0, y: 3, blur: 0, color: INK } } as const

const { theme, problems } = makeColors({
  label: 'M4PL3 Studio Canvas',
  only: 'light',
  roles: { accent: '#8C2F1E', danger: '#B3261E', success: '#3F6B3A', warning: '#8A6A12', pro: '#6B4F7A' },
  light: {
    gray: {
      anchors: {
        'surface-0': PAPER,
        'surface-1': '#F9F6F0',
        'surface-2': WHITE,
        'text-primary': INK,
        'text-secondary': '#3A352C',
        'text-muted': '#6B6355',
      },
    },
    git: {
      added: '#3F6B3A',
      removed: '#8C2F1E',
      modified: '#8A6A12',
      merged: '#6B4F7A',
      closed: '#6B6355',
      conflicting: '#B3261E',
      draft: '#6B6355',
    },
  },
})

const LOOK: ThemeSetArgs = {
  colors: theme,
  // The studio canvas: a 56px design-tool grid of 7% ink lines on the cream paper.
  backdrop: {
    vector: {
      viewBox: 56,
      size: [56, 56],
      repeat: true,
      paths: [{ d: 'M0.5 0V56M0 0.5H56', strokeWidth: 1, color: '#17140F12' }],
    },
  },
  style: {
    Heading: { fontWeight: 'bold', letterSpacing: -0.5 },
    UserMessage: [
      { ...sticker, backgroundColor: BUTTER, color: INK, rotate: -1.2 },
      { ...sticker, backgroundColor: MINT, color: INK, rotate: 0.8 },
      { ...sticker, backgroundColor: RUST, color: PAPER, rotate: -0.6 },
      { ...sticker, backgroundColor: INK, color: PAPER, rotate: 1 },
    ],
    // Card: white sheet, 2px ink outline, flat offset shadow. No tilt on reading text.
    AssistantMessage: {
      backgroundColor: WHITE,
      color: INK,
      radius: 16,
      paddingX: 22,
      paddingY: 18,
      borderColor: INK,
      borderWidth: 2,
      shadow: { x: 6, y: 6, blur: 0, color: INK },
    },
    // Chip: paper, ink outline, pill, mono label.
    ToolUse: {
      color: '#3A352C',
      fontFamily: ['mono'],
      backgroundColor: PAPER,
      borderColor: INK,
      borderWidth: 1.5,
      radius: 64,
      paddingX: 12,
    },
  },
}

export const register: Register = on => {
  // Aplica el tema al abrir la sesión, y otra vez con el primer mensaje por si la
  // recarga en caliente no vuelve a disparar session.start.
  let applied = false

  on('session.start', async ($, e, next) => {
    try {
      await $.theme.set(LOOK)
    } catch (error) {
      $.ui.log(String(error))
      await $.theme.set({ colors: theme })
    }
    applied = true
    return next(e)
  })

  on('prompt.submit', async ($, e, next) => {
    if (!applied) {
      applied = true

      try {
        await $.theme.set(LOOK)
      } catch (error) {
        $.ui.log(String(error))
        await $.theme.set({ colors: theme })
      }
    }
    return next(e)
  })
}

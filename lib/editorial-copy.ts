// Deterministic copy generator — same trip + page always produces the same text

function hash(str: string): number {
  let h = 0
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0
  }
  return Math.abs(h)
}

function pick<T>(arr: T[], seed: number): T {
  return arr[Math.abs(seed) % arr.length]
}

export function getLocation(tripName: string): string {
  return tripName.split(',')[0].trim()
}

const HEADLINES = [
  (p: string) => `The Light of ${p}`,
  (p: string) => `Finding ${p}`,
  (p: string) => `${p} at Dusk`,
  (p: string) => `The Spirit of ${p}`,
  (p: string) => `${p}, Unhurried`,
  (p: string) => `Through ${p}`,
  (p: string) => `The Colors of ${p}`,
  (p: string) => `Lost in ${p}`,
]

const SUBHEADS = [
  'Where every corner tells a story',
  'A journey through light and time',
  'Some places refuse to let you go',
  'The kind of beauty that asks nothing of you',
  'Wander long enough and the place finds you',
  'Light, water, and the slow passage of afternoon',
  'The best moments were the unplanned ones',
  'Every photograph a memory made twice',
]

const CAPTIONS = [
  'An afternoon wandering the waterfront',
  'The colors of early morning',
  'Where the road meets the water',
  'A quiet moment in the afternoon light',
  'Sunlight on old stone',
  'The hour before sunset',
  'Looking out over the rooftops',
  'Details that only the unhurried notice',
  'A turn in the old quarter',
  'The slow rhythm of the afternoon',
  'Somewhere between arrival and belonging',
  'Light through an open window',
]

const PULL_QUOTES = [
  'The kind of place that stays with you long after you leave.',
  'Some destinations are photographs waiting to happen.',
  'We came for a few days. We could have stayed forever.',
  'Beauty here is not exceptional — it is simply the condition of things.',
  'Every turn revealed something worth stopping for.',
  "The best photographs were the ones we almost didn't take.",
]

const BODY_TEXT = [
  (p: string) =>
    `There is a particular quality to the light in ${p} — golden, unhurried, falling at an angle that seems designed for photography. We arrived with a plan. ${p} had other ideas.`,
  (p: string) =>
    `${p} rewards the aimless wanderer. The best moments arrive without warning: light on water, a half-hidden garden, a table set for two in an otherwise empty square.`,
  (p: string) =>
    `To understand ${p} is to surrender to it. The pace slows almost immediately. The maps stay in pockets. The afternoons stretch long past their natural end.`,
  (p: string) =>
    `Every trip has a rhythm, and ${p}'s is decidedly unhurried. The streets seem to insist on it. The light obliges. You stop checking the time.`,
  (p: string) =>
    `The thing about ${p} is that it doesn't try to impress you. It simply exists — ancient, unhurried, luminous — and lets you draw your own conclusions.`,
  (p: string) =>
    `We had a list of things to see in ${p}. By the second day the list was forgotten. Some places are better experienced without one.`,
]

const SECTION_LABELS = ['TRAVEL', 'JOURNAL', 'AWAY', 'EXPLORE', 'DISCOVER', 'WANDER', 'ESCAPE', 'ROAM']

const COVER_LINES = [
  (p: string) => `The Hidden Corners of ${p}`,
  (_p: string) => `Golden Hour on the Water`,
  (_p: string) => `Where to Eat, Stay & Wander`,
  (p: string) => `Finding Stillness in ${p}`,
  (_p: string) => `The Art of Going Slow`,
  (_p: string) => `A Perfect Week Away`,
  (_p: string) => `Views Worth Every Step`,
  (p: string) => `The Local's Guide to ${p}`,
]

export function getCopy(tripName: string, pageIndex: number) {
  const loc = getLocation(tripName)
  const h = (suffix: string) => hash(tripName + pageIndex + suffix)

  return {
    headline: pick(HEADLINES, h('h'))(loc),
    subhead: pick(SUBHEADS, h('s')),
    caption1: pick(CAPTIONS, h('c1')),
    caption2: pick(CAPTIONS, h('c2') + 3),
    caption3: pick(CAPTIONS, h('c3') + 6),
    caption4: pick(CAPTIONS, h('c4') + 9),
    pullQuote: pick(PULL_QUOTES, h('pq')),
    bodyText: pick(BODY_TEXT, h('bt'))(loc),
    sectionLabel: pick(SECTION_LABELS, h('sl')),
    coverLines: [
      pick(COVER_LINES, h('cl1'))(loc),
      pick(COVER_LINES, h('cl2') + 2)(loc),
      pick(COVER_LINES, h('cl3') + 4)(loc),
    ],
  }
}

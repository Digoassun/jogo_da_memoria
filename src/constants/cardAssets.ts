import type { CardRank } from '@/types/card'

export const CARD_BACK = '/cards/back.webp'

export const CARD_FACES: Record<CardRank, string> = {
  '2': '/cards/2.webp',
  '3': '/cards/3.webp',
  '4': '/cards/4.webp',
  '5': '/cards/5.webp',
  '6': '/cards/6.webp',
  '7': '/cards/7.webp',
  Q: '/cards/Q.webp',
  J: '/cards/J.webp',
  K: '/cards/K.webp',
  A: '/cards/A.webp',
}

export const getCardFace = (value: CardRank): string => {
  return CARD_FACES[value]
}

export const CARD_IMAGE_URLS = [CARD_BACK, ...Object.values(CARD_FACES)]

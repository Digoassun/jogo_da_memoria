import type { CardRank } from '@/types/card'

export const CARD_BACK = '/cards/back.png'

export const CARD_FACES: Record<CardRank, string> = {
  '2': '/cards/2.png',
  '3': '/cards/3.png',
  '4': '/cards/4.png',
  '5': '/cards/5.png',
  '6': '/cards/6.png',
  '7': '/cards/7.png',
  Q: '/cards/Q.png',
  J: '/cards/J.png',
  K: '/cards/K.png',
  A: '/cards/A.png',
}

export const getCardFace = (value: CardRank): string => {
  return CARD_FACES[value]
}

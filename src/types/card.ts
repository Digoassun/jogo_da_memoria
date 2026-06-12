export type CardRank = '2' | '3' | '4' | '5' | '6' | '7' | 'Q' | 'J' | 'K' | 'A'

export type Card = {
  value: CardRank
}

export type BoardCard = Card & {
  id: number
}

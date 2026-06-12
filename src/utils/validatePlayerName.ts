export const validatePlayerName = (name: string): string | null => {
  const trimmed = name.trim()

  if (!trimmed) {
    return 'Digite seu nome para jogar'
  }

  if (trimmed.length < 2) {
    return 'O nome deve ter pelo menos 2 caracteres'
  }

  return null
}

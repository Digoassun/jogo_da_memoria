import { STORAGE_KEYS } from '@/constants/storageKeys'
import type { UserSession } from '@/types/user'

export const userRepository = {
  save(session: UserSession) {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(session))
  },

  load(): UserSession | null {
    const raw = localStorage.getItem(STORAGE_KEYS.USER)
    if (!raw) return null

    return JSON.parse(raw) as UserSession
  },

  clear(): void {
    localStorage.removeItem(STORAGE_KEYS.USER)
  },
}

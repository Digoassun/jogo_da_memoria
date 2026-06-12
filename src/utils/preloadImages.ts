export const preloadImages = async (urls: string[]): Promise<void> => {
  const uniqueUrls = [...new Set(urls)]

  await Promise.all(
    uniqueUrls.map(
      (url) =>
        new Promise<void>((resolve) => {
          const img = new Image()
          img.onload = () => resolve()
          img.onerror = () => resolve()
          img.src = url
        }),
    ),
  )
  return undefined
}

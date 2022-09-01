import { ChangeEvent } from 'react'

export const resizeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
  const height = e.target.scrollHeight
  e.target.style.height = `${height}px`
}

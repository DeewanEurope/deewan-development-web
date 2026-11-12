import { Fragment } from 'react'

type SplitWordsProps = {
  // words wrapped in <em>…</em> are coloured amber, e.g. "the <em>Digital</em> future"
  text: string
}

// "a <em>b c</em> d" → a, b (amber), c (amber), d
const toWords = (text: string) =>
  text
    .split(/(<em>.*?<\/em>)/)
    .flatMap((part) => {
      const highlight = part.startsWith('<em>')
      return part
        .replace(/<\/?em>/g, '')
        .split(/\s+/)
        .filter(Boolean)
        .map((word) => ({ word, highlight }))
    })

// Wraps every word in a mask so GSAP can slide it up (see useScrollReveal "words")
function SplitWords({ text }: SplitWordsProps) {
  const words = toWords(text)

  return (
    <>
      {words.map(({ word, highlight }, index) => (
        <Fragment key={`${word}-${index}`}>
          <span className={`dw-word${highlight ? ' is-highlight' : ''}`}>
            <span>{word}</span>
          </span>
          {index < words.length - 1 && ' '}
        </Fragment>
      ))}
    </>
  )
}

export default SplitWords

import { Html, Head, Main, NextScript } from 'next/document'
import { Footer } from '@pmndrs/branding'
import React, { Suspense, useEffect, useState, useRef  } from 'react'

export default function Document() {
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    document.body.style.cursor = hovered
      ? 'none'
      : `url('data:image/svg+xml;base64,${btoa(
          '<svg width="24" height="24" viewBox="0 0 32 32" fill="white" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="10" fill="#191A1F" stroke="white" strokeWidth=2/></svg>'
        )}'), auto`
  }, [hovered])


  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

import { Html, Head, Main, NextScript } from 'next/document'
import { Footer } from '@pmndrs/branding'
import React, { Suspense, useEffect, useState, useRef  } from 'react'

export default function Document() {
  const [hovered, setHovered] = useState(false)


  return (
    <Html lang="en" >
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

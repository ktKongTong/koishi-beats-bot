import React from 'react'
import * as ReactDOMServer from 'react-dom/server'

function App({ children }: { children?: React.ReactNode }) {
  return (
    <html>
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/daisyui@4.7.2/dist/full.min.css"
          rel="stylesheet"
          type="text/css"
        />
        <script src="https://cdn.tailwindcss.com"></script>
        <title>IMG Render</title>
      </head>
      <body className={'bg-red-400 flex w-fit'}>{children}</body>
    </html>
  )
}

export default App

export const renderComponent = (child: React.ReactNode) => {
  let res = ReactDOMServer.renderToString(<App>{child}</App>)
  res = ` <!DOCTYPE html>` + res
  return res
}

export const getHtml = renderComponent
//
// export const renderImg = async (
//   child: React.ReactNode,
//   onStart?: () => void,
//   onError?: () => void
// ) => {
//   let res = ReactDOMServer.renderToString(<App>{child}</App>)
//   res = ` <!DOCTYPE html>` + res
//
//   const buf = await render(res, async (page, next) => {
//     onStart?.()
//     await sleep(5000)
//     return page
//       .$('body')
//       .then(next)
//       .catch((e) => {
//         onError?.()
//         return ''
//       })
//   })
//   return buf
// }
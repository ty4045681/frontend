import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { parseCookies } from "nookies";

export default function App({ Component, pageProps }: AppProps) {
  const { jwt } = pageProps

  return <Component {...pageProps} jwt={jwt}/>
}
//
// App.getInitialProps = async ({ ctx }) => {
//   const { jwt } = parseCookies(ctx);
//
//   return { pageProps: { jwt } }
// }
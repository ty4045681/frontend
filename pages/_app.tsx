import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {ThemeProvider} from "next-themes";


export default function App({Component, pageProps}: AppProps) {
    return (
        <ThemeProvider attribute='class'>
            <div className='custom-scrollbar-wrapper'>
                <Component {...pageProps} />
            </div>
        </ThemeProvider>
    )
}
//
// App.getInitialProps = async ({ ctx }) => {
//   const { jwt } = parseCookies(ctx);
//
//   return { pageProps: { jwt } }
// }
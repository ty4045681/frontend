import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {createTheme, ThemeProvider} from "@mui/material";
import {DevSupport} from "@react-buddy/ide-toolbox-next";
import {ComponentPreviews, useInitial} from "@/components/dev";

const theme = createTheme()

export default function App({Component, pageProps}: AppProps) {
    return (
        <ThemeProvider theme={theme}>
            <DevSupport ComponentPreviews={ComponentPreviews}
                        useInitialHook={useInitial}
            >
                <Component {...pageProps} />
            </DevSupport>
        </ThemeProvider>
    )
}
//
// App.getInitialProps = async ({ ctx }) => {
//   const { jwt } = parseCookies(ctx);
//
//   return { pageProps: { jwt } }
// }
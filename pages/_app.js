import React from "react";
import 'fontsource-roboto';
import Head from "next/head";
import {Provider} from "react-redux";
import store from "../redux/store";
import withRedux from "next-redux-wrapper";

const App = ({Component, pageProps}) => {
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
            </Head>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </>
    )
}

export async function getStaticProps({Component, ctx}) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
    //Anything returned here can be access by the client
    return {pageProps: pageProps};
}

const makeStore = () => store;

export default withRedux(makeStore)(App)

import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Router from 'next/router';
import {ThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/components/theme';
import NavBar from "../src/components/NavBar";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({parent: '.MuiGrid-root'})

Router.events.on('routeChangeStart', () => {
    NProgress.start()
})
Router.events.on('routeChangeComplete', () => {
    NProgress.done()
})
Router.events.on('routerChangeError', () => {
    NProgress.done()
})

const MyApp = props => {

    const {Component, pageProps} = props;

    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <React.Fragment>
            <Head>
                <title>Material Universitario</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
            </Head>
            <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline/>
                <NavBar/>
                <Component {...pageProps} />
            </ThemeProvider>
        </React.Fragment>
    );
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
};

export default MyApp
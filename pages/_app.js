/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable @next/next/no-css-tags */
import '../styles/globals.css';
import '../styles/main.css';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

// import "../styles/globals.css";
import "../styles/App.css";
import "../styles/skeletonLoading.css";
import "../styles/borders.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

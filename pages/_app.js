import "@/styles/globals.css";
import {FavoritesProvider} from "./context/FavoritesContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Head from "next/head";

export default function App({Component, pageProps}) {
  return (
    <FavoritesProvider>
      {/* Change the favicon */}
      <Head>
        <link rel="icon" href="/pokeball.png" type="image/png" />
      </Head>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </FavoritesProvider>
  );
}

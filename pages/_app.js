import "@/styles/globals.css";
import { FavoritesProvider } from "./context/FavoritesContext";
import { PokemonProvider } from "./context/PokemonContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <PokemonProvider>
      <FavoritesProvider>
        <Head>
          {/* Change the favicon */}
          <link rel="icon" href="/pokeball.png" type="image/png" />
        </Head>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </FavoritesProvider>
    </PokemonProvider>
  );
}

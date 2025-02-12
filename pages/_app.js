import "@/styles/globals.css";
import { FavoritesProvider } from "./context/FavoritesContext";
import Navbar from "./components/Navbar";

export default function App({ Component, pageProps }) {
  return (
    <FavoritesProvider>
      <Navbar />
      <Component {...pageProps} />
    </FavoritesProvider>
  );
}

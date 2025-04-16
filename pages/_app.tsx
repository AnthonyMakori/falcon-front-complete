import '../style/globals.css';
import { CartProvider } from "../context/CartContext";
import { AppProps } from 'next/app';
//import Header from '../components/header/Header';
import { ThemeProvider } from '../components/contexts/Theme';
import { useRouter } from 'next/router';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const excludedRoutes = [
    '/AdminAuth/signin', 
    '/AdminAuth/signup',
    '/new/newreleased',
    '/wishlist/wishlistpage',
    '/upload/UploadMovie',
    '/upload/Merchandize',
  
  ]; 

  return (
    <SessionProvider session={pageProps.session}>
    <CartProvider>
    <ThemeProvider>
      <div
        className="min-h-screen text-black transition-colors duration-200 
                    dark:bg-gray-900 dark:text-white 
                    light:bg-white light:text-black text-black"
      >
        {!excludedRoutes.includes(router.pathname) }
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
    </CartProvider>
    </SessionProvider>
  );
}

export default MyApp;

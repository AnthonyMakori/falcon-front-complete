import '../style/globals.css';
import { CartProvider } from "../context/CartContext";
import { AppProps } from 'next/app';
import { ThemeProvider } from '../components/contexts/Theme';
import { useRouter } from 'next/router';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';

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
          <Head>
            <title>FalconEyePhilmz</title>
            <link rel="icon" href="/logos/FALCON EYE PHILMZ REVERMPED LOGO (3).jpg" />
          </Head>
          <div
            className="min-h-screen text-black transition-colors duration-200 
                        dark:bg-gray-900 dark:text-white 
                        light:bg-white light:text-black text-black"
          >
            {!excludedRoutes.includes(router.pathname)}
            <Component {...pageProps} />
          </div>
        </ThemeProvider>
      </CartProvider>
    </SessionProvider>
  );
}

export default MyApp;

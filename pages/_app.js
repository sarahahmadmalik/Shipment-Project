import '../styles/globals.css'
import {  Roboto } from "next/font/google";
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const font = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700"],
});


export default function App({ Component, pageProps }) {
  return (
    <>
  <main className={font.className}>
    <Header/>
    <Component {...pageProps}/>
    <Footer/>
    </main> 
    </>
    )
}

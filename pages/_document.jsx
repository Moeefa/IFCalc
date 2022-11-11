import Document, { Head, Html, Main, NextScript } from 'next/document';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default class _Document extends Document {
  render() {
    return (
      <Html>
        <Head>
          <title>IFCalc</title>
          <meta content="IFCalc" property="og:title" />
          <meta content="Com o nosso site, você poderá calcular a sua média anual e bimestral!" property="og:description" />
          <meta content={process.env.NEXT_PUBLIC_URL} property="og:url" />
          <meta content="#000000" data-react-helmet="true" name="theme-color" />
        </Head>
        <body>
          <Main/>
          <NextScript/>
        </body>
      </Html>
    );
  };
};

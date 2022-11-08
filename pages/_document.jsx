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
          <meta content="https://ifcalc.vercel.app/" property="og:url" />
          <meta content="https://cba.ifmt.edu.br/media/filer_public/93/70/9370316d-6d4b-4369-a016-39ccf7162d1c/15_cores_02.svg" name="twitter:card" />
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

import Document, { Html, Head, Main, NextScript } from 'next/document';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default class _Document extends Document {
  render() {
    return (
      <Html>
        <Head/>
        <body>
          <Main/>
          <NextScript/>
        </body>
      </Html>
    );
  };
};

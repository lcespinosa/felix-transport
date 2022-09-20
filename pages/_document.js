import Document, { Html, Head, Main, NextScript } from "next/document";

export default class CustomDocument extends Document {
  render() {
    return (
      <Html className="h-full bg-gray-50" lang="en">
        <Head></Head>
        <body className="h-full">
          <Main />
        </body>
        <NextScript />
      </Html>
    );
  }
}

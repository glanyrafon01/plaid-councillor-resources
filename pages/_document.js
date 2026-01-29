import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="Plaid Councillor Resources - Interactive web app with 100 Tips for Councillors and Being a Councillor guide" />
          <meta name="keywords" content="Plaid Cymru, councillor, local government, politics, Wales, tips, guide" />
          <meta name="author" content="Plaid Cymru" />
          <link rel="icon" href="/favicon.ico" />
          
          <style>{`
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
              margin: 0;
              padding: 0;
              line-height: 1.5;
              color: #333;
            }
            
            button {
              background-color: #f5f5f5;
              border: 1px solid #ddd;
              border-radius: 4px;
              cursor: pointer;
            }
            
            button:hover {
              background-color: #e0e0e0;
            }
            
            button:disabled {
              opacity: 0.5;
              cursor: not-allowed;
            }
          `}</style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
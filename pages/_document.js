import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

import { GA_TRACKING_ID } from '../lib/gtag';
import { GTM_ID } from '../lib/gtm';
import loader from '../src/loader';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      // impératif pour récupérer les styles générés par styled-components
      ctx.renderPage = () =>
        originalRenderPage({
          //on passe la fonctionnalité de rendu à la fonctionnalité de rendu de l'application
          enhanceApp: (App) => (props) =>
          // on collecte les styles de l'application
            sheet.collectStyles(<App {...props} />),
        })

      // on récupère les props de l'application
      const initialProps = await Document.getInitialProps(ctx)
      return {
        // on renvoie les props de l'application
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html lang="fr">
        <Head>
          {/* Meta tags */}
            <meta charset="UTF-8"/>
            <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
            <meta name="description" content="“Festiv'App” est une application qui rassemble tous les adeptes de festivals de musique du monde entier." />
            <meta name="theme-color" content="#FF0000" />
            <meta name="author" content="Elisabeth Ngo" />
            <meta name="copyright" content="Festivapp@2022" />
            <meta name="robots" content="index"/>
            <meta httpEquiv="expires" content="43200"/>
            <meta property="og:title" content="FestivApp" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://festivapp.fr" />
            <meta property="og:image" content/>
            <meta property="og:description" content="“Festiv'App” est une application qui rassemble tous les adeptes de festivals de musique du monde entier." />

            {/* favicon */}
            <link rel="icon" href="/favicon.ico" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
            <link rel="manifest" href="/site.webmanifest"/>

            {/* Google Fonts */}
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;400;500;600;700&display=swap" rel="stylesheet"/>

            {/* Google Analytics */}
            <script 
                async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} 
            />
            
            <script
                dangerouslySetInnerHTML={{
                __html: `     
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}   
                    gtag('js', new Date());
                    gtag('config', '${GA_TRACKING_ID}', {  
                    page_path: window.location.pathname,
                    });
                `,
                }} 
            />

            {/* Google Tag Manager */}
            <script
              dangerouslySetInnerHTML={{
                __html: `     
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-KVMW9MC');
                `,
              }}
            />

            <style>
                { loader }
            </style>
            
        </Head>

        <body>
        <script 
        async src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        />

        {/* Bandeau cookies Axeptio */}
        <script
        dangerouslySetInnerHTML={{
            __html: `
                window.axeptioSettings = {
                    clientId: "62dc9644aee6fa56165dcfc5",
                    cookiesVersion: "festivapp-fr",
                };
                
                (function(d, s) {
                    var t = d.getElementsByTagName(s)[0], e = d.createElement(s);
                    e.async = true; e.src = "//static.axept.io/sdk.js";
                    t.parentNode.insertBefore(e, t);
                })(document, "script");
            `,
        }}
        /> 

        <div id={'globalLoader'}>
            <div className="loader">
            <div/>
            <div/>
            </div>
        </div>
        
        <Main />
        <NextScript />

        </body>
    </Html>
    );
}
}
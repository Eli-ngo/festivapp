import '../styles/globals.css'
import Layout from '../components/Layout'
import { GTM_ID } from '../lib/gtm'
import * as gtag from '../lib/gtag'
import { useRouter } from 'next/dist/client/router'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }) { // pageProps est un objet qui contient les props de l'application
  const router = useRouter()
  useEffect (() => {
    const handleRouteChange = (url) => {
      gtag.pageview (url)
    }
    router.events.on ('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off ('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
  return (
    <>
      {/* Google Tag Manager */}
      <script
      dangerouslySetInnerHTML={{
      __html: `     
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}   
          gtag('js', new Date());
          gtag('config', '${GTM_ID}', {  
          page_path: window.location.pathname,
          });
      `,
      }}
      />
      <Layout>
        {/* on passe la fonctionnalité de rendu à la fonctionnalité de rendu de l'application */}
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp

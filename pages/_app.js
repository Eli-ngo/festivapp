import '../styles/globals.css'
import Layout from '../components/Layout'
import { GTM_ID } from '../lib/gtm'
import * as gtag from '../lib/gtag'
import { useRouter } from 'next/dist/client/router'
import { useEffect } from 'react'
import { CookiesProvider } from 'react-cookie'
import '../styles/cookieconsent.css'

function MyApp({ Component, pageProps }) { // pageProps est un objet qui contient les props de l'application
  const router = useRouter()
  useEffect (() => {
    //loader
    if (typeof window !== 'undefined') {
      const loader = document.getElementById('globalLoader');
      if (loader)
          loader.style.display = 'none';
    }

    const handleRouteChange = (url) => {
      gtag.pageview (url)
    }
    router.events.on ('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off ('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  if(router.asPath =='/auth/signup')  {
    return (
      <Component {...pageProps} />
    )
  }

  if(router.asPath =='/auth/signin')  {
    return (
      <Component {...pageProps} />
    )
  }

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
      <CookiesProvider> {/* pour s'assurer que toutes les routes de l'appli aient accès au cookie *, on entoure notre composant app dans un cookie provider */}
        <Layout>
          {/* on passe la fonctionnalité de rendu à la fonctionnalité de rendu de l'application */}
          <Component {...pageProps} />
        </Layout>
      </CookiesProvider>
    </>
  )
}

export default MyApp

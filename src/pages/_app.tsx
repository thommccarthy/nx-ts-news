import Layout from '@/components/layout/Layout';
import '@/styles/globals.css';
import '@/styles/highlight-js/stackoverflow-dark.css';
import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        title='Thom McCarthy | UX Engineer'
        description='I build and design responsive, scalable, robust and accessible web interfaces. On occasion I will write about it.'
        canonical='https://thommccarthy.dev/'
        openGraph={{
          url: 'https://thommccarthy.dev/',
          title: 'Thom McCarthy | UX Engineer',
          description:
            'I build and design responsive, scalable, robust and accessible web interfaces. On occasion I will write about it.',
          images: [
            {
              url: 'https://thommccarthy.dev/assets/global/thommccarthy-og-image.jpg',
              alt: 'Thom McCarthy',
            },
          ],
          site_name: 'Thom McCarthy | UX Engineer',
        }}
        twitter={{
          handle: '@mccarthy_thom',
          site: '@mccarthy_thom',
          cardType: 'summary_large_image',
        }}
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

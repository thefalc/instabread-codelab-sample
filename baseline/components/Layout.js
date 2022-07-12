import Head from 'next/head';

export async function getBearerToken() {
  return new Promise(async function(resolve, reject) {
    const res = await fetch('/api/skyflow-token', {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'GET'
      }
    );

    const result = await res.json();

    resolve(result.accessToken);
  });
};

export default function Layout({
  children,
  title = 'This is the default title',
}) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      { children }
    </div>
  );
}
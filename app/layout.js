import './globals.css';

export const metadata = {
  title: 'Benchmark Surveying Co. — Land Surveys You Can Build On',
  description:
    'Licensed land surveyors providing boundary surveys, ALTA/NSPS surveys, topographic mapping, construction staking, elevation certificates, and GPS/GNSS control.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

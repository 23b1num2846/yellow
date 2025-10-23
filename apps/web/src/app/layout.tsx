import Header from './components/Header';
import './global.css';

export const metadata = {
  title: 'Шар ном',
  description: 'Monorepo',
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="mn">
      <body className="font-sans bg-gray-50">
        <Header />
        {children}
      </body>
    </html>
  );
}

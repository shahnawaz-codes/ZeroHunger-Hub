import { Toaster } from 'react-hot-toast';
import './globals.css';

export const metadata = {
  title: 'MyApp',
  description: 'Full-stack Next.js boilerplate',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}

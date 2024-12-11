import ThemeProvider from '../context/ThemeProvider';
import './globals.css';

export const metadata = {
  title: 'Task Manager',
  description: 'Manage Team and their tasks easily and also collaborate in real time',
};

export default function RootLayout({children}: {children: React.ReactNode;}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {children}
          </ThemeProvider>
      </body>
    </html>
  );
}

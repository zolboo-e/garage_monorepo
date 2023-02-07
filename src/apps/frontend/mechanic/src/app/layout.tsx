//
import "tailwindcss/tailwind.css";

const RootLayout: React.FCC = ({ children }) => {
  return (
    <html lang="en" data-theme="light">
      <head />
      <body className="bg-gray-50">{children}</body>
    </html>
  );
};
export default RootLayout;

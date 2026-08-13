function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-10 py-6">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-gray-500">

        <p>
          © {new Date().getFullYear()} Notes. All rights reserved.
        </p>

        <p>
          Built with React & Node.js
        </p>

      </div>
    </footer>
  );
}

export default Footer;
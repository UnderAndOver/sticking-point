const Navbar = () => {
  return (
    <nav className="flex items-center justify-between py-6">
      <div className="text-2xl font-bold text-white-800">
        <a href="/">Sticking Point</a>
      </div>
      <div className="space-x-4">
        <a href="/debates" className="text-white-800 hover:text-white-600">
          Debates
        </a>
        <a href="/topics" className="text-white-800 hover:text-white-600">
          Topics
        </a>
        <a href="/about" className="text-white-800 hover:text-white-600">
          About
        </a>
      </div>
    </nav>
  );
};

export default Navbar;

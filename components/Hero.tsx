const Hero = () => {
  return (
    <header className="mt-10">
      <h1 className="text-5xl font-bold text-white-800 mb-4">
        Welcome to Sticking Point
      </h1>
      <h2 className="text-2xl text-white-700 mb-8">
        Join a new era of debates, enhanced with AI.
      </h2>
      <a
        href="/debates"
        className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-500"
      >
        Start Debating
      </a>
    </header>
  );
};

export default Hero;

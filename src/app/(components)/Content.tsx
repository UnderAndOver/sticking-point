const Content = () => {
  return (
    <>
      <section className="bg-white text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-wrap">
          <h2 className="sm:text-3xl text-2xl text-gray-900 font-medium title-font mb-2 md:w-2/5">
            Bridge The Gap In Online Discourse
          </h2>
          <div className="md:w-3/5 md:pl-6">
            <p className="leading-relaxed text-base">
              Sticking Point is on a mission to bridge the divide in online
              discourse. By leveraging advanced AI technology, we provide a
              neutral platform for debates. Our system transcribes, analyzes,
              and scores debates, identifying key points, conflicts, and
              evidence. With the added power of user-contributed fact-checking,
              we foster an environment of understanding and respectful
              discussion.
            </p>
            <div className="flex md:mt-4 mt-6">
              <button className="inline-flex text-white bg-yellow-500 border-0 py-1 px-4 focus:outline-none hover:bg-yellow-600 rounded">
                Start Now
              </button>
              <a className="text-yellow-500 inline-flex items-center ml-4">
                Learn More
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-wrap sm:flex-row md:flex-row-reverse">
          <h2 className="sm:text-3xl text-2xl text-gray-900 font-medium title-font mb-2 md:w-2/5">
            The Problem with Partisan Debates
          </h2>
          <div className="md:w-3/5 md:pr-8">
            <p className="leading-relaxed text-base">
              In an increasingly polarized world, online debates often devolve
              into echo chambers, reaffirming existing beliefs without
              introducing new perspectives. Sticking Point is here to change
              that. We strive for a neutral, comprehensive view of each debate,
              opening the door for nuanced understanding and critical thought.
            </p>
            <div className="flex md:mt-4 mt-6">
              <button className="inline-flex text-white bg-yellow-500 border-0 py-1 px-4 focus:outline-none hover:bg-yellow-600 rounded">
                Start Now
              </button>
              <a className="text-yellow-500 inline-flex items-center ml-4">
                Learn More
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Content;

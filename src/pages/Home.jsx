export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Preserve Our Environment
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Join us in protecting and preserving our environment for future generations.
          Make a difference today by supporting environmental organizations.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="/organizations"
            className="rounded-md bg-mazingira-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-mazingira-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mazingira-600"
          >
            View Organizations
          </a>
          <a href="#learn-more" className="text-sm font-semibold leading-6 text-gray-900">
            Learn more <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
"use client";
 
export default function Home() {
  return (
    <div className="bg-[#121212] text-white min-h-screen flex flex-col justify-center items-center px-4 py-16 mt-10">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-5xl font-extrabold text-[#61AFEF] mb-4">
          Welcome to <span className="text-5xl text-white">E2Etst</span>
        </h1>
        <p className="text-xl mb-8 max-w-xl mx-auto text-gray-300">
          Discover, create, and share amazing stories with the world. Join the
          community of passionate writers and start your blogging journey today!
        </p>
        <a
          href="#start"
          className="bg-[#61AFEF] text-white px-8 py-3 rounded-full text-lg hover:bg-[#4FC3F7] transition-colors"
        >
          Start Your Blog
        </a>
      </div>
 
      {/* Features Section */}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-screen-xl mx-auto">
        {/* Feature 1 */}
        <div className="bg-[#1C1C1C] p-8 rounded-lg text-center shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="text-2xl font-semibold text-[#61AFEF] mb-4">Create Posts</h3>
          <p className="text-lg text-gray-300">
            Easily write and format your posts with a simple and intuitive editor.
          </p>
        </div>
        {/* Feature 2 */}
        <div className="bg-[#1C1C1C] p-8 rounded-lg text-center shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="text-2xl font-semibold text-[#61AFEF] mb-4">Engage with Readers</h3>
          <p className="text-lg text-gray-300">
            Build your community by engaging with readers through comments and feedback.
          </p>
        </div>
        {/* Feature 3 */}
        <div className="bg-[#1C1C1C] p-8 rounded-lg text-center shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="text-2xl font-semibold text-[#61AFEF] mb-4">Track Analytics</h3>
          <p className="text-lg text-gray-300">
            Get detailed insights into how your posts are performing and grow your audience.
          </p>
        </div>
      </div>
 
      {/* Call to Action */}
      <div className="mt-16 text-center">
        <h2 className="text-3xl font-semibold text-[#61AFEF] mb-4">Ready to Start Your Blog?</h2>
        <p className="text-lg text-gray-300 mb-8">
          Join thousands of bloggers and share your thoughts, experiences, and expertise with the world.
        </p>
        <a
          href="#start"
          className="bg-[#61AFEF] text-white px-8 py-3 rounded-full text-lg hover:bg-[#4FC3F7] transition-colors"
        >
          Get Started
        </a>
      </div>
    </div>
  );
}
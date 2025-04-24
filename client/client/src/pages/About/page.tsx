import React from "react";

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Intro Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">About Us</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            We’re a passionate team of developers, designers, and strategists committed to building
            modern digital experiences that drive results.
          </p>
        </div>

        {/* Company Mission & Values */}
        <div className="grid md:grid-cols-2 gap-12 items-start mb-24">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-600">
              To empower businesses through innovative, scalable, and human-centered digital
              solutions. Whether it’s web development, UI/UX, or performance optimization — we aim
              to deliver real-world impact.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Values</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>🚀 Innovation & Creativity</li>
              <li>🤝 Transparency & Collaboration</li>
              <li>📈 Quality-Driven Delivery</li>
              <li>💡 Continuous Learning</li>
              <li>🌍 Client-Centric Mindset</li>
            </ul>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-24">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-10">Meet the Team</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { name: "Ayesha Khan", role: "CEO & Co-founder" },
              { name: "David Lee", role: "Lead Developer" },
              { name: "Mariam Chen", role: "UI/UX Designer" },
              { name: "Carlos Reyes", role: "Project Manager" },
              { name: "Sophie Tran", role: "QA Engineer" },
              { name: "Rahul Mehta", role: "Frontend Engineer" },
            ].map((member, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow p-6 text-center border border-gray-100"
              >
                <div className="w-20 h-20 mx-auto mb-4 bg-gray-200 rounded-full" />
                <h3 className="text-lg font-medium text-gray-900">{member.name}</h3>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Work With Us */}
        <div className="mb-24 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Why Partner With Us?</h2>
          <p className="max-w-3xl mx-auto text-gray-600">
            We combine technical expertise with creative thinking to deliver end-to-end solutions
            tailored to your goals. Whether you're a startup or an enterprise, we bring
            craftsmanship, strategy, and empathy into every project we take on.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center bg-white p-10 rounded-2xl shadow-md border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-800">Let’s Build Something Great Together</h3>
          <p className="mt-2 text-gray-600">
            Have a project in mind? We're ready to help you make it happen.
          </p>
          <a
            href="#"
            className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

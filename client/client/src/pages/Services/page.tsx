import React from "react";
import ServiceCard from "./components/ServiceCard";

const services = [
  {
    title: "Web Development",
    description: "Custom websites and web apps using React, Next.js, and Tailwind for fast and scalable digital experiences.",
    icon: "💻",
  },
  {
    title: "UI/UX Design",
    description: "User-centric design for intuitive and beautiful interfaces that boost engagement and conversions.",
    icon: "🎨",
  },
  {
    title: "Mobile-Responsive Design",
    description: "Designs that adapt seamlessly across all devices to provide the best user experience everywhere.",
    icon: "📱",
  },
  {
    title: "SEO Optimization",
    description: "Boost your site’s visibility with performance tweaks, semantic markup, and structured data.",
    icon: "🚀",
  },
  {
    title: "Performance Tuning",
    description: "Fast load times and high Lighthouse scores using smart optimization strategies.",
    icon: "⚡",
  },
  {
    title: "Maintenance & Support",
    description: "Ongoing support, updates, and optimizations to keep your site running smoothly.",
    icon: "🔧",
  },
];

const testimonials = [
  {
    quote: "Absolutely amazing! Delivered a high-quality site on time and exceeded expectations.",
    author: "Sarah K., Startup Founder",
  },
  {
    quote: "Professional and skilled – my go-to developer for all things web.",
    author: "James R., Agency Owner",
  },
];

const ServicesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">My Services</h1>
          <p className="mt-4 text-lg text-gray-600">
            Specialize in building modern, high-performance web applications tailored to your business needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={<span>{service.icon}</span>}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>

        {/* Testimonials */}
        <div className="mt-24">
          <h2 className="text-3xl font-semibold text-gray-800 text-center">Client Testimonials</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow border border-gray-100">
                <p className="text-gray-700 italic">“{t.quote}”</p>
                <p className="mt-4 font-semibold text-gray-900">— {t.author}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 text-center bg-white p-10 rounded-2xl shadow-md border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-800">Let’s build something amazing together.</h3>
          <p className="mt-2 text-gray-600">Ready to take your digital presence to the next level?</p>
          <a
            href="#"
            className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;

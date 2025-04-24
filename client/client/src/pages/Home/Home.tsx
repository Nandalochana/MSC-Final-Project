import { FC, useEffect } from "react";
import { Link } from "react-router";
import BgImage from '../../assets/main-image-bg.png';
import { useUserStore } from "../../store/user-store";
import { useSendLocation } from "./api/location-query";

export const Home: FC = () => {
  const { user } = useUserStore(); // Call the hook at the top level
  const sendLocation = useSendLocation();

  useEffect(() => {
    const logLocation = () => {
      if (user?.user._id && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            sendLocation.mutate({
              userId: user.user._id,
              status: "ACTIVE",
              latitude,
              longitude,
            });
          },
          (error) => {
            if (error.code === error.PERMISSION_DENIED) {
              alert("Location access is required to log your location.");
            }
          }
        );
      } else if (!user?.user._id) {
        console.log("User ID is not available. Skipping location logging.");
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    };

    const intervalId = setInterval(logLocation, 5000);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [user, sendLocation]); // Add `user` and `sendLocation` as dependencies

  return (
    <>
      {/* Hero Section */}
      <section
        className="h-screen flex flex-col justify-center items-center bg-cover bg-right bg-no-repeat relative"
        style={{ backgroundImage: `url(${BgImage})`}}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Access Expert Freelancers for Your Business Needs</h1>
          <p className="text-lg md:text-xl mb-6">Get the job done with experienced freelancers in web, marketing, design, content, and more.</p>
          <Link to="/#services">
            <button className="bg-blue-700 text-white px-6 py-3 rounded-3xl text-lg font-semibold hover:bg-blue-600 transition duration-300">
              Explore Now
            </button>
          </Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Choose Us?</h2>
          <p className="text-gray-600 mb-12 max-w-3xl mx-auto">
            We’re a team of experts delivering reliable, scalable, and high-performance web
            solutions. Here's what sets us apart:
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 text-left">
            {[
              "Modern Tech Stack",
              "Pixel Perfect UI Design",
              "SEO & Speed Optimized",
              "Mobile-First Approach",
              "100% Client Satisfaction",
              "Ongoing Support",
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-gray-50 border border-gray-100 p-6 rounded-xl shadow hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">✅ {item}</h3>
                <p className="text-sm text-gray-600">
                  We implement this as a core part of every project — your success is our priority.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section id="services" className="py-20 bg-gray-50 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Services</h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            Explore the wide range of web and design services we offer to meet your business goals.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 text-left">
            {[
              { title: "Web Development", desc: "Custom web apps using React, Next.js, Node.js, and more." },
              { title: "UI/UX Design", desc: "User-first, clean, and responsive designs for all devices." },
              { title: "Landing Pages", desc: "High-converting pages for products, services, or campaigns." },
              { title: "Performance Optimization", desc: "Speed, SEO, and mobile optimization included." },
              { title: "CMS & Admin Panels", desc: "Manage your content easily with custom dashboards." },
              { title: "Consulting & Support", desc: "Technical guidance and maintenance packages." },
            ].map((service, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-100 p-6 rounded-xl shadow hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{service.title}</h3>
                <p className="text-sm text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">What Our Clients Say</h2>
          <div className="space-y-10">
            {[
              {
                quote:
                  "Working with this team was a smooth experience from start to finish. The final product exceeded expectations!",
                author: "Sarah J., E-commerce Founder",
              },
              {
                quote:
                  "Highly professional, great communication, and top-notch development skills. We'll be coming back for future projects.",
                author: "Jason M., Startup CEO",
              },
            ].map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow text-left"
              >
                <p className="text-gray-700 italic mb-4">“{testimonial.quote}”</p>
                <p className="text-sm font-semibold text-gray-800">— {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white text-center px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Let’s Build Something Great Together</h2>
          <p className="mb-6 text-lg">
            Ready to turn your idea into a powerful digital experience? Let’s talk.
          </p>
          <Link to="#">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-3xl text-lg font-semibold hover:bg-gray-100 transition duration-300">
              Get in Touch
            </button>
          </Link>
        </div>
      </section>
    </>
  );
};

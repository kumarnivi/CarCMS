import React from 'react';
import BannerRed from '../assets/banner_car_red.png'

const Banner: React.FC = () => {
  return (
    <div className="bg-gray-100">
      {/* Hero Section */}

      <section className="relative bg-white-900 text-gray-800 ">
        <div className='flex'>
        <div className="max-w-screen-xl mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Experience the Best Car Shower Services
          </h1>
          <p className="text-lg mb-8">
            Keep your car spotless with our premium car wash and detailing services.
            Convenient, eco-friendly, and professional care at your fingertips.
          </p>
          <a
            href="#services"
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg text-lg shadow-lg"
          >
            Explore Services
          </a>
        </div>
        <img
          src={BannerRed}
          alt="Car Shower"
          className="absolute  inset-0 w-full h-full object-contain top-20  mt-20 ml-96  pointer-events-none select-none"
        />
        </div>
        
      </section>

      {/* Features Section */}
      <section id="services" className="py-16">
        <div className="max-w-screen-xl mx-auto px-4 ">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#000]">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4  text-[#1E6EE6]">Exterior Wash</h3>
              <p className='text-[#8F1EE6]'>
                Restore your car's shine with a professional exterior wash that leaves it looking like new.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4 text-[#1E6EE6]">Interior Cleaning</h3>
              <p className='text-[#8F1EE6]'>
                Enjoy a spotless interior with deep cleaning, vacuuming, and upholstery care.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4 text-[#1E6EE6]">Full Detailing</h3>
              <p className='text-[#8F1EE6]'>
                Comprehensive detailing services for both interior and exterior to keep your car pristine.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-blue-50 py-16">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#1E6EE6]">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-700 italic">
                "Amazing service! My car has never looked so clean. Highly recommend!"
              </p>
              <p className="mt-4 font-semibold text-[#8F1EE6]">- John D.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-700 italic">
                "Quick, eco-friendly, and affordable. I'm impressed with the results every time."
              </p>
              <p className="mt-4 font-semibold text-[#8F1EE6]">- Sarah K.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-blue-900 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Book Your Car Shower?
        </h2>
        <p className="mb-8">
          Schedule your appointment today and experience the ultimate car cleaning service.
        </p>
        <a
          href="#"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg shadow-lg"
        >
          Book Now
        </a>
      </section>
    </div>
  );
};

export default Banner;

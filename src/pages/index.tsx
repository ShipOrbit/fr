import {
  ArrowRight,
  ChevronRight,
  Clock,
  Package,
  Shield,
  Star,
} from "lucide-react";
import Layout from "../components/layout";

const ShipOrbitLanding = () => {
  const HeroSection = () => (
    <section className="min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Revolutionizing
              <span className="text-blue-600"> Global Logistics</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Experience the future of freight with our intelligent platform
              connecting shippers and carriers worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-all transform hover:scale-105 flex items-center justify-center group cursor-pointer">
                Ship with OrbitLogistics
                <ArrowRight className="ml-2 h-5 w-5 group-hover:tra-blue-x-1 transition-transform" />
              </button>
              <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full hover:bg-blue-600 hover:text-white transition-all cursor-pointer">
                Drive with OrbitLogistics
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Modern logistics and shipping"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
            </div>
            <div className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-lg">
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const SafetySection = () => (
    <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-800 rounded-3xl p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-4xl font-bold mb-6">
                Safety & Security First
              </h2>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                In an ever-changing world, we prioritize the safety and security
                of everyone in our network. Our advanced monitoring systems
                ensure peace of mind for all stakeholders.
              </p>
              <button className="bg-white text-gray-900 px-8 py-3 rounded-full hover:bg-gray-100 transition-colors font-medium cursor-pointer">
                Learn More
              </button>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Safety and security in logistics"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const MainContentSection = () => (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            When logistics runs smoother, business thrives globally
          </h2>
        </div>

        <div className="mb-16 rounded-3xl overflow-hidden shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1494412651409-8963ce7935a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="Global logistics network"
            className="w-full h-96 object-cover"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
            <div className="bg-blue-600 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <Clock className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Lightning Fast
            </h3>
            <p className="text-gray-600">
              Real-time matching and instant quotes
            </p>
          </div>

          <div className="text-center p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl">
            <div className="bg-green-600 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <Shield className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Ultra Reliable
            </h3>
            <p className="text-gray-600">
              99.9% uptime with advanced monitoring
            </p>
          </div>

          <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl">
            <div className="bg-purple-600 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <Star className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Always On Time
            </h3>
            <p className="text-gray-600">
              Precision delivery tracking and updates
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="group cursor-pointer">
            <div className="relative rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-shadow">
              <img
                src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Carriers"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent"></div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-3">
              Carriers
            </h3>
            <p className="text-gray-600 mb-4">
              Smart load matching. Maximum efficiency.
            </p>
            <a
              href="#carriers"
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center group"
            >
              Learn more
              <ChevronRight className="ml-1 h-4 w-4 group-hover:tra-blue-x-1 transition-transform" />
            </a>
          </div>

          <div className="group cursor-pointer">
            <div className="relative rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-shadow">
              <img
                src="https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Shippers"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 to-transparent"></div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-3">
              Shippers
            </h3>
            <p className="text-gray-600 mb-4">
              Seamless booking. Instant capacity access.
            </p>
            <a
              href="#shippers"
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center group"
            >
              Learn more
              <ChevronRight className="ml-1 h-4 w-4 group-hover:tra-blue-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );

  const AwardsSection = () => (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Industry Recognition
            </h2>
            <p className="text-gray-600 text-lg">
              ShipOrbit leads the industry in innovation, reliability, and
              customer satisfaction.*
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Innovation Award"
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Innovation Excellence
              </h3>
              <p className="text-gray-600">
                Leading the digital transformation in logistics technology and
                automation.
              </p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Customer Satisfaction"
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Customer Excellence
              </h3>
              <p className="text-gray-600">
                Consistently delivering exceptional service and building lasting
                partnerships.
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <a
              href="#awards"
              className="text-blue-600 hover:text-blue-700 font-medium underline"
            >
              Read more about our achievements
            </a>
          </div>
        </div>
      </div>
    </section>
  );

  const TestimonialSection = () => (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')`,
        }}
      ></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-bold text-white mb-6">
            "Instant access to global shipping capacity"
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Our platform empowers businesses with the confidence and capability
            to move freight efficiently across any distance.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-full hover:bg-gray-100 transition-colors font-medium flex items-center group cursor-pointer">
            Get Started Today
            <ArrowRight className="ml-2 h-5 w-5 group-hover:tra-blue-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );

  const SignUpSection = () => (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Join thousands of satisfied customers
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Start managing your logistics operations with confidence.
              Available 24/7 for your scheduling needs.
            </p>
            <button className="bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-all transform hover:scale-105 flex items-center group cursor-pointer">
              Start Shipping Now
              <ArrowRight className="ml-2 h-5 w-5 group-hover:tra-blue-x-1 transition-transform" />
            </button>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Sign up and get started"
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <Layout>
      <HeroSection />
      <SafetySection />
      <MainContentSection />
      <AwardsSection />
      <TestimonialSection />
      <SignUpSection />
    </Layout>
  );
};

export default ShipOrbitLanding;

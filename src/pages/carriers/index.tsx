import {
  ArrowRight,
  Calendar,
  CreditCard,
  DollarSign,
  MapPin,
  Package,
  Route,
  Shield,
  Smartphone,
  Star,
  Truck,
  Users,
} from "lucide-react";
import Layout from "../../components/layout";

const CarriersLanding = () => {
  const HeroSection = () => (
    <section className="min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Drive. Earn.
              <span className="text-blue-600"> Grow.</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Access premium freight loads, maximize your earnings, and build
              your trucking business with ShipOrbit's carrier network. No
              subscription fees, just results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-all transform hover:scale-105 flex items-center justify-center group cursor-pointer">
                Join Our Network
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Truck driver on the road"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
            </div>
            <div className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-lg">
              <Truck className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const BenefitsSection = () => (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Why Thousands of Carriers Choose ShipOrbit
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Build a profitable trucking business with our comprehensive carrier
            platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
            <div className="bg-blue-600 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <DollarSign className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Higher Earnings
            </h3>
            <p className="text-gray-600">
              Access to premium loads with competitive rates and quick payment
              terms
            </p>
          </div>

          <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
            <div className="bg-blue-600 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <MapPin className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Smart Routes
            </h3>
            <p className="text-gray-600">
              Optimize your routes and reduce deadhead miles with intelligent
              matching
            </p>
          </div>

          <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl">
            <div className="bg-purple-600 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <Shield className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Reliable Support
            </h3>
            <p className="text-gray-600">
              24/7 support team and protection for every load you haul
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl">
            <div className="flex items-center mb-4">
              <Smartphone className="h-8 w-8 text-blue-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900">Mobile First</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Find loads, track deliveries, and manage your business from
              anywhere with our mobile app.
            </p>
            <img
              src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Mobile app interface"
              className="w-full h-48 object-cover rounded-xl"
            />
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl">
            <div className="flex items-center mb-4">
              <CreditCard className="h-8 w-8 text-blue-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900">Quick Pay</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Get paid faster with our QuickPay program - access your earnings
              within 24 hours.
            </p>
            <img
              src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Quick payment processing"
              className="w-full h-48 object-cover rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );

  const FeaturesSection = () => (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Everything You Need to Succeed
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <Route className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Load Matching
            </h3>
            <p className="text-gray-600">
              AI-powered algorithm finds the best loads for your truck and route
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <Calendar className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Flexible Scheduling
            </h3>
            <p className="text-gray-600">
              Work when you want with loads that fit your schedule
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <Users className="h-12 w-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Carrier Community
            </h3>
            <p className="text-gray-600">
              Connect with other professional drivers and share insights
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <Star className="h-12 w-12 text-orange-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Rating System
            </h3>
            <p className="text-gray-600">
              Build your reputation and access premium loads with higher ratings
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <Package className="h-12 w-12 text-red-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Load Protection
            </h3>
            <p className="text-gray-600">
              Comprehensive insurance coverage for cargo and liability
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <Truck className="h-12 w-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Fleet Management
            </h3>
            <p className="text-gray-600">
              Tools to manage multiple trucks and drivers efficiently
            </p>
          </div>
        </div>
      </div>
    </section>
  );

  const TestimonialSection = () => (
    <section className="py-16 bg-blue-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')`,
        }}
      ></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            "ShipOrbit helped me build my trucking empire"
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            "Started with one truck, now I run a fleet of 15. The consistent
            loads and fair rates from ShipOrbit made all the difference in
            growing my business."
          </p>
          <div className="flex items-center justify-center">
            <div className="bg-white rounded-full p-1 mr-4">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                alt="Carrier testimonial"
                className="w-12 h-12 rounded-full"
              />
            </div>
            <div className="text-left">
              <p className="text-white font-semibold">Mike Rodriguez</p>
              <p className="text-white/80">
                Owner-Operator, Rodriguez Trucking
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const CTASection = () => (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-3xl p-8 lg:p-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to take your trucking business to the next level?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of successful carriers who trust ShipOrbit for
            consistent, profitable loads. Start driving for success today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 flex items-center justify-center group cursor-pointer">
              Apply Now
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <Layout>
      <HeroSection />
      <BenefitsSection />
      <FeaturesSection />
      <TestimonialSection />
      <CTASection />
    </Layout>
  );
};

export default CarriersLanding;

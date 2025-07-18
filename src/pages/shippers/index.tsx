import {
  ArrowRight,
  BarChart3,
  Clock,
  DollarSign,
  Globe,
  MapPin,
  Package,
  Shield,
  Truck,
  Users,
  Zap,
} from "lucide-react";
import Layout from "../../components/layout";

const ShippersLanding = () => {
  const HeroSection = () => (
    <section className="min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Ship Smarter with
              <span className="text-blue-600"> ShipOrbit</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Connect with thousands of verified carriers instantly. Get
              competitive rates, real-time tracking, and seamless logistics
              management all in one platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-all transform hover:scale-105 flex items-center justify-center group cursor-pointer">
                Start Shipping Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:tranblue-x-1 transition-transform" />
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Shipping dashboard"
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

  const BenefitsSection = () => (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Why Choose ShipOrbit for Your Shipping Needs?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of successful shippers who trust ShipOrbit for their
            logistics operations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
            <div className="bg-blue-600 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <DollarSign className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Competitive Rates
            </h3>
            <p className="text-gray-600">
              Access to thousands of carriers means better rates and more
              capacity options
            </p>
          </div>

          <div className="text-center p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl">
            <div className="bg-green-600 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <Zap className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Instant Booking
            </h3>
            <p className="text-gray-600">
              Book loads in minutes with our smart matching algorithm
            </p>
          </div>

          <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl">
            <div className="bg-purple-600 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <Shield className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Full Protection
            </h3>
            <p className="text-gray-600">
              Comprehensive insurance coverage and verified carrier network
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl">
            <div className="flex items-center mb-4">
              <Clock className="h-8 w-8 text-blue-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900">
                Real-Time Tracking
              </h3>
            </div>
            <p className="text-gray-600 mb-6">
              Monitor your shipments 24/7 with GPS tracking, automated updates,
              and instant notifications.
            </p>
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Real-time tracking"
              className="w-full h-48 object-cover rounded-xl"
            />
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl">
            <div className="flex items-center mb-4">
              <BarChart3 className="h-8 w-8 text-blue-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900">
                Analytics Dashboard
              </h3>
            </div>
            <p className="text-gray-600 mb-6">
              Gain insights into your shipping patterns, costs, and performance
              with detailed analytics.
            </p>
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Analytics dashboard"
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
            Everything You Need to Ship Successfully
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <Globe className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Global Network
            </h3>
            <p className="text-gray-600">
              Access carriers worldwide for domestic and international shipping
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <Users className="h-12 w-12 text-green-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Verified Carriers
            </h3>
            <p className="text-gray-600">
              All carriers are thoroughly vetted and continuously monitored
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <MapPin className="h-12 w-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Route Optimization
            </h3>
            <p className="text-gray-600">
              AI-powered routing to minimize costs and delivery times
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <Truck className="h-12 w-12 text-orange-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Load Matching
            </h3>
            <p className="text-gray-600">
              Smart algorithm matches your loads with the best available
              carriers
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <Package className="h-12 w-12 text-red-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Cargo Insurance
            </h3>
            <p className="text-gray-600">
              Comprehensive coverage options to protect your valuable shipments
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <BarChart3 className="h-12 w-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Cost Management
            </h3>
            <p className="text-gray-600">
              Detailed cost analysis and budget tracking tools
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
          backgroundImage: `url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')`,
        }}
      ></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            "ShipOrbit transformed our logistics operations"
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            "We've reduced shipping costs by 25% and improved delivery times by
            40%. The platform is intuitive and the support team is exceptional."
          </p>
          <div className="flex items-center justify-center">
            <div className="bg-white rounded-full p-1 mr-4">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                alt="Customer testimonial"
                className="w-12 h-12 rounded-full"
              />
            </div>
            <div className="text-left">
              <p className="text-white font-semibold">Sarah Johnson</p>
              <p className="text-white/80">Supply Chain Manager, TechCorp</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const CTASection = () => (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 lg:p-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to revolutionize your shipping?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied shippers who trust ShipOrbit for their
            logistics needs. Start your free trial today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 flex items-center justify-center group cursor-pointer">
              Start Now
              <ArrowRight className="ml-2 h-5 w-5 group-hover:tranblue-x-1 transition-transform" />
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

export default ShippersLanding;

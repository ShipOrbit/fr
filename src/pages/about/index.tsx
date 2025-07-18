import {
  ArrowRight,
  Award,
  Building,
  Globe,
  Heart,
  Lightbulb,
  MapPin,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import Layout from "../../components/layout";

const AboutPage = () => {
  const HeroSection = () => (
    <section className="min-h-screen flex items-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Revolutionizing
              <span className="text-blue-600"> Logistics</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Founded in 2020, ShipOrbit has transformed the logistics industry
              by connecting shippers and carriers through innovative technology
              and unparalleled service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-all transform hover:scale-105 flex items-center justify-center group cursor-pointer">
                Join Our Mission
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full hover:bg-blue-600 hover:text-white transition-all cursor-pointer">
                Our Story
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Modern office building"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
            </div>
            <div className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-lg">
              <Building className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const MissionSection = () => (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Our Mission & Vision
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're committed to making logistics simple, efficient, and
            accessible for everyone
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
            <div className="bg-blue-600 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <Target className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Our Mission
            </h3>
            <p className="text-gray-600">
              To revolutionize global logistics by creating seamless connections
              between shippers and carriers through innovative technology.
            </p>
          </div>

          <div className="text-center p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl">
            <div className="bg-green-600 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <Globe className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Our Vision</h3>
            <p className="text-gray-600">
              To be the world's leading logistics platform that empowers
              businesses to move freight efficiently across any distance.
            </p>
          </div>

          <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl">
            <div className="bg-purple-600 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <Heart className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Our Values</h3>
            <p className="text-gray-600">
              Integrity, innovation, and customer-centricity guide everything we
              do as we build lasting partnerships.
            </p>
          </div>
        </div>
      </div>
    </section>
  );

  const StorySection = () => (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Company founders"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-4 -right-4 bg-white rounded-full p-4 shadow-lg">
              <Lightbulb className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              ShipOrbit was born from a simple observation: the logistics
              industry was fragmented, inefficient, and desperately needed a
              modern solution. Our founders, with decades of combined experience
              in logistics and technology, saw an opportunity to create
              something revolutionary.
            </p>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Starting in 2020, we began with a vision to connect shippers and
              carriers through intelligent technology. What started as a small
              team with big dreams has grown into a platform that serves
              thousands of businesses worldwide.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Today, ShipOrbit continues to innovate, making logistics more
              transparent, efficient, and accessible for businesses of all
              sizes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );

  const StatsSection = () => (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Our Impact by Numbers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            These numbers represent real businesses and real impact in the
            logistics industry
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
            <div className="text-4xl font-bold text-blue-600 mb-2">50K+</div>
            <div className="text-gray-600 font-medium">Active Shippers</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl">
            <div className="text-4xl font-bold text-green-600 mb-2">25K+</div>
            <div className="text-gray-600 font-medium">Registered Carriers</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl">
            <div className="text-4xl font-bold text-purple-600 mb-2">2M+</div>
            <div className="text-gray-600 font-medium">Shipments Completed</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl">
            <div className="text-4xl font-bold text-orange-600 mb-2">99.9%</div>
            <div className="text-gray-600 font-medium">Platform Uptime</div>
          </div>
        </div>
      </div>
    </section>
  );

  const TeamSection = () => (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Meet Our Leadership
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our diverse team of experts is passionate about transforming the
            logistics industry
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
              alt="CEO"
              className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
            />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Sarah Johnson
            </h3>
            <p className="text-blue-600 font-medium mb-4">CEO & Co-Founder</p>
            <p className="text-gray-600">
              Former VP of Operations at a Fortune 500 logistics company with
              15+ years of industry experience.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
              alt="CTO"
              className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
            />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Michael Chen
            </h3>
            <p className="text-blue-600 font-medium mb-4">CTO & Co-Founder</p>
            <p className="text-gray-600">
              Technology veteran with expertise in scalable platforms and
              AI-driven logistics solutions.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
            <img
              src="https://images.unsplash.com/photo-1494790108755-2616c2e4e0b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
              alt="COO"
              className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
            />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Emily Rodriguez
            </h3>
            <p className="text-blue-600 font-medium mb-4">COO</p>
            <p className="text-gray-600">
              Operations expert focused on scaling our platform and ensuring
              exceptional customer experiences.
            </p>
          </div>
        </div>
      </div>
    </section>
  );

  const CultureSection = () => (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Our Culture & Values
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              At ShipOrbit, we believe that great technology is built by great
              people. Our culture is founded on innovation, collaboration, and a
              shared commitment to excellence.
            </p>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-blue-600 rounded-full p-2 mr-4 mt-1">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Collaborative Innovation
                  </h3>
                  <p className="text-gray-600">
                    We foster an environment where ideas flow freely and
                    innovation thrives through teamwork.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-green-600 rounded-full p-2 mr-4 mt-1">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Continuous Growth
                  </h3>
                  <p className="text-gray-600">
                    We invest in our people's development and encourage
                    continuous learning and improvement.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-purple-600 rounded-full p-2 mr-4 mt-1">
                  <Award className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Excellence in Everything
                  </h3>
                  <p className="text-gray-600">
                    We set high standards and strive for excellence in every
                    aspect of our work.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Team collaboration"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-4 -left-4 bg-white rounded-full p-4 shadow-lg">
              <Zap className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const LocationsSection = () => (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Global Presence
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            With offices around the world, we're always close to our customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="bg-blue-600 rounded-full p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <MapPin className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
              New York
            </h3>
            <p className="text-gray-600 text-center mb-4">Headquarters</p>
            <p className="text-gray-600 text-center">
              123 Logistics Ave
              <br />
              New York, NY 10001
              <br />
              United States
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="bg-green-600 rounded-full p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <MapPin className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
              London
            </h3>
            <p className="text-gray-600 text-center mb-4">
              European Operations
            </p>
            <p className="text-gray-600 text-center">
              456 Commerce Street
              <br />
              London, EC2M 7PY
              <br />
              United Kingdom
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="bg-purple-600 rounded-full p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <MapPin className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
              Singapore
            </h3>
            <p className="text-gray-600 text-center mb-4">Asia-Pacific Hub</p>
            <p className="text-gray-600 text-center">
              789 Business Boulevard
              <br />
              Singapore 018956
              <br />
              Singapore
            </p>
          </div>
        </div>
      </div>
    </section>
  );

  const CTASection = () => (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Join Our Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Whether you're a shipper looking for reliable capacity or a carrier
            seeking profitable loads, ShipOrbit is here to help you succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full hover:bg-blue-50 transition-all transform hover:scale-105 flex items-center justify-center group cursor-pointer">
              Start Shipping
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white hover:text-blue-600 transition-all cursor-pointer">
              Join as Carrier
            </button>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <Layout>
      <HeroSection />
      <MissionSection />
      <StorySection />
      <StatsSection />
      <TeamSection />
      <CultureSection />
      <LocationsSection />
      <CTASection />
    </Layout>
  );
};

export default AboutPage;

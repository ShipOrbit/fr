import { useState } from "react";
import {
  ArrowRight,
  Book,
  Clock,
  FileText,
  Headphones,
  HelpCircle,
  Mail,
  MessageCircle,
  Phone,
  Search,
  Users,
  Video,
} from "lucide-react";
import Layout from "../../components/layout";

const SupportLanding = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const HeroSection = () => (
    <section className="min-h-screen flex items-center bg-gradient-to-br from-indigo-50 to-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            We're Here to
            <span className="text-indigo-600"> Help</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
            Get the support you need, when you need it. Our expert team is
            available 24/7 to help you succeed with ShipOrbit.
          </p>

          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for help articles, guides, or FAQs..."
                className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-gray-200 focus:border-indigo-500 focus:outline-none text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
              <MessageCircle className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Live Chat
              </h3>
              <p className="text-gray-600 mb-4">
                Chat with our support team instantly
              </p>
              <button className="text-indigo-600 hover:text-indigo-700 font-medium">
                Start Chat →
              </button>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
              <Phone className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Phone Support
              </h3>
              <p className="text-gray-600 mb-4">Call us at 1-800-SHIP-NOW</p>
              <button className="text-green-600 hover:text-green-700 font-medium">
                Call Now →
              </button>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
              <Mail className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Email Support
              </h3>
              <p className="text-gray-600 mb-4">Get detailed help via email</p>
              <button className="text-purple-600 hover:text-purple-700 font-medium">
                Send Email →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const SupportOptionsSection = () => (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Multiple Ways to Get Support
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the support method that works best for you. We're available
            around the clock to help you succeed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-8 rounded-2xl">
            <div className="flex items-center mb-6">
              <Clock className="h-8 w-8 text-indigo-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900">
                24/7 Availability
              </h3>
            </div>
            <p className="text-gray-600 mb-6">
              Our support team is available around the clock to help you with
              any issues or questions you may have.
            </p>
            <img
              src="https://images.unsplash.com/photo-1553775282-20af80779df7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="24/7 support team"
              className="w-full h-48 object-cover rounded-xl"
            />
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl">
            <div className="flex items-center mb-6">
              <Users className="h-8 w-8 text-green-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900">Expert Team</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Our certified logistics experts understand your business and can
              provide tailored solutions to your challenges.
            </p>
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Expert support team"
              className="w-full h-48 object-cover rounded-xl"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
            <Video className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Video Tutorials
            </h3>
            <p className="text-gray-600 mb-4">
              Step-by-step video guides to help you master ShipOrbit
            </p>
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              Watch Now →
            </button>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl">
            <Book className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Knowledge Base
            </h3>
            <p className="text-gray-600 mb-4">
              Comprehensive documentation and guides
            </p>
            <button className="text-purple-600 hover:text-purple-700 font-medium">
              Browse Articles →
            </button>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl">
            <Headphones className="h-12 w-12 text-orange-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Training Sessions
            </h3>
            <p className="text-gray-600 mb-4">
              Personalized training for your team
            </p>
            <button className="text-orange-600 hover:text-orange-700 font-medium">
              Schedule Training →
            </button>
          </div>
        </div>
      </div>
    </section>
  );

  const FAQSection = () => (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Find quick answers to common questions about ShipOrbit
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <div className="flex items-start mb-4">
              <HelpCircle className="h-6 w-6 text-indigo-600 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  How do I get started with ShipOrbit?
                </h3>
                <p className="text-gray-600">
                  Simply sign up for an account, complete the verification
                  process, and start booking loads or finding carriers
                  immediately.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <div className="flex items-start mb-4">
              <HelpCircle className="h-6 w-6 text-indigo-600 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  What are the payment terms?
                </h3>
                <p className="text-gray-600">
                  We offer flexible payment options including QuickPay (24-48
                  hours) and standard terms (30 days) depending on your
                  preference.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <div className="flex items-start mb-4">
              <HelpCircle className="h-6 w-6 text-indigo-600 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Is there a mobile app available?
                </h3>
                <p className="text-gray-600">
                  Yes! Our mobile app is available for both iOS and Android,
                  allowing you to manage your shipments on the go.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <div className="flex items-start mb-4">
              <HelpCircle className="h-6 w-6 text-indigo-600 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  How does cargo insurance work?
                </h3>
                <p className="text-gray-600">
                  All shipments are automatically covered by our comprehensive
                  cargo insurance policy. Additional coverage options are
                  available.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <button className="bg-indigo-600 text-white px-8 py-4 rounded-full hover:bg-indigo-700 transition-all transform hover:scale-105 flex items-center justify-center mx-auto group cursor-pointer">
            View All FAQs
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );

  const ResourcesSection = () => (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Self-Service Resources
          </h2>
          <p className="text-xl text-gray-600">
            Access helpful resources to solve common issues and learn best
            practices
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl hover:shadow-xl transition-shadow cursor-pointer">
            <FileText className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Getting Started Guide
            </h3>
            <p className="text-gray-600 mb-4">
              Complete guide to setting up your account and booking your first
              load
            </p>
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              Read Guide →
            </button>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl hover:shadow-xl transition-shadow cursor-pointer">
            <Book className="h-12 w-12 text-green-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              API Documentation
            </h3>
            <p className="text-gray-600 mb-4">
              Technical documentation for developers integrating with ShipOrbit
            </p>
            <button className="text-green-600 hover:text-green-700 font-medium">
              View Docs →
            </button>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl hover:shadow-xl transition-shadow cursor-pointer">
            <Video className="h-12 w-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Video Library
            </h3>
            <p className="text-gray-600 mb-4">
              Watch tutorials and learn advanced features of the platform
            </p>
            <button className="text-purple-600 hover:text-purple-700 font-medium">
              Watch Videos →
            </button>
          </div>
        </div>
      </div>
    </section>
  );

  const ContactSection = () => (
    <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Still need help?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Our support team is standing by to help you succeed. Get in touch
            and we'll resolve your issue quickly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-indigo-600 px-8 py-4 rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 flex items-center justify-center group cursor-pointer">
              Contact Support
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white hover:text-indigo-600 transition-all cursor-pointer">
              Schedule Call
            </button>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <Layout>
      <HeroSection />
      <SupportOptionsSection />
      <FAQSection />
      <ResourcesSection />
      <ContactSection />
    </Layout>
  );
};

export default SupportLanding;

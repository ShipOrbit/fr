import Layout from "./layout";

export default function SignUpFormStep1() {
  return (
    <Layout>
      {/* Main Content */}
      <div className="min-h-screen flex items-center flex-1 max-w-7xl mx-auto">
        {/* Left Column - Form */}
        <div className="w-full lg:w-1/2 px-8 py-12">
          <h2 className="text-2xl font-bold mb-6">Help keep each other safe</h2>
          <form className="space-y-4">
            <div className="flex gap-4">
              <div className="w-1/2">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="firstName"
                >
                  First name
                </label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="First name"
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="w-1/2">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="lastName"
                >
                  Surname
                </label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Last name"
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="companyName"
              >
                Company name
              </label>
              <input
                type="text"
                id="companyName"
                placeholder="Company name"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Work email address
              </label>
              <input
                type="email"
                id="email"
                placeholder="name@company.com"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="phone">
                Phone number
              </label>
              <input
                type="tel"
                id="phone"
                placeholder="+1"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="country"
              >
                Primarily ships within
              </label>
              <select
                id="country"
                className="w-full border border-gray-300 rounded-md p-2"
              >
                <option value="US" selected>
                  United States
                </option>
              </select>
            </div>

            <div className="text-xs text-gray-500 space-y-2 mt-4">
              <p>
                We currently focus on shipments within the continental United
                States.
              </p>
              <p>
                This site is protected by reCAPTCHA and the Google{" "}
                <a href="#" className="text-blue-600 underline">
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-600 underline">
                  Terms of Service
                </a>{" "}
                apply.
              </p>
              <p>
                By clicking Submit, you confirm that you have read and agreed to{" "}
                <a href="#" className="text-blue-600 underline">
                  IGS Trans Inc’s General Terms and Conditions and Privacy
                  Policy
                </a>
                .
              </p>
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-slate-600 text-white font-medium py-2 px-4 rounded-md hover:bg-slate-700"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>

        {/* Right Column - Image and Info */}
        <div className="hidden lg:flex w-1/2 bg-indigo-50 items-center justify-center px-10">
          <div className="space-y-10">
            <img
              src="/"
              alt="Shipping Visual"
              className="rounded-lg shadow-lg object-cover"
            />
            <div className="space-y-4">
              <p className="text-sm text-gray-600">We offer</p>
              <h3 className="text-xl font-bold text-slate-800">
                Easy and reliable shipping.
              </h3>
              <div className="grid grid-cols-3 gap-4 text-sm text-slate-700">
                <div>
                  <span className="font-bold text-sm text-slate-800">01.</span>
                  <p>Business at a glance</p>
                </div>
                <div>
                  <span className="font-bold text-sm text-slate-800">02.</span>
                  <p>Pick your price</p>
                </div>
                <div>
                  <span className="font-bold text-sm text-slate-800">03.</span>
                  <p>Ship your way 24/7</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Book, track, and manage loads online 24/7. We’re always here if
                there are any bumps along the way.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

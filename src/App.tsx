import { createBrowserRouter, RouterProvider } from "react-router";
import SignIn from "./components/signin";
import { AuthProvider } from "./providers/auth";
import HomePage from "./pages";
import SignUpStep1 from "./components/sign-up-1";
import SignUpStep2 from "./components/sign-up-2";
import SignUpStep3 from "./components/sign-up-3";
import ShipperDashboard from "./pages/shippers/dashboard";
import ShippersLanding from "./pages/shippers";
import CarriersLanding from "./pages/carriers";
import SupportLanding from "./pages/support";
import AboutPage from "./pages/about";
import ShipmentDetails from "./pages/shippers/shipment-details";
import SelectDatePage from "./pages/shippers/create-shipment/select-shipment-dates";
import CreateShipmentAppointment from "./pages/shippers/create-shipment/create-shipment-appointment";
import ShipmentFinalizing from "./pages/shippers/create-shipment/create-shipment-3";
import VerifyEmail from "./pages/verify-email";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUpStep1 />,
  },
  {
    path: "/sign-up-2",
    element: <SignUpStep2 />,
  },
  {
    path: "/sign-up-3",
    element: <SignUpStep3 />,
  },
  {
    path: "/verify-email/:token",
    element: <VerifyEmail />,
  },
  {
    path: "/dashboard",
    element: <ShipperDashboard />,
  },
  {
    path: "/shipment-details",
    element: <ShipmentDetails />,
  },
  {
    path: "/create-shipment",
    element: <SelectDatePage />,
  },
  {
    path: "/shipment-appointment",
    element: <CreateShipmentAppointment />,
  },
  {
    path: "/shipment-finalizing",
    element: <ShipmentFinalizing />,
  },
  {
    path: "/shippers",
    element: <ShippersLanding />,
  },
  {
    path: "/carriers",
    element: <CarriersLanding />,
  },
  {
    path: "/support",
    element: <SupportLanding />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
]);
function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;

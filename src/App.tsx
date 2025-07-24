import { createBrowserRouter, RouterProvider } from "react-router";
import SignIn from "./components/signin";
import HomePage from "./pages";
import AboutPage from "./pages/about";
import ShipmentFinalizing from "./pages/shippers/create-shipment/shipment-finalizing";
import CreateShipmentAppointment from "./pages/shippers/create-shipment/create-shipment-appointment";
import SelectDatePage from "./pages/shippers/create-shipment/select-shipment-dates";
import ShipperDashboard from "./pages/shippers/dashboard";
import ShipmentDetails from "./pages/shippers/shipment-details";
import SignUpStep1 from "./pages/shippers/sign-up";
import SignUpStep3 from "./pages/shippers/sign-up/email-verification";
import SignUpStep2 from "./pages/shippers/sign-up/shipping-needs";
import SupportLanding from "./pages/support";
import VerifyEmail from "./pages/verify-email";
import { AuthProvider } from "./providers/auth";
import ResetPassword from "./pages/reset-password";
import ConfirmResetPassword from "./pages/reset-password/confirm";
import BillingPage from "./pages/shippers/billing";
import NotYetPage from "./pages/not-yet";
import CheckoutPage from "./pages/checkout";

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
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/reset-password/:token",
    element: <ConfirmResetPassword />,
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
    path: "/shipments/:id",
    element: <ShipmentDetails />,
  },
  {
    path: "/create-shipment",
    element: <SelectDatePage />,
  },
  {
    path: "/shipments/:id/appointment",
    element: <CreateShipmentAppointment />,
  },
  {
    path: "/shipments/:id/finalizing",
    element: <ShipmentFinalizing />,
  },
  {
    path: "/billing",
    element: <BillingPage />,
  },
  {
    path: "/shipments/:id/checkout",
    element: <CheckoutPage />,
  },
  {
    path: "/support",
    element: <SupportLanding />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/*",
    element: <NotYetPage />,
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

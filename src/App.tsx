import { createBrowserRouter, RouterProvider } from "react-router";
import SignIn from "./components/signin";
import HomePage from "./pages";
import BillingPage from "./pages/billing";
import CheckoutPage from "./pages/checkout";
import CreateShipmentAppointment from "./pages/create-shipment/create-shipment-appointment";
import SelectDatePage from "./pages/create-shipment/select-shipment-dates";
import ShipmentFinalizing from "./pages/create-shipment/shipment-finalizing";
import ShipperDashboard from "./pages/dashboard/dashboard";
import NotYetPage from "./pages/not-yet";
import ResetPassword from "./pages/reset-password";
import ConfirmResetPassword from "./pages/reset-password/confirm";
import ShipmentDetails from "./pages/shipment-details";
import SignUpStep1 from "./pages/sign-up";
import SignUpStep3 from "./pages/sign-up/email-verification";
import SignUpStep2 from "./pages/sign-up/shipping-needs";
import VerifyEmail from "./pages/verify-email";
import { AuthProvider } from "./providers/auth";

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

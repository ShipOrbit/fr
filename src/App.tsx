import { createBrowserRouter, RouterProvider } from "react-router";
import SignIn from "./components/signin";
import { AuthProvider } from "./providers/auth";
import HomePage from "./pages/home";
import SignUpFormStep1 from "./components/signup";

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
    path: "/signup",
    element: <SignUpFormStep1 />,
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

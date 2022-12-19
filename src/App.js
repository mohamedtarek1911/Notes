import "./App.css";
import Register from "./Components/Register";
import Login from "./Components/Login";
import {
  createBrowserRouter,
  RouterProvider,
  createHashRouter,
} from "react-router-dom";
import MainLAyout from "./Components/MainLAyout";
import Home from "./Components/Home";
import Particles from "./Components/Particles";
import ParticlesComponent from "./Components/Particles";

function App() {
  const routers = createHashRouter([
    {
      path: "/",
      element: <MainLAyout />,
      children: [
        { index: true, element: <Login /> },
        { path: "home", element: <Home /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={routers} />
      <ParticlesComponent />
    </>
  );
}

export default App;

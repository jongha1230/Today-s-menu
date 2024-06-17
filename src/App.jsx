import { RouterProvider } from "react-router-dom";
import router from "./routers/router";
import { Homepage } from "./components/pages/MainPage/Homepage";

function App() {
  return <RouterProvider router={router} />;
}

export default App;

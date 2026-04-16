import { RouterProvider } from "react-router";
import router from "./routes/user.route";
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

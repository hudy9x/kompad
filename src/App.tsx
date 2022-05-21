import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
import Checking from "./containers/Checking";
import Pad from "./containers/Pad";
import Signin from "./containers/Signin";
import Signout from "./containers/Signout";
import Signup from "./containers/Signup";
import { AuthenProvider } from "./providers/Authenticator";

function App() {
  return (
    <div className="App">
      <AuthenProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Checking />} />
            <Route path="signin" element={<Signin />} />
            <Route path="signout" element={<Signout />} />
            <Route path="signup" element={<Signup />} />
            <Route
              path="pad/:id"
              element={
                <PrivateRoute>
                  <Pad />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </AuthenProvider>
    </div>
  );
}

export default App;

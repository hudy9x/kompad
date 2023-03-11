import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LayoutClear from "./components/Layout/LayoutClear";
import { PadLockModal } from "./components/PadEditor/PadLockModal";
// import LayoutSetting from "./components/Layout/LayoutSetting";
import PrivateRoute from "./components/PrivateRoute";
import FileManager from "./containers/AdvancedSettings/FileManager";
// import Profile from "./containers/AdvancedSettings/Profile";
import Checking from "./containers/Checking";
import EmailVerification from "./containers/EmailVerification";
import ForgotPassword from "./containers/ForgotPassword";
// import NotFound from "./containers/NotFound";
import Pad from "./containers/Pad";
import PadContent from "./containers/Pads/PadContent";
import PadEmpty from "./containers/Pads/PadEmpty";
import Signin from "./containers/Signin";
import Signout from "./containers/Signout";
import Signup from "./containers/Signup";
import ThemeColor from "./containers/Theme";
import ThemeSetting from "./containers/Theme/ThemeSetting";
import { isDesktopApp } from "./libs/utils";
import AppMiddleware from "./providers/AppMiddleware";
import { AuthenProvider } from "./providers/Authenticator";

const lz = React.lazy;

const LayoutSetting = lz(() => import("./components/Layout/LayoutSetting"));
const Profile = lz(() => import("./containers/AdvancedSettings/Profile"));
const Password = lz(() => import("./containers/AdvancedSettings/Password"));
const Plan = lz(() => import("./containers/AdvancedSettings/Plan"));
const NotFound = lz(() => import("./containers/NotFound"));

function App() {
  const isWebversion = !isDesktopApp();

  return (
    <div className={`App ${isWebversion ? "is-web-app" : ""}`}>
      <AuthenProvider>
        <ThemeSetting>
          <Routes>
            <Route path="/" element={<LayoutClear />}>
              <Route index element={<Checking />} />
              <Route path="signin" element={<Signin />} />
              <Route path="signout" element={<Signout />} />
              <Route path="signup" element={<Signup />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="email-verification" element={<EmailVerification />} />
            </Route>
            <AppMiddleware>
              <Route path="/app" element={<Layout />}>
                <Route
                  path="pad"
                  element={
                    <PrivateRoute>
                      <Pad />
                    </PrivateRoute>
                  }
                >
                  <Route index element={<PadEmpty />}></Route>
                  <Route path="lock/:id" element={<PadLockModal />}></Route>
                  <Route path=":id" element={<PadContent />}></Route>
                </Route>
              </Route>
            </AppMiddleware>
            <Route
              path="setting"
              element={
                <PrivateRoute>
                  <React.Suspense fallback={<>...</>}>
                    <LayoutSetting />
                  </React.Suspense>
                </PrivateRoute>
              }
            >
              {/* <Route index element={<PadEmpty />}></Route> */}
              <Route path="profile" element={<Profile />}></Route>
              <Route path="password" element={<Password />}></Route>
              <Route path="plan" element={<Plan />}></Route>
              <Route path="theme" element={<ThemeColor />}></Route>
              <Route path="file-manager" element={<FileManager />}></Route>
              <Route path="*" element={<NotFound />}></Route>
            </Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </ThemeSetting>
      </AuthenProvider>
    </div>
  );
}

export default App;

import React, { useState, useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthenticationContext, UserRoleContext } from "./context/UserContext";
import isAuth from "./api/isAuth";
import getUserRole from "./api/getUserRole";
import "./App.css";

const Header = lazy(() => import("./components/Pages/Header"));
const Home = lazy(() => import("./components/Pages/Home"));
const Login = lazy(() => import("./components/Pages/Login"));
const NotFound = lazy(() => import("./components/Pages/NotFound"));
const RegisterForm = lazy(() => import("./components/Pages/Register"));
const Loading = import("./components/Elements/Loading/Loading");
// Patients routes
const ViewDoctors = lazy(() =>
  import("./components/Elements/viewUsers/viewDoctors/ViewDoctors")
);
const RequestChat = lazy(() =>
  import("./components/Elements/RequestChat/RequestChat")
);

// Doctor routes
const ViewPatients = lazy(() =>
  import("./components/Elements/viewUsers/viewPatients/ViewPatients")
);
const Profile = lazy(() => import("./components/Pages/UserProfile"));
// Admin routes
const AddDoctorForm = lazy(() =>
  import("./components/Elements/RegisterForm/components/AddDoctorForm")
);
const App = () => {
  const [isAuthenticate, setIsAuthenticate] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const isUserAuth = async () => {
      try {
        const { data } = await isAuth();
        setIsAuthenticate(data);
      } catch (err) {
        console.log(err);
      }
    };

    isUserAuth();
  }, []);

  useEffect(() => {
    const fetchUserRole = async () => {
      const { data } = await getUserRole();
      setUserRole(data);
    };

    if (isAuthenticate) {
      fetchUserRole();
    }
  }, [isAuthenticate]);

  const renderAdminRoutes = () => {
    return (
      <React.Fragment>
        <Route path="/adddoctor" component={AddDoctorForm} />
        <Route path="/viewdoctors" component={ViewDoctors} />
        <Route path="/viewpatients" component={ViewPatients} />
      </React.Fragment>
    );
  };

  return (
    <UserRoleContext.Provider value={{ userRole, setUserRole }}>
      <AuthenticationContext.Provider
        value={{ isAuthenticate, setIsAuthenticate }}
      >
        <Suspense fallback={() => Loading}>
          <Router>
            <Route path="/" component={Header} />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={RegisterForm} />
              {/* admin routes */}
              {userRole === "admin" && isAuthenticate
                ? renderAdminRoutes()
                : null}
              {/* patients routes  */}
              {userRole === "patient" && isAuthenticate && (
                <React.Fragment>
                  <Route path="/viewdoctors" component={ViewDoctors} />
                  <Route path="/chat" component={RequestChat} />
                  <Route path="/profile" component={Profile} />
                </React.Fragment>
              )}
              {userRole === "doctor" && isAuthenticate && (
                <React.Fragment>
                  <Route path="/viewpatients" component={ViewPatients} />
                  <Route path="/chat" component={RequestChat} />
                  <Route path="/profile" component={Profile} />
                </React.Fragment>
              )}
              <Route path="*" component={NotFound} />
            </Switch>
          </Router>
        </Suspense>
      </AuthenticationContext.Provider>
    </UserRoleContext.Provider>
  );
};

export default App;

import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
  useSelector,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./components/redux/store";
import LoginForm from "./components/LoginForm";
import DietianForm from "./components/DietianForm";
import ViewDietPlan from "./components/ViewDietPlan";
import StepperC from "./components/Stepper";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import HrActionPage from './components/HrActionPage';
import { getUserDetails } from "./services/dietService";
import { updateLoginResponse } from "./components/redux/reducer";

// const mapStateToProps = (state) => {
//   return {
//     loginResponse: state.loginResponse,
//   };
// };

const ProtectedRoute = ({ store, redirectPath, children }) => {
  const loginResponse = store.getState().loginResponse;
  const token = localStorage.getItem('token');
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));
  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }

  getUserDetails().then(response => {
    store.dispatch(
      updateLoginResponse({
        isLoggedIn: true,
        responseObj: {
          ...response.user,
          ...userDetails,
          employeeList: response?.employeeList || [],
          recommendedPlan: response?.user?.recommendedPlan || {},
          dietLink: response?.user?.link || "",
        },
        token,
      })
    );
  });
  return children ? children : <Outlet />;
};

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/dietian-form/:empId" element={<DietianForm />} />
            <Route path="/view-plan/:empId" element={<ViewDietPlan />} />
            {/* <Route path="/home" element={<Home />} /> */}
            <Route
              path="/user-dashboard"
              element={
                <ProtectedRoute store={store} redirectPath="/">
                  <StepperC />
                </ProtectedRoute>
              }
            />
            <Route path="/home" element={
            <ProtectedRoute store={store} redirectPath="/">
              <Home />
            </ProtectedRoute>
          }/>
          <Route path="/hr-page" element={
            <ProtectedRoute store={store} redirectPath="/">
              <HrActionPage />
            </ProtectedRoute>
          }/>
            {/* <Route path="*" element={<p>There's nothing here: 404!</p>} /> */}
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;

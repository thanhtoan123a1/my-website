import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

// styles for this kit
import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss?v=1.4.0";
import "assets/demo/demo.css?v=1.4.0";
import "assets/demo/nucleo-icons-page-styles.css?v=1.4.0";
// pages for this kit
import Index from "views/Index.js";
import NucleoIcons from "views/NucleoIcons.js";
import LandingPage from "views/examples/LandingPage.js";
import ProfilePage from "views/profile/ProfilePage.js";
import LoginPage from "views/login/LoginPage.js";

import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/i18n.js';
import Courses from "views/courses/index.js";
import NotFound from "views/notFound/index.js";
import Vlogs from "views/vlogs/index.js";
import configureStore from "redux/store/index.js";
import DarkFooter from "components/Footers/DarkFooter.js";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Slug from "views/courses/slug.js";
import { AuthProvider } from "components/contexts/AuthContext.js";
import PrivateRoute from "components/PrivateRoute.js";

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <Provider store={configureStore()}>
      <AuthProvider>
        <BrowserRouter>
          <IndexNavbar />
          <Switch>
            <Switch>
              <Route path="/top" render={(props) => <Index {...props} />} />
              <Route
                path="/nucleo-icons"
                render={(props) => <NucleoIcons {...props} />}
              />
              <Route
                path="/landing-page"
                render={(props) => <LandingPage {...props} />}
              />
              <PrivateRoute
                exact
                path="/profile-page"
                component={ProfilePage}
              />
              <Route
                path="/login-page"
                render={(props) => <LoginPage {...props} />}
              />
              <PrivateRoute
                exact
                path="/courses"
                component={Courses}
              />
              <Route
                path="/vlogs"
                render={(props) => <Vlogs {...props} />}
              />
              <Route
                path="/not-found"
                render={(props) => <NotFound {...props} />}
              />
              <PrivateRoute
                exact
                path="/courses/:slug"
                component={Slug}
              />
              <Redirect to="/top" />
              <Redirect from="/" to="/top" />
            </Switch>
          </Switch>
          <DarkFooter />
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  </I18nextProvider>,
  document.getElementById("root")
);

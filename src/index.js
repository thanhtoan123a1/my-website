import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

// styles for this kit
import 'assets/css/bootstrap.min.css';
import 'assets/scss/now-ui-kit.scss?v=1.4.0';
import 'assets/demo/demo.css?v=1.4.0';
import 'assets/demo/nucleo-icons-page-styles.css?v=1.4.0';
// pages for this kit
import Index from 'views/Index.js';
import ProfilePage from 'views/profile/ProfilePage.js';
import LoginPage from 'views/login/LoginPage.js';

import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/i18n.js';
import Courses from 'views/courses/index.js';
import NotFound from 'views/notFound/index.js';
import Entertainment from 'views/entertainment/index.js';
import configureStore from 'redux/store/index.js';
import DarkFooter from 'components/Footers/DarkFooter.js';
import Header from 'components/Navbars/Header.js';
import Slug from 'views/courses/slug.js';
import { AuthProvider } from 'components/contexts/AuthContext.js';
import PrivateRoute from 'components/PrivateRoute.js';
import Home from 'views/home/index.js';
import Head from 'components/HeadTag/index.js';

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <Provider store={configureStore()}>
      <AuthProvider>
        <BrowserRouter>
          <Head
            title="Toan Tran Van Thanh"
            description="Nơi học tập và chia sẻ"
            ogUrl={window.location.href}
            ogImageUrl={require('assets/img/favicon.png')}
          />
          <Header />
          <Switch>
            <Switch>
              <Route path="/top" render={(props) => <Index {...props} />} />
              <PrivateRoute
                exact
                path="/profile-page"
                component={ProfilePage}
              />
              <Route
                path="/login-page"
                render={(props) => <LoginPage {...props} />}
              />
              <Route
                path="/entertainment"
                render={(props) => <Entertainment {...props} />}
              />
              <Route
                path="/not-found"
                render={(props) => <NotFound {...props} />}
              />
              <Route
                exact
                path="/courses/:slug"
                render={(props) => <Slug {...props} />}
              />
              <Route
                exact
                path="/courses"
                render={(props) => <Courses {...props} />}
              />
              <PrivateRoute exact path="/home" component={Home} />
              <Redirect to="/top" />
              <Redirect from="/" to="/top" />
            </Switch>
          </Switch>
          <DarkFooter />
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  </I18nextProvider>,
  document.getElementById('root')
);

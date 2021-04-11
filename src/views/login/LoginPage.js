import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { authActions } from 'redux/modules/auth';
import { useTranslation } from "react-i18next";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
} from "reactstrap";

// core components
import { Redirect } from "react-router";
import { FACEBOOK_HOME_PAGE } from "help/constants";

function LoginPage(props) {
  const [firstFocus, setFirstFocus] = useState(false);
  const [lastFocus, setLastFocus] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { t } = useTranslation();

  useEffect(() => {
    document.body.classList.add("login-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("login-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);

  function login() {
    const { dispatch } = props;
    dispatch(authActions.loginEmail({ email, password }));
  }

  if (props.isLogin) {
    return <Redirect to="/" />;
  }

  return (
    <div className="page-header clear-filter" filter-color="blue">
      <div
        className="page-header-image"
        style={{
          backgroundImage: "url(https://picsum.photos/2000/1171",
        }}
      ></div>
      <div className="content">
        <Container>
          <div className="login-page-title">
            {t('loginPageTitle')}
          </div>
          <Col className="ml-auto mr-auto" md="4">
            <Card className="card-login card-plain">
              <Form action="" className="form" method="">
                <CardBody>
                  <InputGroup
                    className={
                      "no-border input-lg" +
                      (firstFocus ? " input-group-focus" : "")
                    }
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="now-ui-icons ui-1_email-85"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder={t('email')}
                      type="text"
                      onFocus={() => setFirstFocus(true)}
                      onBlur={() => setFirstFocus(false)}
                      onChange={(e) => { setEmail(e.target.value) }}
                    ></Input>
                  </InputGroup>
                  <InputGroup
                    className={
                      "no-border input-lg" +
                      (lastFocus ? " input-group-focus" : "")
                    }
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="now-ui-icons ui-1_lock-circle-open"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder={t('password')}
                      type="password"
                      onFocus={() => setLastFocus(true)}
                      onBlur={() => setLastFocus(false)}
                      onChange={(e) => { setPassword(e.target.value) }}
                    ></Input>
                  </InputGroup>
                </CardBody>
                <CardFooter className="text-center">
                  <Button
                    block
                    className="btn-round"
                    color="info"
                    onClick={(e) => {
                      login();
                    }}
                    size="lg"
                  >
                    {t('login')}
                  </Button>
                  <div className="pull-left">
                    <h6>
                      <a
                        href="# "
                        className="link"
                        onClick={(e) => {
                          window.alert(t('featureInDevelop'));
                        }}
                      >
                        {t('createAccount')}
                      </a>
                    </h6>
                  </div>
                  <div className="pull-right">
                    <h6>
                      <a
                        className="link"
                        href="# "
                        onClick={(e) => {
                          window.open(FACEBOOK_HOME_PAGE, '_blank');
                        }}
                      >
                        {t('needHelp')}
                      </a>
                    </h6>
                  </div>
                </CardFooter>
              </Form>
            </Card>
          </Col>
        </Container>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  isLogin: state.auth.isLogin,
  isChecking: state.auth.isChecking,
  errorMessage: state.auth.error,
});

export default connect(mapStateToProps)(LoginPage);

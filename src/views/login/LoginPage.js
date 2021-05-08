import React, { useState } from "react";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { useAuth } from "components/contexts/AuthContext";

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

const LOGIN = "LOGIN";
const SIGNUP = "SIGNUP";
const RESET = "RESET";

function LoginPage() {
  const [firstFocus, setFirstFocus] = useState(false);
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    signup,
    login,
    currentUser,
    resetPassword,
    loginFacebook,
    loginGoogle,
  } = useAuth();
  const [page, setPage] = useState(LOGIN);

  const { t } = useTranslation();

  function switchPage(newPage) {
    setPage(newPage);
  }

  React.useEffect(() => {
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

  function handleClicks() {
    if (page === LOGIN) {
      handleLogin();
    } else if (page === SIGNUP) {
      handleSignup();
    } else {
      handleResetPassword();
    }
  }

  async function handleLoginFacebook() {
    try {
      setError("");
      await loginFacebook();
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  }

  async function handleLoginGoogle() {
    try {
      setError("");
      await loginGoogle();
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  }

  async function handleSignup() {
    if (password === confirmPassword) {
      if (!userName) {
        setError(t("userNameNotEmpty"));
      } else {
        setLoading(true);
        try {
          setError("");
          await signup(email, password, userName);
          setLoading(false);
        } catch (err) {
          setLoading(false);
          setError(err.message);
        }
      }
    } else {
      setError(t("passwordDoNotMatch"));
    }
  }

  async function handleLogin() {
    setLoading(true);
    try {
      setError("");
      await login(email, password);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  }

  async function handleResetPassword() {
    setLoading(true);
    try {
      setError("");
      await resetPassword(email);
      setLoading(false);
      setError(t("resetPasswordInstructions"));
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  }

  if (currentUser && currentUser.email) {
    return <Redirect to="/top" />;
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
          <div className="login-page-title">{t("loginPageTitle")}</div>
          <Col className="ml-auto mr-auto" md="4">
            <Card className="card-login card-plain">
              <Form action="" className="form" method="">
                <CardBody>
                  {page === SIGNUP && (
                    <InputGroup className={"no-border input-lg"}>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons ui-1_lock-circle-open"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder={t("displayName")}
                        type="text"
                        onChange={(e) => {
                          setUserName(e.target.value);
                        }}
                      ></Input>
                    </InputGroup>
                  )}
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
                      placeholder={t("email")}
                      type="text"
                      onFocus={() => setFirstFocus(true)}
                      onBlur={() => setFirstFocus(false)}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    ></Input>
                  </InputGroup>
                  {page !== RESET && (
                    <InputGroup className={"no-border input-lg"}>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons ui-1_lock-circle-open"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder={t("password")}
                        type="password"
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      ></Input>
                    </InputGroup>
                  )}
                  {page === SIGNUP && (
                    <InputGroup className={"no-border input-lg"}>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons ui-1_lock-circle-open"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder={t("confirmPassword")}
                        type="password"
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                        }}
                      ></Input>
                    </InputGroup>
                  )}
                  <div style={{ color: "red" }}>{error}</div>
                </CardBody>
                <CardFooter className="text-center">
                  <Button
                    block
                    className="btn-round"
                    color="success"
                    onClick={() => {
                      handleClicks();
                    }}
                    size="lg"
                  >
                    {loading
                      ? "Loading..."
                      : t(
                          page === LOGIN
                            ? "login"
                            : page === SIGNUP
                            ? "signUp"
                            : "resetPassword"
                        )}
                  </Button>
                  {page !== RESET && (
                    <>
                      <Button
                        block
                        // className="btn-round"
                        color="info"
                        onClick={(e) => {
                          handleLoginFacebook();
                        }}
                        size="lg"
                      >
                        {t("loginWithFacebook")}
                      </Button>
                      <Button
                        block
                        // className="btn-round"
                        color="danger"
                        onClick={(e) => {
                          handleLoginGoogle();
                        }}
                        size="lg"
                      >
                        {t("loginWithGoogle")}
                      </Button>
                    </>
                  )}
                  <div className="pull-left">
                    <h6>
                      <a
                        href="# "
                        className="link"
                        onClick={(e) => {
                          e.preventDefault();
                          switchPage(page === LOGIN ? SIGNUP : LOGIN);
                        }}
                      >
                        {t(page === LOGIN ? "createAccount" : "login")}
                      </a>
                    </h6>
                  </div>
                  <div className="pull-right">
                    <h6>
                      <a
                        className="link"
                        href="# "
                        onClick={(e) => {
                          e.preventDefault();
                          switchPage(RESET);
                        }}
                      >
                        {t("forgotPassword")}
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

const mapStateToProps = (state) => ({
  isLogin: state.auth.isLogin,
  isChecking: state.auth.isChecking,
  errorMessage: state.auth.error,
});

export default connect(mapStateToProps)(LoginPage);

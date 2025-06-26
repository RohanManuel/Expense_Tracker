// LoginPage.js
import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginAPI } from "../../utils/ApiRequest";
import "./login.css"; // Import the CSS file

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = values;

    if (!email || !password) {
      toast.error("Please fill all fields", toastOptions);
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post(loginAPI, {
        email,
        password,
      });

      if (data.success === true) {
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
        toast.success(data.message, toastOptions);
      } else {
        toast.error(data.message, toastOptions);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", toastOptions);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      <Container className="mt-5 login-form-container" style={{ position: "relative", zIndex: 2 }}>
        <Row className="justify-content-center">
          <Col md={8} lg={6} xl={5}>
            <div className="text-center mb-4">
              <AccountBalanceWalletIcon
                className="wallet-icon"
                sx={{ fontSize: 50, color: "white" }}
              />
              <h2 className="text-white mt-3">Expense Tracker</h2>
            </div>
            
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail" className="mb-4">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  value={values.password}
                  required
                />
              </Form.Group>

              <div className="d-flex justify-content-end mb-3">
                <Link to="/forgotPassword" className="lnk">
                  Forgot Password?
                </Link>
              </div>

              <Button
                variant="primary"
                type="submit"
                className="btnStyle w-100 py-3"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Signing In...
                  </>
                ) : (
                  "Login"
                )}
              </Button>

              <div className="text-center mt-4">
                <p className="text-muted">
                  Don't have an account?{" "}
                  <Link to="/register" className="lnk fw-bold">
                    Register
                  </Link>
                </p>
              </div>
            </Form>
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    </div>
  );
};

export default Login;
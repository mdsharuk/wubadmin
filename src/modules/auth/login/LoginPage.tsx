import { useEffect } from "react";
import { Button, Checkbox, Input } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import type { FormikHelpers } from "formik";
import * as Yup from "yup";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setCredentials } from "@/modules/auth/authSlice";
import { DEMO_ADMIN } from "@/app/constants";

interface LoginValues {
  email: string;
  password: string;
  remember: boolean;
}

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const initialValues: LoginValues = {
  email: DEMO_ADMIN.email,
  password: DEMO_ADMIN.password,
  remember: false,
};

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const from =
    (location.state as { from?: { pathname?: string } } | null)?.from
      ?.pathname || "/dashboard";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, from, navigate]);

  const handleSubmit = (
    values: LoginValues,
    { setErrors }: FormikHelpers<LoginValues>,
  ) => {
    if (
      values.email !== DEMO_ADMIN.email ||
      values.password !== DEMO_ADMIN.password
    ) {
      setErrors({
        password: "Invalid credentials. Use the demo account shown below.",
      });
      return;
    }

    dispatch(
      setCredentials({
        token: "demo-admin-token",
        user: {
          id: "1",
          name: DEMO_ADMIN.name,
          email: DEMO_ADMIN.email,
        },
      }),
    );
    navigate(from, { replace: true });
  };

  return (
    <>
      <div className="auth-head">
        <h1 className="auth-title">Sign In</h1>
        <p className="auth-subtitle">
          Welcome back! Log in with your credentials.
        </p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="auth-form">
            <div className="auth-field">
              <label htmlFor="email">Email</label>
              <Field
                id="email"
                name="email"
                type="email"
                as={Input}
                placeholder="admin@example.com"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="form-error"
              />
            </div>

            <div className="auth-field">
              <label htmlFor="password">Password</label>
              <Field
                id="password"
                name="password"
                type="password"
                as={Input.Password}
                placeholder="Enter password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="form-error"
              />
            </div>

            <div className="auth-form__options">
              <Field name="remember" as={Checkbox}>
                Remember me
              </Field>
              <Link to="/forgot-password" className="auth-form__forgot">
                Forgot Password?
              </Link>
            </div>

            <Button
              type="primary"
              htmlType="submit"
              block
              loading={isSubmitting}
              icon={<FiLogIn />}
              className="auth-submit"
            >
              Sign In
            </Button>
          </Form>
        )}
      </Formik>

      <p className="auth-signup">
        Don&apos;t have an account? <a href="#signup">Sign Up</a>
      </p>
    </>
  );
};

export default LoginPage;

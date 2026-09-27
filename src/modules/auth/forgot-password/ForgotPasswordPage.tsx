import { useState } from 'react';
import { Button, Input, Result } from 'antd';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { FiMail } from 'react-icons/fi';

interface ForgotPasswordValues {
  email: string;
}

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
});

const initialValues: ForgotPasswordValues = {
  email: '',
};

const ForgotPasswordPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (_values: ForgotPasswordValues) => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Result
        status="success"
        title="Check your email"
        subTitle="If an account exists for this email, a reset link has been sent."
        extra={
          <Button type="primary">
            <Link to="/login">Back to login</Link>
          </Button>
        }
      />
    );
  }

  return (
    <>
      <div className="auth-head">
        <h1 className="auth-title">Forgot password</h1>
        <p className="auth-subtitle">
          Enter your email and we&apos;ll send you a reset link.
        </p>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={forgotPasswordSchema}
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
                placeholder="Email"
                prefix={<FiMail />}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="form-error"
              />
            </div>

            <Button
              type="primary"
              htmlType="submit"
              block
              loading={isSubmitting}
              className="auth-submit"
            >
              Send reset link
            </Button>

            <Link to="/login" className="auth-form__forgot">
              Back to login
            </Link>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ForgotPasswordPage;

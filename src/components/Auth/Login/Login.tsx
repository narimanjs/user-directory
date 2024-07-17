import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "../../../redux/hooks";
import { loginUser } from "../../../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import styles from "../Auth.module.css";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async values => {
      dispatch(loginUser({ email: values.email, password: values.password }));
      navigate("/users");
    },
  });

  return (
    <div className={styles.container}>
      <form
        onSubmit={formik.handleSubmit}
        className={styles.form}
      >
        <h1>Вход</h1>
        <label htmlFor='email'>Электронная почта</label>
        <input
          id='email'
          name='email'
          type='email'
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className={styles.error}>{formik.errors.email}</div>
        ) : null}

        <label htmlFor='password'>Пароль</label>
        <input
          id='password'
          name='password'
          type='password'
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className={styles.error}>{formik.errors.password}</div>
        ) : null}

        <button
          type='submit'
          disabled={formik.isSubmitting}
        >
          Войти
        </button>
        <button
          type='button'
          onClick={() => navigate("/register")}
          className={styles.registerButton}
        >
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

export default Login;

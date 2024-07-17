import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "../../../redux/hooks";
import { registerUser } from "../../../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import styles from "../Auth.module.css";

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), ""], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: async values => {
      dispatch(
        registerUser({ email: values.email, password: values.password })
      );
      navigate("/users");
    },
  });

  return (
    <div className={styles.container}>
      <form
        onSubmit={formik.handleSubmit}
        className={styles.form}
      >
        <h1>Регистрация</h1>

        <label htmlFor='name'>Имя</label>
        <input
          id='name'
          name='name'
          type='text'
          onChange={formik.handleChange}
          value={formik.values.name}
          className={
            formik.touched.name && formik.errors.name ? styles.error : ""
          }
        />
        {formik.touched.name && formik.errors.name ? (
          <div className={styles.error}>{formik.errors.name}</div>
        ) : null}

        <label htmlFor='email'>Электронная почта</label>
        <input
          id='email'
          name='email'
          type='email'
          onChange={formik.handleChange}
          value={formik.values.email}
          className={
            formik.touched.email && formik.errors.email ? styles.error : ""
          }
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
          className={
            formik.touched.password && formik.errors.password
              ? styles.error
              : ""
          }
        />
        {formik.touched.password && formik.errors.password ? (
          <div className={styles.error}>{formik.errors.password}</div>
        ) : null}

        <label htmlFor='confirmPassword'>Подтвердите пароль</label>
        <input
          id='confirmPassword'
          name='confirmPassword'
          type='password'
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
          className={
            formik.touched.confirmPassword && formik.errors.confirmPassword
              ? styles.error
              : ""
          }
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div className={styles.error}>{formik.errors.confirmPassword}</div>
        ) : null}

        <button
          type='submit'
          disabled={formik.isSubmitting}
        >
          Зарегистрироваться
        </button>
        <button
          type='button'
          onClick={() => navigate("/login")}
          className={styles.registerButton}
        >
          Войти
        </button>
      </form>
    </div>
  );
};

export default Register;

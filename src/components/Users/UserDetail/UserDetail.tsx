import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { fetchUser } from "../../../redux/actions/userActions";
import styles from "./UserDetail.module.css";
import { User } from "../../../types";

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(state => state.users.user);
  const loading = useAppSelector(state => state.users.loading);
  const error = useAppSelector(state => state.users.error);

  useEffect(() => {
    if (id) {
      dispatch(fetchUser(Number(id)));
    }
  }, [dispatch, id]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleBack = () => {
    navigate("/users");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className={styles.errorMessage}>Error: {error}</div>;
  }

  if (!user) {
    return <div>No user found</div>;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button
          onClick={handleBack}
          className={styles.backButton}
        >
          Назад
        </button>
        <div className={styles.userDetails}>
          <img
            src={user.avatar}
            alt={`${user.first_name} ${user.last_name}`}
          />
          <h1 className={styles.name}>
            {user.first_name} {user.last_name}
          </h1>
        </div>
        <button
          onClick={handleLogout}
          className={styles.logoutButton}
        >
          Выход
        </button>
      </header>
      <div className={styles.details}>
        <div className={styles.description}>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone || "Not available"}</p>
          <p>{user.description || "Description not available"}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;

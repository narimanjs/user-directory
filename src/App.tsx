import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import UserList from "./components/Users/UserList/UserList";
import UserDetail from "./components/Users/UserDetail/UserDetail";
import PrivateRoute from "./components/Auth/PrivateRoute";
import store from "./redux/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route
            path='/login'
            element={<Login />}
          />
          <Route
            path='/register'
            element={<Register />}
          />
          <Route element={<PrivateRoute />}>
            <Route
              path='/users'
              element={<UserList />}
            />
            <Route
              path='/users/:id'
              element={<UserDetail />}
            />
          </Route>
          <Route
            path='/'
            element={<Navigate to='/users' />}
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

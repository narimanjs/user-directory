import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import UserList from "./components/Users/UserList/UserList";
import UserDetail from "./components/Users/UserDetail/UserDetail";
import { Provider } from "react-redux";
import store from "./redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route
            path='/login'
            element={<Login />}
          />
          <Route
            path='/register'
            element={<Register />}
          />
          <Route
            path='/users'
            element={<UserList />}
          />
          <Route
            path='/users/:id'
            element={<UserDetail />}
          />
          <Route
            path='/'
            element={<Navigate to='/login' />}
          />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;

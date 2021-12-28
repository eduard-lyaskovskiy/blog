import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { User } from "../api";

const LoginPage = () => {
  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });
  const auth = React.useContext(AuthContext);

  const handleChangeForm = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token, userId } = await User.login(form);
      if (token && userId) {
        auth.login(token, userId);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="login-page">
      Login form:
      <form onSubmit={onSubmit}>
        <label htmlFor="emailInput">Email:</label>
        <input
          id="emailInput"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChangeForm}
        />
        <label htmlFor="passwordInput">Password:</label>
        <input
          id="passwordInput"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChangeForm}
        />
        <input type="submit" value="Login" />
      </form>
      Register now: <Link to="/sign-up">Sign Up</Link>
    </div>
  );
};

export default LoginPage;

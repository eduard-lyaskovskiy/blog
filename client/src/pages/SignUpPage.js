import React from "react";
import { AuthContext } from "../context/AuthContext";
import { User } from "../api";

const SignUpPage = () => {
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
      const { token, userId } = await User.signup(form);
      if (token && userId) {
        auth.login(token, userId);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="register-page">
      Register form:
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
        <input type="submit" value="Register now" />
      </form>
    </div>
  );
};

export default SignUpPage;

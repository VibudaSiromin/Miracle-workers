import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import "./login.scss";

export default function Login() {
  const schema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup.string().min(8).max(15).required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function submitForm(data) {
    // e.preventDefault();
    const { email, password } = data;

    console.log(email, password);
    fetch("http://localhost:8000/login-user", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status == "ok") {
          alert("login successful");
          console.log("LLLLLL",data)
          window.localStorage.setItem("token", data.data);
          window.localStorage.setItem("loggedIn", true);

          window.location.href = "./dashboard";
        }
      });
  }

  return (
    <div className="row spacing-in-form">
      <div className="col-lg-4"></div>
      <div className="col-lg-4">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <form onSubmit={handleSubmit(submitForm)} id="login">
              <h3
                style={{
                  color: "white",
                  fontWeight: "bold",
                  paddingTop: "20px",
                  paddingBottom: "20px",
                }}
              >
                Login
              </h3>
              <div className="form-group">
                <p
                  style={{
                    textAlign: "left",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Username
                </p>
                <input
                  type="email"
                  name="email"
                  className="form-control custom-input-box"
                  {...register("email")}
                  autoComplete="off"
                />
                <small className="text-danger">{errors.email?.message}</small>
              </div>

              <div className="form-group">
                <p
                  style={{
                    textAlign: "left",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Password
                </p>
                <input
                  type="password"
                  name="password"
                  className="form-control custom-input-box"
                  {...register("password")}
                  autoComplete="off"
                />
                <small className="text-danger">
                  {errors.password?.message}
                </small>
                <Link to="/reset">
                  <p className="forget-password">Forgot Password?</p>
                </Link>
              </div>
              <button
                type="submit"
                className="btn btn-primary submit-button"
                form="login"
              >
                Login
              </button>

              <Link to="/sign-up">
                <p className="sign-up">Sign Up</p>
              </Link>
            </form>
          </div>
        </div>
      </div>
      <div className="col-lg-4"></div>
    </div>
  );
}

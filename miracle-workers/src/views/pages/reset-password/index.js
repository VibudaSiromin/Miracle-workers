import React, { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Swal from "sweetalert2";
import "./reset-password.scss";

const ResetPassword = () => {
  const [error, setError] = useState("");
  const [isLoading, iseIsLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email_address") ?? "";

  const schema = yup.object().shape({
    password: yup.string().min(8).max(15).required("Password is required"),
    confirm_password: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });

  const submitForm = (data) => {
    iseIsLoading(true);
    axios
      .post("http://localhost:8000/reset-password", {
        email: email,
        password: data.password,
      })
      .then(function (response) {
        iseIsLoading(false);
        Swal.fire({
          title: "Password changed successfully",
          icon: "success",
        }).then(() => {
          navigate(`/login`);
        });
      })
      .catch(function (error) {
        iseIsLoading(false);
        console.log(error);
        setError(error?.response?.data?.message);
      });
  };

  return (
    <div className="row" style={{ padding: "10% 6% 3%" }}>
      <div className="col-lg-4"></div>
      <div className="col-lg-4">
        <div className="auth-wrapper" style={{ padding: "10px" }}>
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
                Reset Password
              </h3>
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
              </div>

              <div className="form-group">
                <p
                  style={{
                    textAlign: "left",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Confirm Password
                </p>
                <input
                  type="password"
                  name="confirm_password"
                  className="form-control custom-input-box"
                  {...register("confirm_password")}
                  autoComplete="off"
                />
                <small className="text-danger">
                  {errors.confirm_password?.message}
                </small>
                <small className="text-danger">{error}</small>
              </div>

              {isLoading ? (
                <button
                  type="button"
                  className="btn btn-primary submit-button"
                  form="login"
                >
                  <CircularProgress size={20} />
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn btn-primary submit-button"
                  form="login"
                >
                  Reset
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
      <div className="col-lg-4"></div>
    </div>
  );
};

export default ResetPassword;

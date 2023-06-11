import React, { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Swal from "sweetalert2";
import "./reset.scss";

const Reset = () => {
  const navigate = useNavigate();
  const [commonError, setCommonError] = useState("");
  const [isLoading, setIsLading] = useState(false);

  const schema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = (data) => {
    setCommonError("");
    setIsLading(true);
    axios
      .post("http://localhost:8000/forgot-password", {
        email: data.email,
      })
      .then(function (response) {
        setIsLading(false);
        Swal.fire({
          title: "Verification OTP sent to the Email",
          icon: "success",
        }).then(() => {
          navigate(`/two-fa?email_address=${response.data.message}`);
        });
      })
      .catch(function (error) {
        console.log(error);
        setIsLading(false);
        setCommonError(error?.response?.data?.message);
      });
  };

  return (
    <div className="row spacing-in-form">
      <div className="col-lg-4"></div>
      <div className="col-lg-4">
        <form onSubmit={handleSubmit(submitForm)} id="reset">
          <h3 className="enter-email">Enter Email</h3>
          <div className="mb-3">
            <p className="email-address">Email address</p>
            <input
              type="email"
              name="email"
              className="form-control custom-input-box"
              {...register("email")}
              autoComplete="off"
            />
            <small className="text-danger">{errors.email?.message}</small>
            <small className="text-danger">{commonError}</small>
          </div>
          {isLoading ? (
            <button
              type="button"
              className="btn btn-primary submit-button"
              form="reset"
            >
              <CircularProgress size={20} />
            </button>
          ) : (
            <button
              type="submit"
              className="btn btn-primary submit-button"
              form="reset"
            >
              Send Email
            </button>
          )}
        </form>
      </div>
      <div className="col-lg-4"></div>
    </div>
  );
};

export default Reset;

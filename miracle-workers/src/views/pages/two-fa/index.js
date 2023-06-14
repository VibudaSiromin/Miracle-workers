import React, { useState } from "react";
import axios from "axios";
import PinInput from "react-pin-input";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import "./two-fa.scss";

const TwoFA = () => {
  const navigate = useNavigate();
  const [twoFAValue, setTwoFAValue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email_address") ?? "";

  const submitForm = () => {
    setError("");
    setIsLoading(true);
    if (!twoFAValue) {
      setError("Please provide the code !");
      return;
    }

    const data = {
      value: twoFAValue,
      email,
    };
    axios
      .post("http://localhost:8000/reset-code", {
        ...data,
      })
      .then(function (response) {
        setIsLoading(false);
        navigate(`/reset-password?email_address=${response.data.message}`);
      })
      .catch(function (error) {
        setIsLoading(false);
        setError(error?.response?.data?.message);
      });
  };

  const changeValues = (value) => {
    setTwoFAValue(value);
  };

  return (
    <div className="row" style={{ padding: "10% 6% 3%" }}>
      <div className="col-lg-4"></div>
      <div className="col-lg-4">
        <div className="auth-wrapper" style={{ padding: "10px" }}>
          <div className="auth-inner">
            <div className="form-group">
              <PinInput
                length={4}
                initialValue=""
                onChange={(value, index) => {
                  changeValues(value);
                }}
                type="numeric"
                inputMode="number"
                style={{ padding: "10px" }}
                inputStyle={{ borderColor: "#04D9FF", borderRadius: "10px" }}
                inputFocusStyle={{ borderColor: "#04D9FF" }}
                onComplete={(value, index) => {
                  changeValues(value);
                }}
                autoSelect={true}
                regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
              />
            </div>
            <div className="form-group">
              <span style={{ color: "red" }}>{error}</span>
            </div>
            {isLoading ? (
              <button type="button" className="btn btn-primary submit-button">
                <CircularProgress size={20} />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => submitForm()}
                className="btn btn-primary submit-button"
              >
                Enter
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="col-lg-4"></div>
    </div>
  );
};

export default TwoFA;

// import React, { Component, useState } from "react";
// import * as yup from "yup";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";

// export default function SignUp() {

//   // const [username, setUserName] = useState("");
//   // const [email, setEmail] = useState("");
//   // const [password, setPassword] = useState("");
//   // const [userType, setUserType] = useState("");
//   // const [secretKey, setSecretKey] = useState("");

//   const schema=yup.object().shape({
//     UserType:yup.string().required("User Type is required"),
//     username:yup.string().required("Username is required"),
//     email:yup.string().email().required("Email is required"),
//     password:yup.string().min(8).max(15).required("Password is required"),
//     confirmPassword:yup.string().oneOf([yup.ref("password"),null]),
//   });

//   const {register,handleSubmit,errors}=useForm({
//     resolver:yupResolver(schema),
//     defaultValues: {
//       UserType: "",
//       Secret_key: "",
//       username: "",
//       email: "",
//       password: "",
//       confirmPassword:""
//     },
//   });

//   const submitForm = (e) => {
//     if (userType == "Admin" && secretKey != "AdarshT") {
//       e.preventDefault();
//       alert("Invalid Admin");
//     } else {
//       e.preventDefault();

//       console.log(username, email, password);
//       fetch("http://localhost:8000/register", {
//         method: "POST",
//         crossDomain: true,
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//           "Access-Control-Allow-Origin": "*",
//         },
//         body: JSON.stringify({
//           username,
//           email,
//           password,
//           userType,
//         }),
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           console.log(data, "userRegister");
//           if (data.status == "ok") {
//             alert("Registration Successful");
//           } else {
//             alert("Something went wrong");
//           }
//         });
//     }
//   };

//   return (
//     <div className="auth-wrapper">
//       <div className="auth-inner">
//         <form onSubmit={handleSubmit(submitForm)}>
//           <h3>Sign Up</h3>
//           <div>
//             Register As
//             <input
//               type="radio"
//               name="UserType"
//               value="User"
//               // onChange={(e) => setUserType(e.target.value)}
//               {...register("UserType")}
//             />
//             User
//             <input
//               type="radio"
//               name="UserType"
//               value="Admin"
//               // onChange={(e) => setUserType(e.target.value)}
//               {...register("UserType")}
//             />
//             <small className="text-danger">{errors.UserType?.message}</small>

//             Admin
//           </div>
//           {userType == "Admin" ? (
//             <div className="mb-3">
//               <label>Secret Key</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 name="Secret_key"
//                 placeholder="Secret Key"
//                 // onChange={(e) => setSecretKey(e.target.value)}
//                 {...register("Secret_key")}
//               />
//               <small className="text-danger">{errors.Secret_key?.message}</small>
//             </div>

//           ) : null}

//           <div className="mb-3">
//             <label>Username</label>
//             <input
//               type="text"
//               name="username"
//               className="form-control"
//               placeholder="Enter the Username provided by company"
//               // onChange={(e) => setUserName(e.target.value)}
//               {...register("username")}
//             />
//               <small className="text-danger">{errors.username?.message}</small>
//           </div>

//           <div className="mb-3">
//             <label>Email address</label>
//             <input
//               type="email"
//               name="email"
//               className="form-control"
//               placeholder="Enter email"
//               // onChange={(e) => setEmail(e.target.value)}
//               {...register("email")}
//             />
//           <small className="text-danger">{errors.email?.message}</small>
//           </div>

//           <div className="mb-3">
//             <label>Password</label>
//             <input
//               type="password"
//               name="password"
//               className="form-control"
//               placeholder="Enter password"
//               // onChange={(e) => setPassword(e.target.value)}
//               {...register("password")}
//             />
//             <small className="text-danger">{errors.password?.message}</small>
//           </div>

//           <div className="mb-3">
//             <label>Confirm Password</label>
//             <input
//               type="password"
//               name="confirmPassword"
//               className="form-control"
//               placeholder="Confirm password"
//               // onChange={(e) => setPassword(e.target.value)}
//               {...register("confirmPassword")}
//             />
//             <small className="text-danger">{errors.confirmPassword?.message}</small>
//           </div>

//           <div className="d-grid">
//             <button type="submit" className="btn btn-primary">
//               Sign Up
//             </button>
//           </div>
//           <p className="forgot-password text-right">
//             Already registered <a href="/login">sign in?</a>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }

import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export default function SignUp() {
  const schema = yup.object().shape({
    Secret_key: yup.string().required("Secret Key is required"),
    UserType: yup.string().required("User Type is required"),
    username: yup.string().required("Username is required"),
    email: yup.string().email().required("Email is required"),
    password: yup.string().min(8).max(15).required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const formData = watch();

  const submitForm = (data) => {
    const { UserType, username, email, password, Secret_key } = data;

    if (UserType == "Admin" && Secret_key != "AdarshT") {
      alert("Invalid Admin");
    } else {
      console.log(username, email, password);
      fetch("http://localhost:8000/register", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          userType: UserType,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "userRegister");
          if (data.status === "ok") {
            alert("Registration Successful");
          } else {
            alert("Something went wrong");
          }
        });
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={handleSubmit(submitForm)} id="signup">
          <h3>Sign Up</h3>
          <div>
            Register As
            <input
              type="radio"
              name="UserType"
              value="User"
              key="user"
              {...register("UserType")}
            />
            User
            <input
              type="radio"
              name="UserType"
              value="Admin"
              key="admin"
              {...register("UserType")}
            />
            <small className="text-danger">{errors.UserType?.message}</small>
            Admin
          </div>
          {formData.UserType == "Admin" ? (
            <div className="mb-3">
              <label>Secret Key</label>
              <input
                type="text"
                className="form-control"
                name="Secret_key"
                placeholder="Secret Key"
                {...register("Secret_key")}
              />
              <small className="text-danger">
                {errors.Secret_key?.message}
              </small>
            </div>
          ) : null}

          <div className="mb-3">
            <label>Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Enter the Username provided by company"
              {...register("username")}
            />
            <small className="text-danger">{errors.username?.message}</small>
          </div>

          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter email"
              {...register("email")}
            />
            <small className="text-danger">{errors.email?.message}</small>
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter password"
              {...register("password")}
            />
            <small className="text-danger">{errors.password?.message}</small>
          </div>

          <div className="mb-3">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="form-control"
              placeholder="Confirm password"
              {...register("confirmPassword")}
            />
            <small className="text-danger">
              {errors.confirmPassword?.message}
            </small>
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary" form="signup">
              Sign Up
            </button>
          </div>
          <p className="forgot-password text-right">
            Already registered <a href="/login">sign in?</a>
          </p>
        </form>
      </div>
    </div>
  );
}

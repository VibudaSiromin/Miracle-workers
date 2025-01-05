import React from "react";

const LauncherForm = ({ register, errors }) => {
  const browsrLists = [
    "Chrome",
    "Firefox",
    "Microsoft Edge",
    "Internet Explore",
  ];

  return (
    <>
      <div className="form-group">
        <label>Name</label>
        <input className="form-control" {...register("name")} />
        <small className="text-danger">{errors.name?.message}</small>
      </div>
      <div className="form-group">
        <label>Browser</label>

        {browsrLists.map((value,index) => {
          return (
            <div class="form-check" key={index}>
              <input
                class="form-check-input"
                type="radio"
                name={value}
                id={value}
                value={value}
                {...register("browser")}
              />
              <label class="form-check-label" for={value}>
                {value}
              </label>
            </div>
          );
        })}

        <small className="text-danger">{errors.browser?.message}</small>
      </div>
      <div className="form-group">
        <label>Test Type</label>
        <select
          class="form-select"
          aria-label="Default select example"
          {...register("test_type")}
        >
          <option></option>
          <option value="Sequential">Sequential</option>
          <option value="Data Driven">Data Driven</option>
        </select>
        <small className="text-danger">{errors.test_type?.message}</small>
      </div>
      <div className="form-group">
        <label>Status</label>
        <select
          class="form-select"
          aria-label="Default select example"
          {...register("status")}
        >
          <option></option>
          <option value="Enabled">Enabled</option>
          <option value="Disabled">Disabled</option>
        </select>
        <small className="text-danger">{errors.status?.message}</small>
      </div>
      <div className="form-group">
        <label>Data Sheet</label>
        <input className="form-control" {...register("data_sheet")} />
        <small className="text-danger">{errors.data_sheet?.message}</small>
      </div>
      <div className="form-group">
        <label>Comment</label>
        <input className="form-control" {...register("comment")} />
      </div>
    </>
  );
};

export default LauncherForm;

import React,{useEffect,useState} from "react";
import axios from "axios";
import { object } from "prop-types";

const LauncherForm = ({ register, errors }) => {
  const [browsers,setBrowsers]=useState([]);
  const [testType,setTestType]=useState([]);

  const url="http://localhost:5000/settings/browsers";
  const url2="http://localhost:5000/settings/test-types";

  const getBrowsers = () => {
      axios
        .get(url)
        .then((res) => {
          setBrowsers(res.data.settingItem); 
          console.log("gft");
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const getTestTypes = () => {
      axios
        .get(url2)
        .then((res) => {
          setTestType(res.data.settingItem); 
          console.log("gft");
        })
        .catch((err) => {
          console.log(err);
        });
    };

    useEffect(() => {
      getBrowsers();
      getTestTypes();
    }, []);


  return (
    <>
      <div className="form-group">
        <label>Name</label>
        <input className="form-control" {...register("name")} />
        <small className="text-danger">{errors.name?.message}</small>
      </div>
      <div className="form-group">
        <label>Browser</label>
        {browsers.map((object,index) => {
          return (
            <div class="form-check" key={index}>
              <input
                class="form-check-input"
                type="radio"
                name={object.name}
                id={object.name}
                value={object.name}
                {...register("browser")}
              />
              <label class="form-check-label" for={object.name}>
                {object.name}
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
        {testType.map((object,index) => {
          return (
            <option value={object.name}>{object.name}</option>
          );
        })}
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

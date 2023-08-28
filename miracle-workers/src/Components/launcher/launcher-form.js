import React from "react";
import { connect } from "react-redux";
import { useState,useEffect } from "react";
import axios from "axios";

const LauncherForm = ({ register, errors, testPageName, testTypeHandler }) => {

  const [isDataDriven, setIsDataDriven] = useState(false);
  const [dataPageNames,setDataPageNames] = useState([]);
  const [isMount,setIsMount] = useState(false);
  const [dataSheetOptions,setDataSheetOptions] = useState([]);

  const browsrLists = [
    "Chrome",
    "Firefox",
    "Microsoft Edge",
    "Internet Explore",
  ];

  console.log('bard', testPageName);

  const getTestTypeHandler = (value) => {
    testTypeHandler(value);
    if (value === 'Data Driven') {
      setIsDataDriven(true);
    } else {
      setIsDataDriven(false);
    }
  }

  useEffect(()=>{
    axios
    .get('http://localhost:5000')
    .then((res)=>{
      setDataPageNames(res.data.dataPageNames);
    })
    .catch((err) => {
      console.log(err);
    });

  },[])



  useEffect(()=>{
    if(isMount){
     const selectOptionsArray=dataPageNames.map((dataPage)=>{
        return(
          <option value={dataPage}>{dataPage}</option>
        )
      })

      setDataSheetOptions(selectOptionsArray);

    }else{
      setIsMount(true);
    }

  },[dataPageNames])



  return (
    <>
      <div className="form-group">
        <label>Sheet Name</label>
        <input className="form-control" /*{...register("sheetName")}*/ value={testPageName} />
        {/* <small className="text-danger">{errors.sheetName?.message}</small> */}
      </div>

      <div className="form-group">
        <label>Test Case</label>
        <input className="form-control" {...register("testCase")} />
        <small className="text-danger">{errors.testCase?.message}</small>
      </div>

      <div className="form-group">
        <label>Browser</label>

        {browsrLists.map((value, index) => {
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
          {...register("type")}

          onChange={(e) => getTestTypeHandler(e.target.value)}
        >
          <option></option>
          <option value="Sequential">Sequential</option>
          <option value="Data Driven">Data Driven</option>
        </select>
        <small className="text-danger">{errors.type?.message}</small>
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
        <select
          class="form-select"
          aria-label="Default select example"
          {...register("dataSheet")}
        >
          <option></option>
          {dataSheetOptions}
        </select>
        <small className="text-danger">{errors.dataSheet?.message}</small>


        {/* <label>Data Sheet</label>
        <input className="form-control" {...register("dataSheet")} />
        <small className="text-danger">{errors.dataSheet?.message}</small> */}
      </div>
      <div className="form-group">
        <label>Comment</label>
        <input className="form-control" {...register("comment")} />
      </div>
    </>
  );
};

//export default LauncherForm;



export default LauncherForm
//export default connect(mapStateToProps)(LauncherForm);

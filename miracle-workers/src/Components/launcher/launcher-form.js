import React from 'react';
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import axios from 'axios';

const LauncherForm = ({
  register,
  errors,
  testPageName,
  testTypeHandler,
  dataPageOptions,
}) => {
  const [isDataDriven, setIsDataDriven] = useState(false);
  //const [dataPageNames,setDataPageNames] = useState([]);
  const [isMount, setIsMount] = useState(false);
  const [dataSheetOptions, setDataSheetOptions] = useState([]);
  const [state, setState] = useState(false);

  const browsrLists = [
    'Chrome',
    'Firefox',
    'Microsoft Edge',
    'Internet Explore',
  ];

  const arr = [
    <option value="data02">data02</option>,
    <option value="ITPM">ITPM</option>,
  ];
  //console.log('fireball',dataPageNames);

  const getTestTypeHandler = (value) => {
    testTypeHandler(value);
    if (value === 'Data Driven') {
      setIsDataDriven(true);
    } else {
      setIsDataDriven(false);
    }
  };

  // useEffect(()=>{
  //   if(isMount){
  //     if(dataPageNames.length>0){
  //       const selectOptionsArray=dataPageNames.map((dataPage)=>{
  //         return(
  //           <option value={dataPage}>{dataPage}</option>
  //         )
  //       })
  //       setDataSheetOptions(selectOptionsArray);
  //       setState(!state);
  //     }
  //   }else{
  //     setIsMount(true);
  //   }

  // },[dataPageNames])

  return (
    <>
      <div className="form-group">
        <label>Sheet Name</label>
        <input
          className="form-control"
          /*{...register("sheetName")}*/ value={testPageName}
        />
        {/* <small className="text-danger">{errors.sheetName?.message}</small> */}
      </div>

      <div className="form-group">
        <label>Test Case</label>
        <input className="form-control" {...register('testCase')} />
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
                {...register('browser')}
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
          {...register('type')}
          onChange={(e) => getTestTypeHandler(e.target.value)}
        >
          <option value="Sequential">Sequential</option>
          <option value="Data Driven">Data Driven</option>
        </select>
        <small className="text-danger">{errors.type?.message}</small>
      </div>
      <div className="form-group">
        <label>Status</label>
        <select
          className="form-select"
          aria-label="Default select example"
          {...register('status')}
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
          className="form-select"
          aria-label="Default select example"
          {...register('dataSheet')}
        >
          <option></option>
          {/* {arr} */}
          {dataPageOptions}
        </select>
        <small className="text-danger">{errors.dataSheet?.message}</small>
      </div>
      <div className="form-group">
        <label>Comment</label>
        <input className="form-control" {...register('comment')} />
      </div>
    </>
  );
};

//export default LauncherForm;

export default LauncherForm;
//export default connect(mapStateToProps)(LauncherForm);

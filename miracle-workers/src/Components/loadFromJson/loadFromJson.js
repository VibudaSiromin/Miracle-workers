import React, { useState, useCallback } from "react";
import ReactJson from "react-json-view";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { useDispatch } from 'react-redux';

const JsonUpload = () => {
  const [jsonObject, setJsonObject] = useState({});
  const dispatch = useDispatch();

  //upload  a json file
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const contents = e.target.result;
      var json = JSON.parse(contents);
      setJsonObject(json);
    };
    reader.readAsText(file);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  //save data
  const loadJsonData = () => {
    const locaters = [];
    let launcher = {};
    const data = [];
    const components = [];
    const testSuite = [];

    const fileName = jsonObject.fileName.replace(/\s/g, "");
    jsonObject["tests"].forEach((tests) => {
      launcher = [
        [
          `${fileName}M`,
          {
            name: tests.sheetName,
            browser: tests.browser,
            test_type: tests.type,
            status: tests.enabled,
            data_sheet: tests.dataSheet,
            comment: tests.comments,
          },
        ],
      ];

      tests["groups"].forEach((groups) => {
        groups["steps"].forEach((step) => {
          const value = {
            group: step.group,
            instruction: step.instruction,
            command: step.command,
            locator: step.locator,
            locatorParameter: step.locatorParameter,
            data: step.data,
            swapResult: step.swapResult,
            branchSelection: step.branchSelection,
            action: step.action,
            comment: step.comment,
          };

          testSuite.push(value);
          data.push(step);
          locaters.push({ locater: step.locator });
        });
      });
    });

    testSuite.splice(0, 0, `${fileName}M`);
    const newData = [testSuite];

    const payload = {
      launcher,
      locaters,
      data,
      testSuite: newData,
    };
    handleJsonUpload(payload);
  };

  const handleJsonUpload = (payload) => {
    try {
      const url = `http://localhost:8000/json/upload`;

      axios
        .post(url, { ...payload })
        .then((res) => {
          dispatch({ type: 'LOAD_FROM_JSON' });
          console.log("uploaded");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>

      {jsonObject && Object.keys(jsonObject).length !== 0 ? (
        <>
          <ReactJson
            src={jsonObject}
            style={{ height: "524px", overflow: "auto", background: "#fff" }}
          />
          <button type="button" onClick={loadJsonData}>
            Load Json Data
          </button>
        </>
      ) : null}
    </>
  );
};

export default JsonUpload;

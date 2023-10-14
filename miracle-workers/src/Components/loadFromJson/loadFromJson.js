import React, { useState, useCallback } from 'react';
import ReactJson from 'react-json-view';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import './loadFromJson.css';
import { LuFileJson } from 'react-icons/lu';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';

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
    const locators = [];
    let launcher = [];
    const data = [];
    const testSuite = [];

    const fileName = jsonObject.fileName.replace(/\s/g, '');
    jsonObject['tests'].forEach((test) => {
      const testPage = [];
      launcher.push([
        `${test.sheetName}M`,
        {
          sheetName: test.sheetName,
          testCase: test.testCase,
          browser: test.browser,
          type: test.type,
          status: test.status,
          dataSheet: test.dataSheet,
          comment: test.comment,
        },
      ]);

      testPage.push(`${test.sheetName}M`);

      if (test.groups.length !== 0) {
        const steps = test.groups[0].steps;
        testPage.push(...steps);
      }

      testSuite.push(testPage);

    });

    if (!("locatorPages" in jsonObject)) {
      locators.push([]);
    } else {
      locators.push(Object.entries(jsonObject['locatorPages']).map(([page, locators]) => (locators.length !== 0 ? [
        page,
        ...Object.entries(locators).map(([key, item]) => ({
          "Locator Name": item["Locator Name"],
          "Locator Value": item["Locator Value"]
        }))
      ] : [page]))
      )
    }

    function getObjectWithMaxKeyValuePairs(obj) {
      let maxCount = 0;
      let maxObjectKey = null;

      for (const key in obj) {
        const currentCount = Object.keys(obj[key]).length;
        if (currentCount > maxCount) {
          maxCount = currentCount;
          maxObjectKey = key;
        }
      }

      return maxObjectKey;
    }

    function convertData(jsonObject) {
      const outputData = [];

      for (const key in jsonObject.dataPages) {
        console.log(key)

        let keyHasMaxFields = getObjectWithMaxKeyValuePairs(jsonObject.dataPages[key])
        if (keyHasMaxFields === null) {
          const innerData = [key];
          outputData.push(innerData);

        } else {
          const innerData = [key, Object.keys(jsonObject.dataPages[key][keyHasMaxFields]), ...Object.values(jsonObject.dataPages[key])];
          outputData.push(innerData);
        }

      }
      return outputData;
    }

    if (!("dataPages" in jsonObject)) {
      data.push([]);
    } else {
      data.push(convertData(jsonObject));
    }

    const payload = {
      launcher,
      locators,
      data,
      testSuite,
    };
    handleJsonUpload(payload);
  };

  const handleJsonUpload = (payload) => {
    try {
      const url = `http://localhost:5000/json/upload`;
      axios
        .post(url, { ...payload })
        .then((res) => {
          console.log('uploaded');
          dispatch({ type: 'RENDERING_NAV_BAR' });
          console.log('uploaded');
          Swal.fire({
            icon: 'success',
            title: 'Great...',
            text: 'Loaded from JSON',
          });
          // window.location.reload();
        })
        .catch((err) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Failed to Load',
          });
          console.log(err);
        });
    } catch (error) {
      console.log(error, 'yyyy');
    }
  };

  return (
    <>
      <div className="outer">
        <div {...getRootProps()} className="card">
          <LuFileJson size="100px" style={{ marginTop: '10px' }} />
          <input {...getInputProps()} />
          <div>
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <>
                <p>Drag & drop some files here</p>
                <p>OR</p>
                <p> Click to select files</p>
              </>
            )}
          </div>
        </div>
      </div>
      {jsonObject && Object.keys(jsonObject).length !== 0 ? (
        <>
          <ReactJson
            src={jsonObject}
            style={{
              height: '48vh',
              overflow: 'auto',
              background: '#c5c9eb',
              borderRadius: '5px',
            }}
          />
          <Button
            variant="contained"
            onClick={loadJsonData}
            color="info"
            style={{ marginTop: '1.1vh' }}
          >
            Load Json Data
          </Button>
        </>
      ) : null}
    </>
  );
};

export default JsonUpload;

import { Button } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { saveAs } from 'file-saver';
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import Swal from 'sweetalert2';

const JSONGenerator = () => {
    const [launcherDetails, setlauncherDetails] = useState();
    const [testData, setTestData] = useState();
    const [isMountOne, setIsMountOne] = useState(false);
    const [isMountTwo, setIsMountTwo] = useState(false);
    const [isMountThree, setIsMountThree] = useState(false);
    const [isMountFour, setIsMountFour] = useState(false);
    const [isMountFive, setIsMountFive] = useState(false);
    const [isMountSix, setIsMountSix] = useState(false);
    const [testSuiteHeadings, setTestSuiteHeadings] = useState([]);
    const [isModalShow, setIsModalShow] = useState(false);
    const [fileName, setFileName] = useState('');
    const [finalOutPut, setFinalOutPut] = useState();
    const [dataSection, setDataSection] = useState();
    const [attachDataSheets, setAttachDataSheets] = useState([]);
    const [loopsDetailsStartCmd, setLoopsDetailsStartCmd] = useState([]);
    const [loopsDetailsEndCmd, setLoopsDetailsEndCmd] = useState([]);
    const [locatorSection, setLocatorSection] = useState();
    const [attachLocatorSheets, setAttachLocatorSheets] = useState([]);
    const [isDataCleaningProc, setIsDataCleaningProc] = useState(false);
    //const modalRefJSONFileName=useRef();

    const dispatch = useDispatch();

    const generateFinalJSON = () => {
        console.log('hamas1');
        gettingLauncherDetails();
    }
    //state.addTestSheetName.functionCalledManual
    const JSONGeneratorInitStatus = useSelector((state) => state.initiateJSONGenerator.initJSONGenerator);

    useEffect(() => {
        if (isMountSix) {
            gettingLauncherDetails();
            setIsDataCleaningProc(true);
        } else {
            setIsMountSix(true);
        }

    }, [JSONGeneratorInitStatus]);

    const gettingLauncherDetails = async () => {
        console.log('hamas2');
        axios
            .get('http://localhost:5000/launcher/getAllLauncherData')
            .then((response) => {
                console.log('tiger111', response.data.allLauncherData);
                const launcher = response.data.allLauncherData;
                const newLauncher = launcher.map((launcherPage) => {
                    const launcherObj = launcherPage[1];
                    launcherObj['groups'] = [{}];
                    launcherObj['startTime'] = null;
                    launcherObj['endTime'] = null;
                    // launcherObj['status']=null;
                    launcherObj['testSettings'] = {}
                    launcherPage[1] = launcherObj;

                    return launcherPage;
                });
                console.log('lion', newLauncher);
                setlauncherDetails([...newLauncher]);
            })
            .catch((err) => {
                console.log('ezio');
                console.log(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Empty test sheets detected.Please remove them & proceed',
                });
            })
    }
    useEffect(() => {
        console.log('hamas3');
        if (isMountOne) {
            gettingTestSuiteDetails();
        } else {
            setIsMountOne(true);
        }
    }, [launcherDetails])

    useEffect(() => {
        if (isMountFour) {
            getAllDataFromDataSection();
        } else {
            setIsMountFour(true);
        }
    }, [testSuiteHeadings]);

    const gettingTestSuiteDetails = async () => {
        console.log('hamas3');
        try {
            const response = await axios.get(
                `http://localhost:5000/testSuite/getAllTestData`
            )
            setTestData(response.data.allTestData);
            // const testData = response.data.allTestData;
            // console.log('ship',testData);
        } catch (err) {
            if (err.response) {
                // The client was given an error response (5xx, 4xx)
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);
            } else if (err.request) {
                // The client never received a response, and the request was never left
                console.log(err.request);
            } else {
                // Anything else
                console.log('Error', err.message);
            }
        }
    }
    useEffect(() => {
        if (isMountTwo) {
            getTestSuiteHeadings();
        } else {
            setIsMountTwo(true);
        }
    }, [testData])

    const getTestSuiteHeadings = async () => {
        console.log('solor', testData);
        try {
            const response = await axios.get(
                `http://localhost:5000/testJunction/testManual/:tname/getHeading`
            )
            const testHeadings = response.data.getTestHeadings;
            setTestSuiteHeadings(testHeadings);

        } catch (err) {
            if (err.response) {
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);
            } else if (err.request) {
                console.log(err.request);
            } else {
                console.log('Error', err.message);
            }
        }
    }

    const getAllDataFromDataSection = () => {
        axios
            .get('http://localhost:5000/data/getAllData')
            .then((res) => {
                setDataSection(res.data.dataSection);
            })
            .catch((err) => {
                console.log(err)
            })

    }

    useEffect(() => {
        if (isMountFive) {
            getAllDataFromLocatorSection();
        } else {
            setIsMountFive(true);
        }
    }, [dataSection])


    const getAllDataFromLocatorSection = () => {
        axios
            .get('http://localhost:5000/locator/getAllData')
            .then((res) => {
                console.log('hash', res.data.locatorSection);
                setLocatorSection(res.data.locatorSection);
            })
            .catch((err) => {
                console.log(err)
            })

    }
    useEffect(() => {
        if (isMountThree) {
            appendingTestdataWithLauncher();
        } else {
            setIsMountThree(true);
        }
    }, [locatorSection])

    const appendingTestdataWithLauncher = () => {

        let testsKeyArr = [];  //a key of outter object (array)
        console.log('frank', launcherDetails);
        for (let i = 0; i < launcherDetails.length; i++) {

            console.log("status", launcherDetails[i][1]);
            if (launcherDetails[i][1].status === "Enabled") {

                if (launcherDetails[i][1].type === "Sequential") {
                    if (launcherDetails[i][0] === testData[i][0]) {//selecting a test sheet
                        let testSheet = testData[i];
                        let newTestSheet = [];
                        const commonLocatorId = uuidv4();
                        for (let j = 1; j < testSheet.length; j++) {//selecting a test step
                            let testStep = testSheet[j];
                            console.log('my test step', testStep);
                            const newTestStep = {};
                            for (let k = 0; k < testSuiteHeadings.length; k++) {
                                const key = testSuiteHeadings[k];
                                if (testStep.hasOwnProperty(key)) {
                                    console.log('myValue', testStep[key]);
                                    //identify loop name and relevant data page name 
                                    if (testStep[key] === 'While.DataExists') {
                                        const dataValue = testStep['data'];
                                        const dataValueParts = dataValue.split('|');
                                        const dataPageName = dataValueParts[0].split(':')[1];
                                        const loopName = dataValueParts[1].split(':')[1];
                                        const start_step = commonLocatorId + "." + (j + 1);
                                        const existingLoopDetails = loopsDetailsStartCmd;
                                        const loopDetailsObj = {};
                                        loopDetailsObj['loopName'] = loopName;
                                        loopDetailsObj['start_step'] = start_step;
                                        loopDetailsObj['dataPageName'] = dataPageName;
                                        existingLoopDetails.push(loopDetailsObj);
                                        setLoopsDetailsStartCmd(existingLoopDetails);
                                        if (attachDataSheets.length === 0) {
                                            const arr = attachDataSheets;
                                            arr.push(dataPageName);
                                            setAttachDataSheets(arr);
                                        } else {
                                            if (!attachDataSheets.includes(dataPageName)) {
                                                const arr = attachDataSheets;
                                                arr.push(dataPageName);
                                                setAttachDataSheets(arr);
                                            }
                                        }
                                        if (loopsDetailsStartCmd.length !== 0 && loopsDetailsEndCmd.length !== 0) {
                                            for (let i = 0; i < loopsDetailsEndCmd.length; i++) {
                                                if (loopsDetailsEndCmd[i]['loopName'] === loopName) {
                                                    newTestStep['data'] = testStep['data'] + '|' + 'end_step' + loopsDetailsEndCmd[i]['end_step']
                                                }
                                            }

                                        }

                                    }
                                    if (testStep[key] === 'While.End') {
                                        const dataValue = testStep['data'];
                                        const loopName = dataValue.split(':')[1];
                                        const end_step = commonLocatorId + "." + (j + 1);
                                        const existingLoopDetails = loopsDetailsEndCmd;
                                        const loopDetailsObj = {};
                                        loopDetailsObj['loopName'] = loopName;
                                        loopDetailsObj['end_step'] = end_step;
                                        existingLoopDetails.push(loopDetailsObj);
                                        setLoopsDetailsEndCmd(existingLoopDetails);

                                        if (loopsDetailsStartCmd.length !== 0 && loopsDetailsEndCmd.length !== 0) {
                                            for (let i = 0; i < loopsDetailsStartCmd.length; i++) {
                                                if (loopsDetailsStartCmd[i]['loopName'] === loopName) {
                                                    newTestStep['data'] = testStep['data'] + '|' + 'start_step' + loopsDetailsStartCmd[i]['start_step'];
                                                    console.log('bean', newTestStep['data']);
                                                    continue;
                                                }
                                            }

                                        }
                                    }
                                    if (key === "data") {
                                        console.log('hellooooo', testStep[key])
                                        //if(testStep[key].charAt(0)==="#"){// identify data values which strats with '#'
                                        if (testStep[key].split('.')[0] === '#data') {// identify data values which connects with the data section
                                            const refParts = testStep[key].split('.');
                                            const dataPage = refParts[1];
                                            const heading = refParts[2];
                                            const rawNo = refParts[3];
                                            console.log('creed', dataSection, dataPage);

                                            const index = dataSection.findIndex(data => data[0] === dataPage);
                                            const selectedPageWithValues = dataSection[index];
                                            if (dataPage.charAt(dataPage.length - 1) === "M") {
                                                console.log('wall', rawNo)
                                                const selectedDataObject = selectedPageWithValues[parseInt(rawNo) + 1];
                                                console.log('wall', selectedDataObject);
                                                const actualDataValue = selectedDataObject[heading];
                                                newTestStep[key] = actualDataValue;
                                            }
                                        } else if (testStep['command'] !== 'While.End' && testStep['command'] !== 'While.DataExists') {
                                            newTestStep[key] = testStep[key]
                                        }
                                    } else if (key === 'locator') {
                                        if (testStep[key].split('.')[0] === '#loc') {
                                            const refParts = testStep[key].split('.');
                                            const LocatorPage = refParts[1];
                                            const locatorName = refParts[2];
                                            const index = locatorSection.findIndex(locator => locator[0] === LocatorPage);
                                            const selectedPageWithValues = locatorSection[index];
                                            for (let i = 1; i < selectedPageWithValues.length; i++) {
                                                const locatorObj = selectedPageWithValues[i];
                                                if (locatorObj['Locator Name'] === locatorName) {
                                                    newTestStep[key] = locatorObj['Locator Value'];
                                                }
                                            }

                                        } else {
                                            newTestStep[key] = testStep[key];
                                        }
                                    } else {
                                        newTestStep[key] = testStep[key];
                                    }
                                } else {
                                    console.log('myValue2');
                                    newTestStep[key] = "";
                                }
                            }
                            newTestStep['stepId'] = uuidv4();
                            newTestStep['uniqueLocator'] = commonLocatorId + "." + (j + 1);
                            newTestSheet.push(newTestStep);
                        }
                        const tempLauncherDetails = launcherDetails;
                        tempLauncherDetails[i][1]['groups'][0]['steps'] = newTestSheet;
                        //launcherDetails['groups'][0]['steps']=newTestSheet;
                        testsKeyArr.push(tempLauncherDetails[i][1]);
                        console.log('zone', newTestSheet);
                    }

                } else if (launcherDetails[i][1].type === "Data Driven") {
                    ///////////////////////////////////////////
                    if (launcherDetails[i][0] === testData[i][0]) {//selecting a test sheet
                        let testSheet = testData[i];
                        let newTestSheet = [];
                        const commonLocatorId = uuidv4();
                        for (let j = 1; j < testSheet.length; j++) {//selecting a test step
                            let testStep = testSheet[j];
                            console.log('my test step', testStep);
                            const newTestStep = {};
                            for (let k = 0; k < testSuiteHeadings.length; k++) {
                                const key = testSuiteHeadings[k];
                                if (testStep.hasOwnProperty(key)) {
                                    console.log('myValue', testStep[key]);

                                    //////////////////////////////////
                                    console.log('hellooooo', testStep[key])
                                    if (testStep[key].charAt(0) === "#") {// identify data values which strats with '#'
                                        if (testStep[key].split('.')[0] === '#data') {// identify data values which connects with the data section
                                            const refParts = testStep[key].split('.');
                                            const dataPage = refParts[1];
                                            if (attachDataSheets.length === 0) {
                                                const arr = attachDataSheets;
                                                arr.push(dataPage);
                                                setAttachDataSheets(arr);
                                            } else {
                                                if (!attachDataSheets.includes(dataPage)) {
                                                    const arr = attachDataSheets;
                                                    arr.push(dataPage);
                                                    setAttachDataSheets(arr);
                                                }
                                            }
                                            newTestStep[key] = testStep[key];
                                        } else if (testStep[key].split('.')[0] === '#loc') {
                                            const refParts = testStep[key].split('.');
                                            const LocatorPage = refParts[1];
                                            const locatorName = refParts[2];
                                            const index = locatorSection.findIndex(locator => locator[0] === LocatorPage);
                                            console.log('jam', index);
                                            const selectedPageWithValues = locatorSection[index];
                                            for (let i = 1; i < selectedPageWithValues.length; i++) {
                                                const locatorObj = selectedPageWithValues[i];

                                                if (locatorObj['Locator Name'] === locatorName) {
                                                    console.log('flyyy', locatorObj['Locator Value']);
                                                    newTestStep[key] = locatorObj['Locator Value'];
                                                }
                                            }
                                        } else {
                                            newTestStep[key] = testStep[key];
                                        }
                                    } else {
                                        newTestStep[key] = testStep[key];
                                    }

                                } else {
                                    console.log('myValue2');
                                    newTestStep[key] = "";
                                }
                            }
                            newTestStep['stepId'] = uuidv4();
                            newTestStep['uniqueLocator'] = commonLocatorId + "." + (j + 1);
                            newTestSheet.push(newTestStep);
                        }
                        const tempLauncherDetails = launcherDetails;
                        tempLauncherDetails[i][1]['groups'][0]['steps'] = newTestSheet;
                        //launcherDetails['groups'][0]['steps']=newTestSheet;
                        testsKeyArr.push(tempLauncherDetails[i][1]);
                        console.log('zone', newTestSheet);
                    }

                    ///////////////////////////////////////////
                }
            } else {
                const tempLauncherDetails = launcherDetails;
                tempLauncherDetails[i][1]['groups'] = [];
                testsKeyArr.push(tempLauncherDetails[i][1]);
            }
        }
        console.log('land', locatorSection);
        //console.log('lord', loopsDetailsStartCmd);

        //attaching data pages into the JSON output

        const finalJSONOutput = {
            suiteId: uuidv4(),
            fileName: "",
            tests: testsKeyArr,
            activeTestCount: 1,
            status: null,
            startTime: null,
            endTime: null,
            filePath: "",
            reportPath: null,

        };

        setFinalOutPut(finalJSONOutput);

        const datasheets = [];
        for (let i = 0; i < dataSection.length; i++) {
            datasheets.push(dataSection[i][0])
        }
        console.log('moon', datasheets);
        //setAttachDataSheets(datasheets);



        console.log('007BOND', dataSection);


        if (datasheets.length !== 0) {
            console.log('007', datasheets.length);
            const dataPages = {};
            for (let i = 0; i < datasheets.length; i++) {
                console.log('bird box', datasheets);
                const index = dataSection.findIndex(data => data[0] === datasheets[i]);
                console.log('gumpert', dataSection[index]);
                const selectedSheetNameWithdata = dataSection[index];
                const tempObj = {};
                if (datasheets[i].charAt(datasheets[i].length - 1) === "M") {
                    console.log('hound1');
                    for (let j = 2; j < selectedSheetNameWithdata.length; j++) {
                        tempObj[j - 1] = selectedSheetNameWithdata[j];
                    }
                } else if (datasheets[i].charAt(datasheets[i].length - 1) === "E") {
                    console.log('hound2');
                    for (let j = 3; j < selectedSheetNameWithdata.length; j++) {
                        tempObj[j - 2] = selectedSheetNameWithdata[j];
                    }
                }
                dataPages[datasheets[i]] = tempObj;
            }
            console.log('yoga', dataPages);

            finalJSONOutput.dataPages = dataPages;
            setFinalOutPut(finalJSONOutput);
            //initModal();

        }

        const locatorsheets = [];
        for (let i = 0; i < locatorSection.length; i++) {
            locatorsheets.push(locatorSection[i][0])
        }
        console.log('moon2', locatorsheets);
        //setAttachLocatorSheets(locatorsheets);

        ///////////////////////////////////////////////
        if (locatorsheets.length !== 0) {
            console.log('zone123', locatorsheets.length);
            const locatorPages = {};
            for (let i = 0; i < locatorsheets.length; i++) {
                const index = locatorSection.findIndex(data => data[0] === locatorsheets[i]);
                console.log('gumpert', locatorSection[index]);
                const selectedSheetNameWithdata = locatorSection[index];
                console.log('hawk', selectedSheetNameWithdata);
                const tempObj = {};
                for (let j = 1; j < selectedSheetNameWithdata.length; j++) {
                    tempObj[j] = selectedSheetNameWithdata[j];
                }
                locatorPages[locatorsheets[i]] = tempObj;
            }
            const finalOutPut = finalJSONOutput;
            finalOutPut.locatorPages = locatorPages;
            setFinalOutPut(finalOutPut);
            // const locatorKeyValue = {locatorPages:locatorPages}
            // console.log('yoga3333',locatorKeyValue);
            // //const finalJSONOutput ={...finalOutPut,...locatorKeyValue}
            // finalOutPut.locatorPages = locatorPages;
            //setFinalOutPut(finalOutPut);

            //initModal();

        }

        initModal();
    }
    const nameSchema = yup.object(
        {
            name: yup.string().required("File name is required!")
        }
    ).required();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(nameSchema),
        defaultValues: {
            name: ""
        },
    });

    const initModal = () => {
        setIsModalShow(true);
    }

    const terminateModal = () => {
        setIsModalShow(false);
        reset();
    }

    const handleFileName = (event) => {
        console.log('mason');
        setFileName(event.target.value);
    }

    const downloadJSONFile = () => {

        setIsModalShow(false);
        const JSONfileName = fileName;
        finalOutPut["fileName"] = JSONfileName;
        // Convert data object to JSON string
        const jsonData = JSON.stringify(finalOutPut, null, 1);
        const blob = new Blob([jsonData], { type: 'application/json;charset=utf-8' });
        saveAs(blob, JSONfileName + '.json');
        reset();

        Swal.fire({
            icon: 'success',
            title: 'Great...',
            text: 'JSON file successfully created!',
        });

        if (isDataCleaningProc) {
            axios
                .delete('http://localhost:5000/section/delete')
                .then((res) => {
                    console.log('vista');
                    setIsDataCleaningProc(false);
                    dispatch({ type: 'RENDERING_NAV_BAR' });

                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Your work has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
                .catch((err) => {
                    console.log(err);
                    setIsDataCleaningProc(false);
                })
        }
    }
    return (
        <>
            <Button variant="danger" class="btn btn-info" onClick={generateFinalJSON}>Generate JSON</Button>
            <form onSubmit={handleSubmit(downloadJSONFile)} id='fileNameModal' register={register} errors={errors}>
                <Modal show={isModalShow} tabIndex="-1">
                    <Modal.Header closeButton onClick={terminateModal}>
                        <Modal.Title>Enter a File Name</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label>Enter a file name for saving JSON data :</label>
                        <input type="text"  {...register('name')} onChange={handleFileName} className="form-control" />
                        <small className="text-danger">{errors.name?.message}</small>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="dark" form='fileNameModal' type="submit">
                            Ok
                        </Button>
                    </Modal.Footer>
                </Modal>
            </form>
        </>
    );
}

export default JSONGenerator;
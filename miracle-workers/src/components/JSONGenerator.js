import {Button } from "react-bootstrap";
import axios from "axios";
import { useState,useEffect } from "react";
import {v4 as uuidv4} from 'uuid';
import { saveAs } from 'file-saver';
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const JSONGenerator = () => {
    const [launcherDetails,setlauncherDetails] = useState();
    const [testData,setTestData] = useState();
    const [isMountOne,setIsMountOne] = useState(false);
    const [isMountTwo,setIsMountTwo] = useState(false);
    const [isMountThree,setIsMountThree] = useState(false);
    const [testSuiteHeadings,setTestSuiteHeadings] = useState([]);
    const [isModalShow, setIsModalShow] = useState(false);
    const [fileName,setFileName] = useState('');
    const [finalOutPut,setFinalOutPut] = useState();

    //const modalRefJSONFileName=useRef();

    const generateFinalJSON = () => {
        gettingLauncherDetails();
    }

    const gettingLauncherDetails =async () => {
        try{
            const response=await axios.get(
                `http://localhost:5000/launcher/getAllLauncherData`
            )
            const launcherDetails=response.data.allLauncherData;
            console.log('tiger',response.data.allLauncherData);
            const newLauncherDetails=launcherDetails.map((launcherPage)=>{
                const launcherObj=launcherPage[1];
                launcherObj['groups']=[{}];
                launcherObj['startTime']=null;
                launcherObj['endTime']=null;
                launcherObj['status']=null;
                launcherObj['testSettings']={}
                launcherPage[1]=launcherObj;

                return launcherPage;
            });
            console.log('lion',newLauncherDetails);
            setlauncherDetails([...newLauncherDetails]);

        }catch(err){
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

    useEffect(()=>{
        if(isMountOne){
            gettingTestSuiteDetails();
        }else{
            setIsMountOne(true);
        }
    },[launcherDetails])

    const gettingTestSuiteDetails = async() => {
        try{
            const response = await axios.get(
                `http://localhost:5000/testSuite/getAllTestData`
            )
            setTestData(response.data.allTestData);
            const testData = response.data.allTestData;
            console.log('ship',testData);
        }catch(err){
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

    useEffect(()=>{
        if(isMountTwo){
            getTestSuiteHeadings();
        }else{
            setIsMountTwo(true);
        }
    },[testData])

    const getTestSuiteHeadings = async() => {
        try{
            const response = await axios.get(
                `http://localhost:5000/testJunction/testManual/:tname/getHeading`
            )
            const testHeadings=response.data.getTestHeadings;
            setTestSuiteHeadings(testHeadings);

        }catch(err){
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

    useEffect(()=>{
        if(isMountThree){
            appendingTestdataWithLauncher();
        }else{
            setIsMountThree(true);
        }
    },[testSuiteHeadings])

    const appendingTestdataWithLauncher = () => {

            let testsKeyArr = [];
            for(let i=0;i<launcherDetails.length;i++){
                if(launcherDetails[i][0]===testData[i][0]){//selecting a test sheet
                    let testSheet=testData[i];
                    let newTestSheet=[];
                    for(let j=1;j<testSheet.length;j++){//selecting a test step
                        let testStep=testSheet[j];
                        console.log('my test step',testStep);
                        const newTestStep={};
                        for(let k=0;k<testSuiteHeadings.length;k++){
                            const key=testSuiteHeadings[k];
                            if(testStep.hasOwnProperty(key)){                           
                                console.log('myValue',testStep[key]);
                                newTestStep[key]=testStep[key];
                            }else{
                                console.log('myValue2');
                                newTestStep[key]="";
                            }
                        }
                        newTestSheet.push(newTestStep);
                    }
                    const tempLauncherDetails=launcherDetails;
                    tempLauncherDetails[i][1]['groups'][0]['steps']=newTestSheet;
                    //launcherDetails['groups'][0]['steps']=newTestSheet;
                    testsKeyArr.push(tempLauncherDetails[i][1]);
                     console.log('zone',newTestSheet);
                }           
            }
            console.log('land',testsKeyArr);

            const finalJSONOutput = {
                suiteId : uuidv4(),
                fileName : "",
                tests : testsKeyArr,
                activeTestCount : 1,
                status : null,
                startTime : null,
                endTime : null,
                filePath : "",
                reportPath : null

            };
            setFinalOutPut(finalJSONOutput);
            console.log('kiri saman',finalJSONOutput);

            initModal();
    }

    const nameSchema = yup.object(
        {
            name:yup.string().required("File name is required!")
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
        const JSONfileName=fileName;
        // Convert data object to JSON string
        const jsonData = JSON.stringify(finalOutPut,null,1);
        const blob = new Blob([jsonData], { type: 'application/json;charset=utf-8' });
        saveAs(blob,JSONfileName+'.json');
        reset();
    }
    return(
        <>
            <Button variant="danger" class="btn btn-info" onClick={generateFinalJSON}>Generate JSON</Button>
            <form onSubmit={handleSubmit(downloadJSONFile)} id='fileNameModal' register={register} errors={errors}>
                <Modal show={isModalShow} tabIndex="-1">
                        <Modal.Header closeButton onClick={terminateModal}>
                            <Modal.Title>Enter a File Name</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <label>Enter a file name for saving JSON data :</label>
                            <input type="text"  {...register('name')} onChange={handleFileName}/>
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
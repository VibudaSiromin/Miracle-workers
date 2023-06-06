import {Button } from "react-bootstrap";
import axios from "axios";
import { useState,useEffect } from "react";

const JSONGenerator = () => {
    const [launcherDetails,setlauncherDetails] = useState();
    const [testData,setTestData] = useState();
    const [isMountOne,setIsMountOne] = useState(false);
    const [isMountTwo,setIsMountTwo] = useState(false);
    const [isMountThree,setIsMountThree] = useState(false);
    const [testSuiteHeadings,setTestSuiteHeadings] = useState([]);

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
    }


    // const jsonHandler=() => {
    //     const json = JSON.stringify(testSteps);
    //     saveAs(new Blob([json], { type: 'application/json;charset=utf-8' }), 'file.json');
    //   }


    return(
        <>
            <Button variant="danger" class="btn btn-info" onClick={generateFinalJSON}>Generate JSON</Button>
        </>
    );
}

export default JSONGenerator;
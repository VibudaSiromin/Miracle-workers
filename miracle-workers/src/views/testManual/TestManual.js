import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import Launcher from "../../components/launcher/index";
import axios from "axios";
import { useParams } from "react-router-dom";
import Alert from "../../components/Alert";

const TestManual = (props) => {
    const { tname } = useParams();
    const [title, setTitle] = useState([]);

    const getTestSuiteHeadings = () => {
        axios
            .get('http://localhost:5000/testJunction/testManual/' + tname + '/getHeading')
            .then((res) => {
                const testTitles = res.data.getTestHeadings;
                setTitle(testTitles)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getTestSuiteHeadings();
    }, [tname])


    return (
        <>
            <Alert/>
            <div className="table-title">
                <h1><b>Launcher</b></h1>
            </div>
            <Launcher />
            <hr className="horizontal-ruler" />
            <div className="test-sheet-title">
                <h1><b>Test Sheet</b></h1>
            </div>
            <Table title={title} noFields={[3, 7]} generalPurpose={false} enableChainPopUps={true} callingFrom="testSuites" addBtnId={'testMBtn'}></Table>
        </>

    )
}


export default TestManual;

//export default TestManual;
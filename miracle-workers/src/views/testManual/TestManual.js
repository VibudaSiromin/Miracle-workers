import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import Launcher from "../../components/launcher/index";
import axios from "axios";
import { useParams } from "react-router-dom";

const TestManual = () => {
  const { tname } = useParams();
  const [title, setTitle] = useState([]);

  const getTestSuiteHeadings = () => {
    axios
      .get(
        "http://localhost:5000/testJunction/testManual/" + tname + "/getHeading"
      )
      .then((res) => {
        const testTitles = res.data.getTestHeadings;
        setTitle(testTitles);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getTestSuiteHeadings();
  }, [tname]);

  // const title=[
  //     "group",
  //     "instruction",
  //     "command",
  //     "locator",
  //     "locatorParameter",
  //     "data",
  //     "swapResult",
  //     "branchSelection",
  //     "action",
  //     "comment",
  //   ]

  return (
    <>
      <Launcher />
      <Table
        title={title}
        noFields={[3, 7]}
        generalPurpose={false}
        enableChainPopUps={true}
        callingFrom="testSuites"
      ></Table>
    </>
  );
};

export default TestManual;

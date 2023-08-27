import React from "react";
import Table from "../../components/Table";
import Launcher from "../../components/launcher/index";

const TestJson = () => {

    const title=[
        "group",
        "instruction",
        "command",
        "locator",
        "locatorParameter",
        "data",
        "swapResult",
        "branchSelection",
        "action",
        "comment",
      ]

    return(
        <>
            <Launcher/>
            <Table title={title} noFields={[3, 7]} generalPurpose={false} enableChainPopUps={true} callingFrom="testSuites" addBtnId={'testJBtn'}></Table>
        </>
 
    )
}

export default TestJson;
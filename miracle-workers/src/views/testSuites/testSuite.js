import React from "react";
import Table from "../../components/Table";

const testSuite = () => {

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
        <Table title={title} noFields={[3, 7]} generalPurpose={false} enableChainPopUps={true}></Table>
    )
}

export default testSuite;
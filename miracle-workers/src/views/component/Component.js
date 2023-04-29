import React from "react";
import Table from "../../components/Table";

const testSuite = () => {

    const title=[
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
        <Table title={title} noFields={[2, 7]} generalPurpose={false} enableChainPopUps={true} callingFrom="component"></Table>
    )
}

export default testSuite;
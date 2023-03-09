import React from 'react';
import Table from '../Table';

const Locator = (props) => {
    const titles=['Locator Name', 'Locator Value'];
  return (
    <>
    <Table title={titles} dropHeading={null} generalPurpose={true} noFields={titles.length} enableChainPopUps={false} purpose="fillData" removeHeading={props.removeHeading} initialData={props.initialData}/>
    </>
  )
}

export default Locator
import React from 'react';
import Table from '../Table';

const Locator = (props) => {
    const titles=['Locator Name', 'Locator Value'];
  return (
    <>
    <Table title={titles} generalPurpose={true} noFields={[titles.length]} enableChainPopUps={false} purpose="fillData" removeHeading={false} initialData={[]}/>
    </>
  )
}
export default Locator
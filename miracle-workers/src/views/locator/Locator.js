import React from 'react'
import Table from '../../components/Table';

const locator = () => {
    const titles=['Locator Name', 'Locator Value'];
  return (
    <>
    <Table title={titles} generalPurpose={true} noFields={[titles.length]} enableChainPopUps={false} purpose="fillData" removeHeading={false} initialData={[]}/>
    </>
  )
}

export default locator



import React from 'react'
import Table from '../../components/Table';
import Alert from '../../components/Alert';

const locator = () => {
  const titles = ['Locator Name', 'Locator Value'];
  return (
    <>
      <Alert />
      <Table title={titles} generalPurpose={true} noFields={[titles.length]} enableChainPopUps={false} purpose="fillData" removeHeading={false} initialData={[]} callingFrom="locator" addBtnId={'locBtn'} />
    </>
  )
}

export default locator



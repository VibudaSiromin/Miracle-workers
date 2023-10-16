import React, { useEffect, useState } from "react";
import { setAlertVisibity } from "../store";
import { connect, useDispatch, useSelector } from "react-redux";
import { CAlert } from '@coreui/react'
import CIcon from '@coreui/icons-react';
import { cilWarning } from '@coreui/icons'

const AlertBox = (props) => {
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();

    const alertVisibityStatus = useSelector((state) => state.getAlertVisibityStatus.alertVisibility);
    console.log('macTevish', alertVisibityStatus);

    useEffect(() => {
        setVisible(props.visibityStatus);
    }, [alertVisibityStatus]);

    const testPageName = props.referredTestPageName;
    const operationType = props.operationType;
    console.log('google', operationType)
    //const nullFreeTestPageNames = testPageName.filter(item => item !== null);;
    let alertMsg;
    console.log('romio', testPageName);
    if (testPageName.length > 1) {
        if (operationType === 'delete') {
            alertMsg = "Selected sheet is refered by " + "'" + testPageName + "'" + " test sheets in the test suite section.Delete opertion has been terminated!";
        } else if (operationType === 'rename') {
            alertMsg = "Selected sheet is refered by " + "'" + testPageName + "'" + " test sheets in the test suite section.Rename opertion has been terminated!";
        }

    } else {
        if (operationType === 'delete') {
            alertMsg = "Selected sheet is refered by " + "'" + testPageName + "'" + " test sheet in the test suite section.Delete opertion has been terminated!";
        } else if (operationType === 'rename') {
            alertMsg = "Selected sheet is refered by " + "'" + testPageName + "'" + " test sheet in the test suite section.Rename opertion has been terminated!";
        }
    }

    if (operationType === 'delete') {
        return (
            <>
                {visible &&
                    <>
                        <CAlert color="danger" variant="solid" dismissible className="d-flex align-items-center" visible={visible} onClose={() => dispatch(setAlertVisibity(false))}>
                            <CIcon icon={cilWarning} className="flex-shrink-0 me-2" width={24} height={24} />
                            <div>{alertMsg}</div>
                        </CAlert>
                    </>
                }
            </>
        )
    } else {
        return (
            <>
                {visible &&
                    <>
                        <CAlert color="warning" variant="solid" dismissible className="d-flex align-items-center" visible={visible} onClose={() => dispatch(setAlertVisibity(false))}>
                            <CIcon icon={cilWarning} className="flex-shrink-0 me-2" width={24} height={24} />
                            <div>{alertMsg}</div>
                        </CAlert>
                    </>
                }
            </>
        )
    }


}

const mapStateToProps = (state) => {
    return {
        visibityStatus: state.getAlertVisibityStatus.alertVisibility,
        referredTestPageName: state.getReferredTestSheetName.testSheetName,
        operationType: state.getOperationType.optType
    }
};

export default connect(mapStateToProps)(AlertBox);

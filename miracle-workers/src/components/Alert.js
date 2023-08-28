import React, { useEffect, useState } from "react";
import { setAlertVisibity } from "../store";
import { connect, useDispatch, useSelector } from "react-redux";
import { CAlert } from '@coreui/react'
import CIcon from '@coreui/icons-react';
import {cilWarning} from '@coreui/icons'

const AlertBox = (props) => {
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();

    const alertVisibityStatus = useSelector((state) => state.getAlertVisibityStatus.alertVisibility);
    console.log('macTevish',alertVisibityStatus);

    useEffect(() => {
        console.log('romio');
        setVisible(props.visibityStatus);
    }, [alertVisibityStatus])

    return(
        <>
         {visible &&
                <>
                <CAlert color="danger" variant="solid" dismissible className="d-flex align-items-center" visible={visible} onClose={() => dispatch(setAlertVisibity(false))}>
                    <CIcon icon={cilWarning} className="flex-shrink-0 me-2" width={24} height={24} />
                    <div>Selected data sheet is refered by the test suite section.Delete opertion has been terminated!!</div>
                </CAlert>
                </>
            }
        </>
    )

}

const mapStateToProps = (state) => {
    return {
        visibityStatus: state.getAlertVisibityStatus.alertVisibility
    }
};

export default connect(mapStateToProps)(AlertBox);

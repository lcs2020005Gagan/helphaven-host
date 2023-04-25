import React from 'react'
import {TiWarning} from 'react-icons/ti'
import {ImCross} from 'react-icons/im'

function FailureAlert(props) {
    return (
        <div className='FAlert'>
            <div className="FAlertIcon">
                <TiWarning/>
            </div>
            <div className="FAlertContent">

            <div className="FAlertHeading">
                {props.heading}
            </div>
            <div className="FAlertMessage">
                {props.message}
            </div>
            </div>
            <div className="AlertIconCross" onClick={()=>props.setNegativeSentiment(false)}>
            <ImCross/>
            </div>
        </div>
        )
}

export default FailureAlert
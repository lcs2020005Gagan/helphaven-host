import React from 'react'

function SuccessAlert(props) {
  return (
    <div className='SuccessAlert'>
      <div className="SuccessAlertHeading">
        {props.heading}
      </div>
      <div className="SuccessAlertMessage">
        {props.message}
      </div>
    </div>
  )
}

export default SuccessAlert
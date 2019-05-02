import React, {Component} from 'react'

//TODO: replace the components name after get all componenets. some will reuse in different pages
export const input_type_1 = (event_handler, text) => {
  return(
    <div className="d-flex justify-content-center p-2">
      <input className="col input-type1" onChange={event_handler} placeholder={text}/>
    </div>
  )
}

export const input_password_type_1 = (event_handler, text) => {
  return(
    <div className="d-flex justify-content-center p-2">
      <input className="col input-type1" type="password" onChange={event_handler} placeholder={text}/>
    </div>
  )
}

export const checkbox_type_1 = (event_handler, description) => {
  return(
    <div className="d-flex justify-content-center p-2">
      <input className ="checkbox-type1" type="checkbox"/>
      <label className="text-small">
        I already have an account I consent to Telehealth, terms and privacy policy. All information is strictly confidential and is used to help our professionals provide the best care for you.
      </label>
    </div>
  )
}

export const confirm_button_type_1 = (event_handler, description) => {
  return(
    <div className="d-flex justify-content-center p-2">
      <input className ="col btn-confirm text-btn" onClick={event_handler} type="button" value={description}/>
    </div>
  )
}

export const text_button_type_1 = (event_handler, description) => {
  return(
    <div className="d-flex justify-content-center p-2">
       <div className="text-btn2"><div className ="link-type1" onClick={event_handler}>{description}</div></div>
    </div>
  )
}

export const text_big_type_1 = text => {
  return(
    <div className="d-flex justify-content-center text-big">
      <p>{text}</p>
    </div>
  )
}

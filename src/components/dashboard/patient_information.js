import React, {Component} from 'react';
import * as components from '../question_components/components'
import { connect } from 'react-redux'
import Moment from 'moment';
import {get_patient_details} from "../../actions/therapist_action"


//get_patient_details

//shared by patient and therapist, need to pass proper function to send message
//use data in props if we already got data in parent

class PatientInformation extends Component {

  constructor(props){
    super(props) 
    this.state = {
      patient:this.props.patient,
      details:null
    }
  }

  componentDidMount = () => {
    const patient = this.props.patient 
  }

  componentWillReceiveProps = (next_props) => { 
    this.setState({patient:next_props.patient}) 
  }


  //messenger -> better to get initial data in here to get all data before rendering the view and get correct scroll position
  back_btn_handler = () => {
    this.props.update_state_handler(null,null)
  }


  patient_basic_info = () => {
    return <div className="align-self-start main-content-wide-card">
      <div className="d-flex flex-column card-items-container">
        <div className="d-flex flex-column justify-content-center patient_basic-info">
          <div className = "d-flex flex-column">
            <div className = "small-card-title">Patient Profile Information</div>
            <div className = "d-flex flex-row"> 
              <div className = "d-flex align-items-center patient-info-photo-holder">
              
                <img className = "patient-info-photo" src={process.env.PUBLIC_URL + '/img/photo.png'}/>
              </div>
              <div className = "d-flex flex-column patient-basic-right">
                <div className = "patient-basic-right title"> {this.state.patient.user.first_name + " "+ this.state.patient.user.last_name} </div>
                <div className = "d-flex flex-row patient-basic-right item">
                  <div className = "patient-basic-left-item">Email :</div>
                  <div className = "patient-basic-right-item">{this.state.patient.user.email}</div>
                </div> 
                <div className = "d-flex flex-row patient-basic-right item">
                  <div className = "patient-basic-left-item">Telephone number:</div>
                  <div className = "patient-basic-right-item">{this.state.patient?this.state.patient.visit.answers[0].response||"Not provided":"Not provided"}</div> 
                </div>
              </div>
            </div>
          </div> 
        </div>
      </div> 
    </div>
  }


  patient_referral_info = () => {
    return <div className="align-self-start main-content-wide-card">
      <div className="d-flex flex-column card-items-container">
        <div className="d-flex flex-column justify-content-center patient_basic-info">
          <div className = "d-flex flex-column">
            <div className = "referral-card-title">Patient referral Information</div>
             <div className = "d-flex flex-column">
               <div className = "d-flex flex-row"> 
                <div className = "patient-referral-left">   
                  Date of referral: 
                </div>
                <div className = "patient-referral-right">   
                  {this.state.patient?Moment(this.state.patient.visit.service_line.created_at).format('MM/DD/YYYY'):null} 
                </div>
               </div>

               <div className = "d-flex flex-row"> 
                <div className = "patient-referral-left">   
                  Referred for: 
                </div>
                <div className = "patient-referral-right">   
                  {this.state.patient?this.state.patient.visit.service_line.title:null} 
                </div>
               </div>

               <div className = "d-flex flex-row"> 
                <div className = "patient-referral-left patient-referral-last">   
                  Referral status: 
                </div>
                <div className = "patient-referral-right patient-referral-last">   
                  <img className = "patient-info-status-icon" src={process.env.PUBLIC_URL + '/img/ready.png'}/>
                  Patient has not completed assessment 
                </div>
               </div>
            </div>
          </div> 
        </div>
      </div> 
    </div>
  }

  patient_prescriber_info = () => {
    return <div className="align-self-start main-content-wide-card">
      <div className="d-flex flex-column card-items-container">
        <div className="d-flex flex-column justify-content-center patient_basic-info">
          <div className = "d-flex flex-column">
            <div className = "referral-card-title">NOTES FOR PRESCRIBER</div>
             <div className = "d-flex flex-column">

               <div className = "d-flex flex-row"> 
                <div className = "patient-referral-left">   
                  Treatment duration:
                </div>
                <div className = "patient-referral-right">   
                  {this.state.patient?this.state.patient.visit.answers[2].response||'Information not provided':'Information not provided'} 
                </div>
               </div>

               <div className = "d-flex flex-row"> 
                <div className = "patient-referral-left">   
                  Support network:
                </div>
                <div className = "patient-referral-right">   
                  {this.state.patient?this.state.patient.visit.answers[3].response||'Information not provided':'Information not provided'} 
                </div>
               </div>

               <div className = "d-flex flex-row"> 
                <div className = "patient-referral-left">   
                  Self harm/Violent tendencies:
                </div>
                <div className = "patient-referral-right">   
                  {this.state.patient?this.state.patient.visit.answers[4].response||'Information not provided':'Information not provided'} 
                </div>
               </div>

               <div className = "d-flex flex-row"> 
                <div className = "patient-referral-left">   
                  Diagnoses notes:
                </div>
                <div className = "patient-referral-right">   

                  {this.state.patient?this.state.patient.visit.answers[5].response||'Information not provided':'Information not provided'} 
                </div>
               </div>
               <div className="d-flex flex-row align-items-center message-input-area-no-margin">
                <input ref="msg_input" className="col message-input" onChange={this.update_msg_handler} type='text' placeholder='Add addisional notes' defaultValue=""/> 
                <img src={process.env.PUBLIC_URL + '/img/input_arrow.svg'} className="message-submit"/>
              </div>
            </div>
          </div> 
        </div>
      </div> 
    </div>
  }

  default_view = () => {
    return (  
      <div className="d-flex flex-column profile-main-content">
        <div className="d-flex flex-row justify-content-between">
            <div className="message-button-holder message-button" onClick={e=>this.back_btn_handler()}>
              {"<	Back to Patient list"}
            </div>
 
          <div className="d-flex justify-content-end text-main-title">PATIENT PROFILE</div>
        </div>
        <div className="d-flex flex-column main-content-row">
          {this.patient_basic_info()}   
          {this.patient_referral_info()} 
          {this.patient_prescriber_info()} 
        </div>
      </div> 
    ) 
  }


  //TODO: update url based on the type

  render(){
    return(
      this.default_view()
    ) 
  }
  
}

export default connect(null, {get_patient_details})(PatientInformation)


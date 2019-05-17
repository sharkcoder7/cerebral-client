import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { set_current_question_bank_by_name, update_patient_question_banks, upload_photo_id, update_patient_state, move_next_step, create_patient_from_user,create_visit,update_service_line,answer_current_question } from '../../actions/patient_action'
import { register_user, sign_in} from '../../actions/user_auth_action'
import { update_app_state } from '../../actions/'
import * as utils from '../../utils/common.js'
import ReactGA from 'react-ga'


//TODO: implement wrapper for banks, ex) question, function to move to next bank or set new bank
//TODO: Implement function for URL checking
class QuestionBank extends Component{
  
  constructor(props){
    super(props)
    //TODO: not sure if we want to use one container for q-banks or seperate
    this.state = {
      bank_step:null, 
    }
  }

  componentDidMount(){
    //TODO: this part should be moved to wrapper and thie component will check only one bank
    const {bank_name, question_banks_step, question_banks, patient_state, update_patient_state} = this.props
    const step = this.props.question_banks_step;

    if(bank_name === question_banks[step]){
      this.setState({bank_step:step})
    }else if(question_banks && question_banks[step]){
      this.setState({bank_step:step})
      update_patient_state(question_banks[step])
      this.props.set_current_question_bank_by_name(question_banks[step]) 
      this.props.history.push("/patient/"+question_banks[step]) 
    } 
  }

  componentDidUpdate(){
    const {question_banks_step, question_banks, update_patient_state} = this.props
    if(this.state.bank_step!==question_banks_step){
      this.setState({bank_step: question_banks_step})
      update_patient_state(question_banks[question_banks_step])
      this.props.set_current_question_bank_by_name(question_banks[question_banks_step]) 
      this.props.history.push("/patient/"+question_banks[question_banks_step]) 

    }
  }

  /*local event this*/
  next_step_handler=(e)=>{
    const {move_next_step} = this.props
    move_next_step(this.props.question_step)
  }

  set_selector_handler=(e, option)=>{
    const {move_next_step, answer_current_question} = this.props
    answer_current_question(option.option_name)
    move_next_step(this.props.question_step)
  }

  submit_answer_and_next_step = (ans) => {
		const {move_next_step, answer_current_question} = this.props
    answer_current_question(ans) 
		move_next_step(this.props.question_step)
  }

  set_bank_selector_handler=(e, option)=>{

		const {question_banks_step, answer_current_question, set_current_question_bank_by_name, move_next_step, update_patient_question_banks, update_service_line} = this.props

    answer_current_question(option.option_name) 

	  if (option.question_bank_names.length > 0) {
			if (option.immediate) {
				update_patient_question_banks(option.question_bank_names, 0)
			}
			else {
				update_patient_question_banks(this.props.question_banks.concat( option.question_bank_names), question_banks_step)
        update_service_line(option.name)	
		    move_next_step(this.props.question_step)
			}
		}
  }

  did_create_patient = (state) => {
    const service_line = this.props.service_line.id;
    console.log("check line id:", service_line)
    this.props.register_user(state)
      .then(() => {return this.props.sign_in(state)})
        .then(() => { return this.props.create_patient_from_user() })
          .then( () => {return this.props.create_visit(service_line)})
            .then(() => {return this.props.move_next_step(this.props.question_step)})
      .catch((err) => {
        console.log(err)
      })
  }

  submit_and_upload_id = (data, type) => { 
    const { upload_photo_id, move_next_step, answer_current_question,
            current_user} = this.props
    upload_photo_id(current_user.attributes.id, data, type)
    move_next_step(this.props.question_step)
  }


	display_title = (questions, step) =>{
		if(questions && questions[step]){
			return questions[step].title
		}
	}


  render(){
    const handlers = {
      next_step_handler:this.next_step_handler,
      set_selector_handler:this.set_selector_handler,
      set_bank_selector_handler:this.set_bank_selector_handler,
      did_create_patient: this.did_create_patient,
      submit_answer_and_next_step: this.submit_answer_and_next_step.bind(this),
      submit_and_upload_id:this.submit_and_upload_id.bind(this)
    }
    
    return(
		  <div className="d-flex flex-column">
        <div className="d-flex flex-column question-container">
					<div className="d-flex justify-content-center text-big">
            <p>{this.display_title(this.props.questions, this.props.question_step)}</p>
          </div>
					{utils.map_type_to_component(this.props.questions, this.props.question_step, handlers)}
				</div>
			</div>
    );
  }
}

//TODO: elaborate to save memory
const mapStateToProps = (state) => {

  const {
    global_reducer: {app_state, current_user},
    patient_reducer: {service_line, question_banks,question_banks_step, patient_state, step, question_bank_id, questions, current_bank_name, is_complete}
  } = state

  return {
    app_state: app_state,
		question_banks: question_banks,
    question_banks_step: question_banks_step,
    current_user: current_user,
    service_line: service_line,
    patient_state: patient_state,
    question_step: step,
    question_bank_id: question_bank_id,
    bank_name:current_bank_name,
    questions: questions,
    is_complete: is_complete
  }
}

export default withRouter(connect(mapStateToProps, {update_patient_question_banks,upload_photo_id, update_app_state, register_user, sign_in, move_next_step, create_patient_from_user, create_visit, update_service_line,answer_current_question, update_patient_state,set_current_question_bank_by_name}) (QuestionBank))

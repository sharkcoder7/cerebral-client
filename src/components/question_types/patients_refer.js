import React, {Component} from 'react'
import * as components from '../question_components/components'


//get submit and skip handler
class PatientsRefer extends Component {
	constructor(props){
		super(props)
		this.state = {
      update:false,
      total_items:3,
      items: [{email:null, name:null}, {email:null, name:null}, {email:null, name:null}]
		}
	}
 
  shouldComponentUpdate=()=>{
    return this.state.update
  }

  remove_item_handler = e => {
    
    if(this.state.total_items>3){
      const new_items = this.state.items.slice(0,-1);
      const new_num = this.state.total_items-1;
      this.setState({total_items: new_num,
                     items:new_items});
      this.forceUpdate();
    } 
  }

  //TODO: should find a way not to use forceUpdate
  add_item_handler = ()  =>{
    const new_items = this.state.items;
    new_items.push({email:null, name:null});
    this.setState({total_items: this.state.total_items+1,
                   items: new_items}); 
    this.forceUpdate();
  }

  update_item_handler = (index, type, e) => {
    var new_items = this.state.items;
    new_items[index][type] = e.target.value;
    this.setState({items: new_items});
  }

  submit_item_handler = () => {
    this.props.submit_action(this.state.items); 
  } 

	render(){	
    const event_handlers = {update:this.update_item_handler.bind(this), 
                      remove:this.remove_item_handler.bind(this)}
		return(
      <div className="d-flex flex-column therapist-question-container">
        <div className="d-flex justify-content-start patient-refer-description">
          <span>Please enter patient/s contact information.</span>
        </div>
        {[...Array(this.state.total_items)].map((e, index) => (components.patient_refer_inputs(event_handlers, this.state.items[index], index, this.state.total_items)))}  
        <div className="d-flex justify-content-end patient-refer-add-btn-holder">
          <div id='add_patient' className="add-patient-button" onClick={this.add_item_handler}>
            <img className="remove-button" src='/img/add_patient.png'/> <span className="add_patient_btn_text">Add patient</span>
          </div>
        </div>
        <div className="d-flex patient-refer-submit-btn-holder">
          <input id='submit_refer' className="patient-refer-submit-btn" onClick={this.submit_item_handler}  type="button" value="Submit and Continue"/>
        </div>
     </div>
		)
	}
}

export default PatientsRefer

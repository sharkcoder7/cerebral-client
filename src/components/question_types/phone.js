import React, {Component} from 'react'
import * as components from '../question_components/components'


//get submit and skip handler
class Phone extends Component {
	constructor(props){
		super(props)
		this.state = {
			phone_number:true
		}
	}

	phone_number_handler = e => {	
		this.setState({phone_number:e.target.value})
	}

  skip_btn_handler = e => {
    this.psops.skip_action()
  }

  confirm_btn_handler = e => {
    this.props.submit_action()
  }

	render(){	
		return(
			<div>
				{components.input_type_1(this.phone_number_handler, "Phone number")}
				<div className="d-flex flex-row justify-content-center">
					{components.btn_selector(this.skip_btn_handler, "Skip")}	
					{components.btn_selector(this.confirm_btn_handler, "Confirm Phone Number")}	
				</div>
			</div>
		)

	}
}

export default Phone

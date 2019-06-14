import React, {Component} from 'react';
import {injectStripe} from 'react-stripe-elements'
import {CardElement,CardNumberElement} from 'react-stripe-elements'
import * as components from '../question_components/components'

class PaymentElements extends Component {

  constructor(props){
    super(props)
    this.state = {
        payment_full_name: ''
      }
  }

  update_handler = (e) => { 

    // Handle result.error or result.token
    this.props.stripe.createToken({name: this.state.payment_full_name}).then((result) => {
        this.props.submit_payment(this.state.payment_full_name, result.token)
        })
    }

    update_property = (which, e) => {
        this.state[which] = e.target.value
    }

  
  render(){
    const createOptions = (fontSize) => {
        return {
          style: {
            base: {
            fontSize: `${fontSize}px`,
            height: '60px',
            width:  '500px',
            'border-radius': '2px',
            'border-style': 'solid',
            'border-width': '2px',
            'border-color': 'rgba(37, 0, 68, 1.0)',
            color: 'black',
            fontFamily: 'ProximaNova-Bold", Helvetica, Arial',
            '::placeholder': {
                color: "#868e96",
            },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        };
      }
    return (
      <div className="patient_shipping">
      {components.input_type_autocomplete(this.update_property.bind(this, 'payment_full_name'), "Card Holder Name", 'cc-name')}
        <CardElement className = "form-control" {...createOptions(20)}/>
        {components.confirm_button_type_1(this.update_handler, "Confirm Payment Information >")}
      </div>
    );
  }
}

export default injectStripe(PaymentElements);

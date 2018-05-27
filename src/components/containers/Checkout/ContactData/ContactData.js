import React, { Component } from 'react'
import Button from '../../../UI/Button/Button';
import classes from './ContactData.css';

export default class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address:  {
      street: '',
      zipcode: ''
    }
  }

  render() {
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact information</h4>
        <form>
          <input className={classes.Input} type="text" name="name" placeholder="Your name" />
          <input className={classes.Input} type="email" name="email" placeholder="Email" />
          <input className={classes.Input} type="text" name="street" placeholder="Street" />
          <input className={classes.Input} type="text" name="zipcode" placeholder="Zipcode" />
          <Button buttonType="Success">ORDER</Button>
        </form>
      </div>
    )
  }
}

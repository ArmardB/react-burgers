import React, { Component } from 'react'
import Button from '../../../UI/Button/Button';
import Spinner from '../../../UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../../axios-orders';


export default class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address:  {
      street: '',
      zipcode: ''
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    
    this.setState({ loading: true});
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Armard',
        address: {
          street: '123 Front St',
          city: 'Philadelphia',
          state: 'Georgia'
        },
        email: 'testuser@user.com',
        deliveryMethod: 'express'
      }
    }
    axios.post('/orders.json', order)
    .then(response => {
      this.setState({loading: false});
      this.props.history.push('/');
    }).catch(error => {
      console.log('Error: ', error);
      this.setState({ loading: false });
    });
  }

  render() {
    let form = (
      <form>
      <input className={classes.Input} type="text" name="name" placeholder="Your name" />
      <input className={classes.Input} type="email" name="email" placeholder="Email" />
      <input className={classes.Input} type="text" name="street" placeholder="Street" />
      <input className={classes.Input} type="text" name="zipcode" placeholder="Zipcode" />
      <Button buttonType="Success" clicked={this.orderHandler}>ORDER</Button>
    </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact information</h4>
        {form}
      </div>
    )
  }
}

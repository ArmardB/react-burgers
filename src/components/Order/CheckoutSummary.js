import React from 'react';
import Burger from '../Burger/Burger';
import Button from '../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => {

  return (
    <div className={classes.CheckoutSummary}>
      <h1>Here's your tasty burgeer</h1>
      <div style={{width: '100%', margin: 'auto'}}>
        <Burger ingredients={props.ingredients}/>
      </div>
      <Button 
      clicked={props.checkoutCancelled}
      buttonType="Danger">
        CANCEL</Button>
      <Button 
        buttonType="Success" 
        clicked={props.checkoutContinued}>
          CONTINUE
      </Button>
    </div>
  );
}

export default checkoutSummary;
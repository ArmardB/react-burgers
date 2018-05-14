import React from 'react';
import BuildControl from './BuildControl/BuildControl';

import classes from "/Users/armardbellamy/Desktop/React/react-burgers/src/components/Burger/BuildControls/BuildControls.css";

const controls = [
  { label: "Lettuce", type: "lettuce" },
  { label: "Bacon", type: "bacon" },
  { label: 'Meat', type: 'meat'},
  { label: 'Cheese', type: 'cheese'},
];

const BuildControls = (props) => {
  return <div className={classes.BuildControls}>
      <p>
        Current Price: <strong>{props.price.toFixed(2)}</strong>
      </p>
      {controls.map(control => {
        return <BuildControl key={control.label} label={control.label} added={() => props.ingredientAdded(control.type)} removed={() => props.ingredientRemoved(control.type)} disabled={props.disabled[control.type]} />;
      })}
      <button className={classes.OrderButton} disabled={!props.purchaseable}>ORDER NOW</button>
    </div>;
}

export default BuildControls;

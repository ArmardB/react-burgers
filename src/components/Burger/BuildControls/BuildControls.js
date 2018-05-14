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
      {controls.map(control => {
        return <BuildControl key={control.label} label={control.label} added={() => props.ingredientAdded(control.type)} />;
      })}
    </div>;
}

export default BuildControls;

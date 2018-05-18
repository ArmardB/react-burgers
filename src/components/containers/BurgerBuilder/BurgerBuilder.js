import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Burger from '../../Burger/Burger';
import BuildControls from "/Users/armardbellamy/Desktop/React/react-burgers/src/components/Burger/BuildControls/BuildControls.js";
import Modal from '../../../components/UI/Modal/Modal';
import Spinner from '../../UI/Spinner/Spinner';
import OrderSummary from '../../Burger/OrderSummary/OrderSummary';
import axios from '../../../axios-orders';

const INGREDIENT_PRICES = {
  lettuce: 0.5,
  cheese: 0.6,
  meat: 1.75,
  bacon: .86
}

class BurgerBuilder extends Component {

  state = {
    ingredients: {
      lettuce: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 3.99,
    purchaseable: false,
    purchasing: false,
    loading: false,
  }

  addIngredientHandler = (type) => {
    const oldIngredientCount = this.state.ingredients[type];
    const updatedCount = oldIngredientCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    }

    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type]
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients,
    });
    this.updatePurchaseState(updatedIngredients);

  }

  removeIngredientHandler = (type) => {
    const oldIngredientCount = this.state.ingredients[type];
    if (oldIngredientCount <= 0) {
      return;
    }
    const updatedCount = oldIngredientCount - 1;
    const updatedIngredients = { ...this.state.ingredients };

    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;

    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });
    this.updatePurchaseState(updatedIngredients);
  }

  updatePurchaseState(ingredients) {

    const sum = Object.keys(ingredients)
          .map(igKey => {
            return ingredients[igKey]
          })
          .reduce((sum, el) => {
            return sum + el;
          }, 0);

          this.setState({
            purchaseable: sum > 0
          })
  }

  purchaseHandler = () => {
    this.setState({
      purchasing: true
    })
  }

  purchasedCancelHandler = () => {
    this.setState({
      purchasing: false
    })
  }

  purchaseContinueHandler = () => {
    // alert('You continue');
    this.setState({
      loading: true
    });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
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
      // console.log(response)
      this.setState({loading: false, purchasing: false});
    }).catch(error => {
      console.log('Error: ', error);
      this.setState({ loading: false, purchasing: false });
    });
  }


  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = <OrderSummary
      ingredients={this.state.ingredients}
      purchaseCanceled={this.purchasedCancelHandler}
      purchaseContinued={this.purchaseContinueHandler}
      price={this.state.totalPrice}
    />

    if (this.state.loading) {
      orderSummary = <Spinner />
    }
    return <Aux>
        <Modal
           show={this.state.purchasing}
           modalClosed={this.purchasedCancelHandler}>
          {orderSummary}
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchaseable={this.state.purchaseable}
          ordered={this.purchaseHandler} />
      </Aux>;
  }
}

export default BurgerBuilder;

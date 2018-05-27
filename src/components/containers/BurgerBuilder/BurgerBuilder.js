import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Burger from '../../Burger/Burger';
import BuildControls from '../../../components/Burger/BuildControls/BuildControls';
import Modal from '../../../components/UI/Modal/Modal';
import Spinner from '../../UI/Spinner/Spinner';
import OrderSummary from '../../Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../../axios-orders';

const INGREDIENT_PRICES = {
  lettuce: 0.5,
  cheese: 0.6,
  meat: 1.75,
  bacon: .86
}

class BurgerBuilder extends Component {

  state = {
    ingredients: null,
    totalPrice: 3.99,
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    axios.get('https://react-burgers-7e653.firebaseio.com/ingredients.json')
      .then(response => {
        this.setState({
          ingredients: response.data
        });
      }).catch(error => {
        this.setState({
          error: true
        });
      });
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
    // this.setState({
    //   loading: true
    // });
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: 'Armard',
    //     address: {
    //       street: '123 Front St',
    //       city: 'Philadelphia',
    //       state: 'Georgia'
    //     },
    //     email: 'testuser@user.com',
    //     deliveryMethod: 'express'
    //   }
    // }
    // axios.post('/orders.json', order)
    // .then(response => {
    //   // console.log(response)
    //   this.setState({loading: false, purchasing: false});
    // }).catch(error => {
    //   console.log('Error: ', error);
    //   this.setState({ loading: false, purchasing: false });
    // });

    const queryParam = [];

    for (let i in this.state.ingredients) {
      queryParam.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    }
    const queryString = queryParam.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search : '?' + queryString,
    });

  }


  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null
    let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchaseable={this.state.purchaseable}
            ordered={this.purchaseHandler} />
        </Aux>
      );
      orderSummary = <OrderSummary
        ingredients={this.state.ingredients}
        purchaseCanceled={this.purchasedCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        price={this.state.totalPrice}
      />
    }

    if (this.state.loading) {
      orderSummary = <Spinner />
    }
    return <Aux>
        <Modal
           show={this.state.purchasing}
           modalClosed={this.purchasedCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>;
  }
}

export default withErrorHandler(BurgerBuilder, axios);

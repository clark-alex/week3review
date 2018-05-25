import React, { Component } from 'react';
import axios from 'axios'
import Product from './Product'

const styles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
}

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      itemInput: '',
      priceInput: '',
      quantityInput: '',
    }
    this.deleteItem = this.deleteItem.bind(this)
    this.editItem = this.editItem.bind(this)
  }

  componentDidMount() {
    axios.get('/api/products').then((res) => {
      this.setState({
        products: res.data
      })
    })
  }
  
  addProduct() {
    let body = {
      itemInput: this.state.itemInput,
      priceInput: this.state.priceInput,
      quantityInput: this.state.quantityInput,
    }

    !body.itemInput
      ?
      alert('please fill out form')
      :
      axios.post('/api/products', body).then((res) => {
        this.setState({
          products: res.data,
          itemInput: '',
          priceInput: '',
          quantityInput: ''
        })
      })
  }

  deleteItem(id){
    axios.delete(`/api/products/${id}`).then(res=>{
      this.setState({
        products:res.data
      })
    })
  }
  editItem(id,item,price,quantity){
    const body={
      item:item,
      price:price,
      quantity:quantity
    }

    axios.put(`/api/products/${id}`,body).then((res)=>{
      this.setState({
        products:res.data
      })
    })
  }


  render() {
    console.log(this.state)
    let mappedProducts = this.state.products.map((e, i) => {
      return (
        <div key={i}>
          <Product

            id={e.id}
            product={e.item}
            price={e.price}
            quantity={e.quantity}
            deleteItem={this.deleteItem}
            editItem={this.editItem}

          />
        </div>
      )
    })
    return (
      <div style={styles}>
        <h3>item</h3>
        <input value={this.state.itemInput} onChange={(e) => this.setState({ itemInput: e.target.value })} />
        <h3>price</h3>
        <input value={this.state.priceInput} type='number' onChange={(e) => this.setState({ priceInput: e.target.value })} />
        <h3>quantity</h3>
        <input value={this.state.quantityInput} type='number' onChange={(e) => this.setState({ quantityInput: e.target.value })} />
        <button onClick={() => this.addProduct()}>add new product</button>
        {mappedProducts}
      </div>
    )
  }
};

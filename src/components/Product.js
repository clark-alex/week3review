import React, { Component } from 'react';
const styles = {
  background: 'grey',
  width: '500px',
  height: '110px',
  margin: '20px'
}
export default class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editToggle: false,
      editItem: '',
      editPrice: '',
      editQuantity: ''
    }
  }
  componentDidMount() {
    this.setState({
      editItem: this.props.product,
      editPrice: this.props.price,
      editQuantity: this.props.quantity
    })
  }

  edit() {
    if (this.state.editToggle) {
      this.props.editItem(this.props.id, this.state.editItem, this.state.editPrice, this.state.editQuantity)
      this.setState({
        editToggle: !this.state.editToggle
      })
    } else {
        this.setState({
          editToggle: !this.state.editToggle
        })
    }

  }


  render() {
    return (
      <div >
        {
          this.state.editToggle
            ?
            <div style={styles}>
              <input value={this.state.editItem} onChange={e => this.setState({ editItem: e.target.value })} />
              <br/>
              <input value={this.state.editPrice} onChange={e => this.setState({ editPrice: e.target.value })} />
              <br/>
              <input value={this.state.editQuantity} onChange={e => this.setState({ editQuantity: e.target.value })} />
            </div>
            :
            <div style={styles}>
              <h2>{this.props.product}</h2>
              <h3>${this.props.price}</h3>
              <h3>{this.props.quantity}</h3>
            </div>
        }


        <button onClick={() => this.edit()}>{this.state.editToggle ? 'save' : 'edit'}</button>
        <button onClick={() => this.props.deleteItem(this.props.id)}>delete</button>
      </div>
    )
  }
};


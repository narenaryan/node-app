import React from 'react'
import { Button, Form, Dropdown, Dimmer, Loader } from 'semantic-ui-react'
import axios from 'axios';
import ApiEndpoints from '../Api';

class PreviewComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.getInitialState()
    this.saveSelectedCategories = this.saveSelectedCategories.bind(this)
    this.postToMainComponent = this.postToMainComponent.bind(this)
    this.refreshMenu = this.refreshMenu.bind(this)
  }

  handleSkuChange(e, data) {
    this.setState({sku: data.value})
  }

  handleEanChange(e, data) {
    this.setState({ean: data.value})
  }

  handlePricechange(e, data) {
    this.setState({price: data.value})
  }

  handleQuantityChange(e, data) {
    this.setState({quantity: data.value})
  }

  handleNamechange(e, data) {
    this.setState({name: data.value})
  }

  postToMainComponent() {
    let body = { name: this.state.name,
      ean: this.state.ean,
      sku: this.state.sku,
      stockQuantity: this.state.quantity,
      price: this.state.price,
      categories: this.state.selectedCategories
    }
    this.props.postArticleToServer(body);
    this.setState(this.getInitialState())
    this.refreshMenu()
    this.setState({selectedCategories: []})
    window.location.reload();
  }

  getInitialState() {
    return {categories: [], selectedCategories: [], name: '', sku: '', ean: '', quantity: '', price: ''}
  }
  
  saveSelectedCategories(e, {value}) {
    this.setState({selectedCategories: value})
  }

  componentDidMount() {
    this.refreshMenu()
  }

  refreshMenu() {
    let self = this
    let config = {
      'headers': {'x-access-token': ApiEndpoints.jwtToken
    },
    };
    axios.get(ApiEndpoints.get.categories(), config)
    .then(function (response) {
      let rawCategories = response.data
      let polishedCategories = []
      rawCategories.forEach((item) => {
        polishedCategories.push({
          key: item._id,
          text: item._id,
          value: item._id
        })
      })
      self.setState({categories: polishedCategories})
    })
    .catch(function (error) {
    console.log(error);
    })
  }

  render() {
    return (
      <Form>
        <Form.Group unstackable widths={2}>
          <Form.Input label='Product SKU' value={this.state.sku} onChange={this.handleSkuChange.bind(this)} placeholder='SKU' />
          <Form.Input label='Product Name' value={this.state.name} onChange={this.handleNamechange.bind(this)} placeholder='Name' />
        </Form.Group>
        <Form.Group widths={2}>
          <Form.Input color="blue" label='EAN Number' value={this.state.ean}  onChange={this.handleEanChange.bind(this)} placeholder='EAN' />
          <Dropdown placeholder='Categories' onChange={this.saveSelectedCategories} fluid multiple search selection options={this.state.categories} />
        </Form.Group>
        <Form.Group widths={2}>
        <Form.Input label='Stock Quantity' value={this.state.quantity} onChange={this.handleQuantityChange.bind(this)} placeholder='Quantity' />
          <Form.Input label='Price (€)' value={this.state.price} onChange={this.handlePricechange.bind(this)} placeholder='€' />
        </Form.Group>
        <Button primary onClick={this.postToMainComponent}>Add</Button>
        <Dimmer inverted>
        <Loader inverted content='Loading' />
        </Dimmer>
      </Form>
    )
  }  
}

export default PreviewComponent
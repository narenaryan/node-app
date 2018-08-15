import React from 'react'
import { Button, Form, Dropdown } from 'semantic-ui-react'
import axios from 'axios';
import ApiEndpoints from '../Api';

class PreviewComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.getInitialState()
  }

  getInitialState() {
    return {categories: []}
  }

  componentDidMount() {
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
          <Form.Input label='Product SKU' placeholder='SKU' />
          <Form.Input label='Product Name' placeholder='Name' />
        </Form.Group>
        <Form.Group widths={2}>
          <Form.Input label='EAN Number' placeholder='EAN' />
          <Dropdown placeholder='Categories' fluid multiple search selection options={this.state.categories} />
        </Form.Group>
        <Button type='submit'>Save</Button>
      </Form>
    )
  }  
}

export default PreviewComponent
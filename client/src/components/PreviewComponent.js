import React from 'react'
import { Button, Form, Dropdown } from 'semantic-ui-react'

class PreviewComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {categories: [{key: "Shoes", text: "Shoes", value: "Shoes"},
      {key: "Footwear", text: "Footwear", value: "Footwear"},
      {key: "Jeans", text: "Jeans", value: "Jeans"},
      {key: "Shirts", text: "Shirts", value: "Shirts"},
      {key: "Shorts", text: "Shorts", value: "Shorts"}]
  }
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
          <Dropdown placeholder='Categories' fluid multiple selection options={this.state.categories} />
        </Form.Group>
        <Button type='submit'>Save</Button>
      </Form>
    )
  }  
}

export default PreviewComponent
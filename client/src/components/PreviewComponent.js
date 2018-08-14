import React from 'react'
import { Button, Form } from 'semantic-ui-react'

const PreviewComponent = () => (
  <Form>
    <Form.Group unstackable widths={2}>
      <Form.Input label='Product SKU' placeholder='SKU' />
      <Form.Input label='Product Name' placeholder='Name' />
    </Form.Group>
    <Form.Group widths={2}>
      <Form.Input label='EAN Number' placeholder='EAN' />
      <Form.Input label='Categories' placeholder='Categories' />
    </Form.Group>
    <Button type='submit'>Save</Button>
  </Form>
)

export default PreviewComponent
import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import { Table, Icon } from 'semantic-ui-react';
import axios from 'axios';
import ApiEndpoints from '../Api';

const TableRow = ({row}) => (
  <Table.Row>
    <Table.Cell key={row.name}>{row.name}</Table.Cell>
    <Table.Cell key={row.sku}>{row.sku}</Table.Cell>
    <Table.Cell key={row.ean}>{row.ean}</Table.Cell>
    <Table.Cell key={row.stockQuantity}>{row.stockQuantity}</Table.Cell>
    <Table.Cell key={row.price}>{row.price}</Table.Cell>
    <Table.Cell key={row.categoryNames.join(",")}>{row.categoryNames.join(", ")}</Table.Cell>
    <Table.Cell key={row._id}><Icon className="clickable" name='edit' /></Table.Cell>
  </Table.Row>
)

function setPreview() {
  console.log("test")
}

class ArticleListComponent extends React.Component {
  constructor(props) {
    super(props)
    // Replace with an axios call
    this.state = {articles: []}
  }
  componentDidMount() {
    let self = this
    let config = {
      "headers": {'x-access-token': ApiEndpoints.jwtToken
    },
    };
    axios.get(ApiEndpoints.get.articles(), config)
    .then(function (response) {
      for (let obj of response.data) {
        obj['categoryNames'] = obj['categories'].map(item => item._id);
        console.log(obj['categoryNames']);
      }
      self.setState({articles: response.data})
    })
    .catch(function (error) {
    console.log(error);
    })
  }
  
  getCategoryNames(categoryList) {
    return categoryList.map(item => item._id);
  }

  render() {
    return (
      <div>
      <Table color={'teal'} singleLine >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Product Name</Table.HeaderCell>
            <Table.HeaderCell>Product SKU</Table.HeaderCell>
            <Table.HeaderCell>EAN Number</Table.HeaderCell>
            <Table.HeaderCell>Stock Quantity</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>Categories</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.state.articles.map(row => {
              return <TableRow key={row._id} row={row} onClick={setPreview}/>
          })}
        </Table.Body>
      </Table>
      </div>
    )
  }
}

export default ArticleListComponent
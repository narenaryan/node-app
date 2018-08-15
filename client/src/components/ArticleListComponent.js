import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import { Table } from 'semantic-ui-react';
import axios from 'axios';
import ApiEndpoints from '../Api';

const TableRow = ({row}) => (
  <Table.Row>
    <Table.Cell key={row.name}>{row.name}</Table.Cell>
    <Table.Cell key={row.sku}>{row.sku}</Table.Cell>
    <Table.Cell key={row.ean}>{row.ean}</Table.Cell>
    <Table.Cell key={row.categories}>{row.categories}</Table.Cell>
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
    self.setState({articles: response.data})
    })
    .catch(function (error) {
    console.log(error);
    })
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
            <Table.HeaderCell>Categories</Table.HeaderCell>
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
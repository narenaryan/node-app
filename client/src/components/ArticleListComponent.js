import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import { Table } from 'semantic-ui-react';

const TableRow = ({row}) => (
  <Table.Row>
    <Table.HeaderCell key={row.name}>{row.name}</Table.HeaderCell>
    <Table.HeaderCell key={row.sku}>{row.sku}</Table.HeaderCell>
    <Table.HeaderCell key={row.ean}>{row.ean}</Table.HeaderCell>
    <Table.HeaderCell key={row.categories}>{row.categories}</Table.HeaderCell>
  </Table.Row>
)

class ArticleListComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {articles: [{
      name: "Adidas Shoe",
      sku: "jh45g3j4g5345",
      ean: 1234567890123,
      categories: ["Shoes", "Footwear"]
    }]}
  }
  render() {
    return (
      <Table singleLine >
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
              <TableRow row={row} />
          })}
        </Table.Body>
      </Table>
    )
  }
}

export default ArticleListComponent
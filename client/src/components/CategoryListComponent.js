import React from 'react';
import { Table, Icon } from 'semantic-ui-react';
import axios from 'axios';
import ApiEndpoints from '../Api';

const TableRow = ({row}) => (
  <Table.Row>
    <Table.Cell key={row._id}>{row._id}</Table.Cell>
    <Table.Cell key={row.parent}>{row.parent || ''}</Table.Cell>
    <Table.Cell key={row._id + 'edit'}><Icon name='edit' />&nbsp;&nbsp;<Icon name='delete' color='red'/></Table.Cell>
  </Table.Row>
)

class CategoryListComponent extends React.Component {
  constructor(props) {
    super(props)
    // Replace with an axios call
    this.state = {categories: []}
  }
  componentDidMount() {
    let self = this
    let config = {
      'headers': {'x-access-token': ApiEndpoints.jwtToken
    },
    };
    axios.get(ApiEndpoints.get.categories(), config)
    .then(function (response) {
    self.setState({categories: response.data})
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
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Parent Category</Table.HeaderCell>
        <Table.HeaderCell>Actions</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {this.state.categories.map(row => {
          return <TableRow key={row.name} row={row}/>
      })}
    </Table.Body>
  </Table>
  </div>
    )
  }
}

export default CategoryListComponent
let host = 'http://localhost:8000'
let apiVersion = 'v1'

let ApiEndpoints = {
  // Bad: Move this to cookie session after successful login
  jwtToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MzQzMjQ0MDMsImV4cCI6MTUzNDQxMDgwM30.jLwKDjseokninKZV1r49RhH-2LktMvNl4qRI-x1IDNk',
  get: {
    customer: (customerId) => {return `${host}/${apiVersion}/customer/${customerId}`},
    article: (articleId) => {return `${host}/${apiVersion}/article/${articleId}`},
    category: (categoryName) => {return `${host}/${apiVersion}/category/${categoryName}`},
    articles: () => {return `${host}/${apiVersion}/articles`},
    categories: () => {return `${host}/${apiVersion}/categories`}
  },
  post: {
    customer: ``,
    article: ``,
    category: ``
  },
  put: {
    customer: ``,
    article: ``,
    category: ``,
    articlesToCustomer: ``
  },
  delete: {
    customer: ``,
    article: ``,
    category: ``
  }
}

export default ApiEndpoints
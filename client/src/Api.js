let host = 'http://localhost:8000'
let apiVersion = 'v1'

let ApiEndpoints = {
  // Bad: Move this to cookie session after successful login
  jwtToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MzQ1NzM1MDMsImV4cCI6MTUzNDY1OTkwM30.-BMHxLK__923UMhWgbKXvKBl0Z0b6EMwI4hqj2nXSUw',
  get: {
    customer: (customerId) => {return `${host}/${apiVersion}/customer/${customerId}`},
    article: (articleId) => {return `${host}/${apiVersion}/article/${articleId}`},
    category: (categoryName) => {return `${host}/${apiVersion}/category/${categoryName}`},
    articles: () => {return `${host}/${apiVersion}/articles`},
    categories: () => {return `${host}/${apiVersion}/categories`}
  },
  post: {
    customer: ``,
    article: () => {return `${host}/${apiVersion}/article/create`},
    category: () => {return `${host}/${apiVersion}/category/create`}
  },
  put: {
    customer: ``,
    article: ``,
    category: ``,
    articlesToCustomer: ``
  },
  delete: {
    customer: ``,
    article: (articleId) => {return `${host}/${apiVersion}/article/${articleId}`},
    category: (categoryName) => {return `${host}/${apiVersion}/category/${categoryName}`}
  }
}

export default ApiEndpoints
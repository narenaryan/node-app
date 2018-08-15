let host = 'http://localhost:8000'
let apiVersion = 'v1'

let ApiEndpoints = {
  // Bad: Move this to cookie session
  jwtToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MzQyMzc3MTAsImV4cCI6MTUzNDMyNDExMH0.LhEmr_4rphoC_77PBrznKUsPP9GCxrRSei4T7jYpSMU',
  get: {
    customer: (customerId) => { return `${host}/${apiVersion}/customer/${customerId}`},
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
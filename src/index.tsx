import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs'

import App from './App';

createServer({
  models:{
    transaction: Model
  },
  seeds(server) {
    server.db.loadData({
      transactions:[
        {
          id: 1,
          title: 'Freela',
          type: 'deposit',
          category: 'Jobs',
          amount: 6000,
          createdAt: new Date()
        },
        {
          id: 2,
          title: 'Freela',
          type: 'deposit',
          category: 'Jobs',
          amount: 6000,
          createdAt: new Date()
        },
        {
          id: 3,
          title: 'Freela',
          type: 'withdraw',
          category: 'Health Care',
          amount: 1000,
          createdAt: new Date()
        }
      ]
    })
  },
  routes(){
    this.namespace = 'api'
    this.get('/transactions', ()=>{
      return this.schema.all('transaction')
    })
    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody)
      return schema.create('transaction', data)
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


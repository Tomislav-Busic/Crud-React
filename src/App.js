import React, { useState, createContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
/* import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; */


import Header from './components/Header';
import Home from './components/Home';
import Create from './components/Create'
import Users from './components/Users';
import Edit from './components/Edit';

export const AppContext = createContext();
/* const client = new QueryClient(); */

function App() {
  const [ darkTheme, setDarkTheme ] = useState(false);

  return (
    <div className="App">
      {/* <QueryClientProvider client={ client }> */}
        <AppContext.Provider value={ { darkTheme, setDarkTheme } }>
          <Router>
            <Header />
            <Routes>
              <Route path='/' element={ <Home /> }/>
              <Route path='/create' element={ <Create /> }/>
              <Route path='/users' element={ <Users /> }/>
              <Route path='/edit' element={ <Edit /> }/>
              <Route path='*' element={ <h1>Page Not Found</h1> }/>
            </Routes>
          </Router>
        </AppContext.Provider>
      {/* </QueryClientProvider> */}
    </div>
  );
}

export default App;


//npm i axios react-router-dom bootstrap react-bootstrap
//npm i @tanstack/react-query react-hook-form @hookform/resolvers
//npm i yup
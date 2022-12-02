import React, { useState, useContext } from 'react';
import { Table, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AppContext } from '../App';
import Forms from './Forms';

const Users = () => {
    /*Kada ne koristim useState(data) za 'users' podatke sve radi ok ali ne mogu koristiti select.
    Ovako i proradi ali kada refrešam sve se sruši*/
    const { data: usersdata, isLoading, error, refetch } =  useQuery(['key_users'], async () => {
    return await axios.get( 'https://638267ff9842ca8d3ca87c97.mockapi.io/crud-operations' )
                .then( ( res ) => res.data);
    });

    const { darkTheme } = useContext(AppContext);
    const [searchName, setSearchName] = useState(''); 
    const [data, setData] = useState(usersdata); 

    if ( isLoading ) {
        return <h1>Loading...</h1>
    }

    if ( error ) {
        return <h1>Error!</h1>
    }

    const handleEdit = ( id, name, lastName, email, age, phone ) => {
        localStorage.setItem( 'id', id );
        localStorage.setItem( 'name', name );
        localStorage.setItem( 'lastName', lastName );
        localStorage.setItem( 'email', email );
        localStorage.setItem( 'age', age );
        localStorage.setItem( 'phone', phone );
    }

    const handleDelete = (id) => {
        axios.delete( `https://638267ff9842ca8d3ca87c97.mockapi.io/crud-operations/${id}` )
             .then( refetch )
    }
    
    const ageSelect = ( value ) => {
        const newUsers = [...data];
        switch ( value ) {
            case 'higher': 
                setData(newUsers.sort((a,b) => b.age - a.age));
                break;
            case 'lower':
                setData(newUsers.sort((a,b) => a.age - b.age));
                break;
        }   
    
    }

  return (
    <div>
        <div className='d-flex justify-content-between'>
            <h3>Users</h3>
            <Link to='/create'>
                <Button variant="primary">Create</Button>
            </Link>
        </div>

        <br />
        <Forms setSearchName={setSearchName} ageSelect={ageSelect}/>
        <br />

        <Table 
            striped 
            bordered 
            hover 
            variant={ darkTheme ? 'dark' : 'light' }
            pagination={true}
            >
                
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>

            {
              data?.length > 0 ?
              data?.filter(name => { 
                    return name.name.toLowerCase().includes(searchName) || 
                           name.name.includes(searchName) 
                    }).map((user) => {
                        return (
                            <tbody>
                              <tr>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.last_name}</td>
                                <td>{user.email}</td>
                                <td>{user.age}</td>
                                <td>{user.phone}</td>
                                <td>

                                  <Link to='/edit'>
                                      <Button 
                                      variant="warning m-1" 
                                      onClick={() => handleEdit(
                                                          user.id, 
                                                          user.name, 
                                                          user.last_name, 
                                                          user.email, 
                                                          user.age, 
                                                          user.phone
                                                          )}
                                      >
                                          Edit
                                      </Button>
                                  </Link>

                                  <Button 
                                      variant="danger"
                                      onClick={() => handleDelete(user.id)}
                                      >
                                          Delete
                                  </Button>

                                </td>
                              </tr>
                            </tbody> 
                        )
                    }) 
                  : 
                  <div>
                      <h1>Users not found</h1>
                      <Link to='/create'>
                          <Button style={{ color: '#111' }}  variant={ darkTheme ? 'dark' : 'primary' }>Create</Button>
                      </Link>
                  </div>
            }
        </Table>
    </div>
  )
}

export default Users;
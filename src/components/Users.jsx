import React, { useState, useEffect, useContext } from 'react';
import { Table, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
/* import { useQuery } from '@tanstack/react-query'; */
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import Forms from './Forms';
import User from './User';

const Users = () => {
    /*Kada ne koristim useState(data) za 'users' podatke sve radi ok ali ne mogu koristiti select.
    Ovako i proradi ali kada se reload sve se sruši*/
    /* const { data: usersdata, isLoading, error, refetch } =  useQuery(['key_users'], async () => {
    return await axios.get( 'https://638267ff9842ca8d3ca87c97.mockapi.io/crud-operations' )
                .then( ( res ) => res.data);
    }); */

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchName, setSearchName] = useState(''); 
    const { darkTheme } = useContext(AppContext);
    const history = useNavigate(); 

    
    const fetchData = async () =>{
      setLoading(true);
      try {
        const {data: response} = await axios.get('https://638267ff9842ca8d3ca87c97.mockapi.io/crud-operations');
        setData(response);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    }

    useEffect(() => {
        fetchData();
      }, []);

    /* if ( isLoading ) {
        return <h1>Loading...</h1>
    }

    if ( error ) {
        return <h1>Error!</h1>
    } */

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
             .then(() => {
                history('/');
               });
    }
    
    /* const ageSelect = ( value ) => {
        const newUsers = [...data];   
        setData(newUsers.sort((a,b) => value === 'lower' ? a.age - b.age : b.age - a.age));
    } */

    const ageSelect = ( value ) => {
        const newUsers = [...data];
        switch ( value ) {
            case 'higher': 
                setData(newUsers.sort((a,b) => b.age - a.age));
                break;
            case 'lower':
                setData(newUsers.sort((a,b) => a.age - b.age));
                break;
            case 'with_phone': 
                setData(newUsers.filter(user => user.phone));
                break;
            case 'no_phone': 
                setData(newUsers.filter(user => !user.phone));
                break;
            default: 
              setData(newUsers);
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

            {loading && <h1>Loading</h1>}

            {!loading &&
              data?.length > 0 ?
              data?.filter(name => { 
                    return name.name.toLowerCase().includes(searchName) || 
                           name.name.includes(searchName) 
                    }).map((user) => {
                        return (
                           <User 
                                user={user}
                                handleDelete={handleDelete}
                                handleEdit={handleEdit}
                           />  
                        )
                    }) 
                  : 
                  <div>
                      <h1>Users not found</h1>
                      <Link to='/create'>
                          <Button 
                                style={{ color: darkTheme ? 'white' : '#111' }}  
                                variant={ darkTheme ? 'dark' : 'primary' }>Create</Button>
                      </Link>
                  </div>
            }
        </Table>
    </div>
  )
}

export default Users;
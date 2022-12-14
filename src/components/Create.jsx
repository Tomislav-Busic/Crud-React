import React, { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { schema } from './validator/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../App';

const Create = () => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState(0);
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const { darkTheme } = useContext(AppContext);
    const history = useNavigate();

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = () => {

        axios.post('https://638267ff9842ca8d3ca87c97.mockapi.io/crud-operations', {
            name: name,
            last_name: lastName,
            email: email,
            age: age,
            phone: phone,
            password: password
        }).then(() => {
          history('/');
        });
        
    }

  return (
    <div>
        <h1>Create User</h1>
        <br />
        <Form
            style={ { 
                      background: darkTheme ? '#222' : '',
                      padding: '1rem 2rem',
                      borderRadius: '1rem'
             } } 
            onSubmit={ handleSubmit(onSubmit) }>

            <Form.Group className="mb-3">
              <Form.Label style={ { color: darkTheme ? 'white' : '' } }>First name</Form.Label>
              <Form.Control 
                  type="text" 
                  placeholder="Enter first name" 
                  { ...register('name') }
                  onChange={ (e) => { setName(e.target.value) } }
                  />
              <Form.Text style={ { color: errors.name?.message ? 'red' : '' } }>
                      { errors.name?.message }
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={ { color: darkTheme ? 'white' : '' } }>Last name</Form.Label>
              <Form.Control 
                  type="text" 
                  placeholder="Enter last name" 
                  { ...register('lastname') }
                  onChange={ (e) => { setLastName(e.target.value) } }
                  />
              <Form.Text style={ { color: errors.lastname?.message ? 'red' : '' } }>
                      { errors.lastname?.message }
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={ { color: darkTheme ? 'white' : '' } }>Email address</Form.Label>
              <Form.Control 
                  type="email" 
                  placeholder="Enter email" 
                  { ...register('email') } 
                  onChange={ (e) => { setEmail(e.target.value) } }
                  />
              <Form.Text style={ { color: errors.email?.message ? 'red' : '' } }>
                      { errors.email?.message }
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={ { color: darkTheme ? 'white' : '' } }>Age</Form.Label>
              <Form.Control 
                  type="number" 
                  placeholder="Enter age"  
                  { ...register('age') } 
                  onChange={ (e) => { setAge(e.target.value) } }
                  />
              <Form.Text style={ { color: errors.age?.message ? 'red' : '' } }>
                      { errors.age?.message }
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={ { color: darkTheme ? 'white' : '' } }>Phone number</Form.Label>
              <Form.Control 
                  type="text" 
                  placeholder="Enter phone number"  
                  { ...register('phone') } 
                  onChange={ (e) => { setPhone(e.target.value) } }
                  />
              <Form.Text style={ { color: errors.phone?.message ? 'red' : '' } }>
                      { errors.phone?.message }
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={ { color: darkTheme ? 'white' : '' } }>Password</Form.Label>
              <Form.Control 
                  type="password" 
                  placeholder="Enter password"  
                  { ...register('password') } 
                  onChange={ (e) => { setPassword(e.target.value) } }
                  />
              <Form.Text style={ { color: errors.password?.message ? 'red' : '' } }>
                      { errors.password?.message }
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={ { color: darkTheme ? 'white' : '' } }>Confirm password</Form.Label>
              <Form.Control 
                  type="password" 
                  placeholder="Enter confirm password"  
                  { ...register('confirmpassword') } 
                  />
              <Form.Text style={ { color: errors.confirmpassword?.message ? 'red' : '' } }>
                      { errors.confirmpassword?.message }
              </Form.Text>
            </Form.Group>

            <Button 
              variant="primary" 
              type="submit"
              >
              Create
            </Button>

            <Link to='/'>
              <Button variant="secondary m-2">Back</Button>
            </Link>
        </Form>
    </div>
  )
}

export default Create;
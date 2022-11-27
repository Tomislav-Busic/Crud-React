import React, { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Edit = () => {
    const [id, setId] = useState(0);
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState(0);
    const [phone, setPhone] = useState(0);
    const [password, setPassword] = useState('');
    const history = useNavigate();

    useEffect(() => {
      setId(localStorage.getItem('id'));
      setName(localStorage.getItem('name'));
      setLastName(localStorage.getItem('lastName'));
      setEmail(localStorage.getItem('email'));
      setAge(localStorage.getItem('age'));
      setPhone(localStorage.getItem('phone'));
    }, [])
    

    const schema = yup.object().shape({
        name: yup.string().min(2).max(30).required(),
        lastname: yup.string().min(2).max(30).required(),
        email: yup.string().email().required(),
        age: yup.number().positive().integer().min(18).required(),
        phone: yup.string().min(6).max(40).required(),
        password: yup.string().min(6).max(40).required(),
        confirmpassword: yup
                            .string()
                            .oneOf([yup.ref('password'), null], "Passwords Don't Match!")
                            .required()
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (e) => {
        e.preventDefault();

        axios.put(`https://638267ff9842ca8d3ca87c97.mockapi.io/crud-operations/${id}`, {
            name: name,
            last_name: lastName,
            email: email,
            age: age,
            phone: phone,
            password: password
        });

        history('/');
    }

    

  return (
    <div>
        <h1>Edit User</h1>
        <br />
        <Form onSubmit={ handleSubmit(onSubmit) }>

            <Form.Group className="mb-3">
              <Form.Label>First name</Form.Label>
              <Form.Control 
                  type="text" 
                  value={name}
                  placeholder="Enter name" 
                  { ...register('name') }
                  onChange={ (e) => { setName(e.target.value) } }
                  />
              <Form.Text style={ { color: errors.name?.message ? 'red' : '' } }>
                      { errors.name?.message }
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Last name</Form.Label>
              <Form.Control 
                  type="text"
                  value={lastName} 
                  placeholder="Enter last name" 
                  { ...register('lastname') }
                  onChange={ (e) => { setLastName(e.target.value) } }
                  />
              <Form.Text style={ { color: errors.lastname?.message ? 'red' : '' } }>
                      { errors.lastname?.message }
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control 
                  type="email" 
                  value={email}
                  placeholder="Enter email" 
                  { ...register('email') } 
                  onChange={ (e) => { setEmail(e.target.value) } }
                  />
              <Form.Text style={ { color: errors.email?.message ? 'red' : '' } }>
                      { errors.email?.message }
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control 
                  type="number" 
                  value={age}
                  placeholder="Enter age"  
                  { ...register('age') } 
                  onChange={ (e) => { setAge(e.target.value) } }
                  />
              <Form.Text style={ { color: errors.age?.message ? 'red' : '' } }>
                      { errors.age?.message }
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone number</Form.Label>
              <Form.Control 
                  type="text" 
                  value={phone}
                  placeholder="Enter phone number"  
                  { ...register('phone') } 
                  onChange={ (e) => { setPhone(e.target.value) } }
                  />
              <Form.Text style={ { color: errors.phone?.message ? 'red' : '' } }>
                      { errors.phone?.message }
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
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
              <Form.Label>Confirm password</Form.Label>
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
              onClick={onSubmit}
              >
              Edit
            </Button>

            <Link to='/'>
              <Button variant="secondary m-2">Back</Button>
            </Link>
        </Form>
    </div>
  )
}

export default Edit;
import React from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const User = ({user, handleDelete, handleEdit}) => {
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
}

export default User
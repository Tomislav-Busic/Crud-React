import React, { useContext } from 'react';
import { InputGroup, Form } from 'react-bootstrap';
import { AppContext } from '../App';

const Forms = (props) => {
  const { darkTheme } = useContext(AppContext);   

  return (
    <div>
        <InputGroup className="mb-3">

            <InputGroup.Text style={ { 
                                        background : darkTheme ? '#222' : '',
                                        color: darkTheme ? 'white' : ''
                                        } }>
                Search by Name
            </InputGroup.Text>

            <Form.Control   
              style={ { 
                        background : darkTheme ? '#222' : '',
                        color: darkTheme ? 'white' : ''
                        } }
              placeholder="Username"
              onChange={(e) => props.setSearchName(e.target.value)}
            />
            
        </InputGroup>

        <Form.Select 
                      onChange={(e) => props.ageSelect(e.target.value)}
                      style={ { 
                        background : darkTheme ? '#222' : '',
                        color: darkTheme ? 'white' : ''
                        } }>
            <option>Sort by Age</option>
            <option value="higher">Higher Age</option>
            <option value="lower">Lower Age</option>
        </Form.Select>
    </div>
  )
}

export default Forms
import React, { use, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Button, Form, Row, Col } from 'react-bootstrap';
import Divider from '../common/Divider';
import SocialAuthButtons from './SocialAuthButtons';
import axios from 'axios';

import useRequest from "../../hooks/use-request";
import  Router from 'next/router';


const RegistrationForm = ({ hasLabel }) => {
  // State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [errors, setErrors] = useState([]);
  
  // a hook to handle the request and if any errors happen
  /*const { doRequest, errors } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: {
      email, password, userName
    },
    onSuccess: () => Router.push('/')
  });*/



  // Handler
  const handleSubmit = async e => {
    e.preventDefault();
    toast.success(`Successfully registered as ${userName}`, {
      theme: 'colored'
    });
    console.log('I am here with: ', userName);
    try {
      const response = await axios.post('http://localhost:5000/api/users/signup', {
        email, password, userName
      })
      Router.push('/');
    } catch (err) {
      setErrors(err.response.data.errors);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        {hasLabel && <Form.Label>User Name</Form.Label>}
        <Form.Control
          placeholder={!hasLabel ? 'User Name' : ''}
          value={userName}
          name="userName"
          onChange={e => setUserName(e.target.value)}
          type="text"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        {hasLabel && <Form.Label>Email address</Form.Label>}
        <Form.Control
          placeholder={!hasLabel ? 'Email address' : ''}
          value={email}
          name="email"
          onChange={e => setEmail(e.target.value)}
          type="text"
        />
      </Form.Group>

      <Row className="g-2 mb-3">
        <Form.Group as={Col} sm={6}>
          {hasLabel && <Form.Label>Password</Form.Label>}
          <Form.Control
            placeholder={!hasLabel ? 'Password' : ''}
            value={password}
            name="password"
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </Form.Group>
        <Form.Group as={Col} sm={6}>
          {hasLabel && <Form.Label>Confirm Password</Form.Label>}
          <Form.Control
            placeholder={!hasLabel ? 'Confirm Password' : ''}
            value={confirmPassword}
            name="confirmPassword"
            onChange={e => setConfirmPassword(e.target.value)}
            type="password"
          />
        </Form.Group>
      </Row>

      <Form.Group className="mb-4">
        <Button
          className="w-100"
          type="submit"
        >
          Register
        </Button>
        {errors.map(err => err.message)}
      </Form.Group>
    </Form>
  );
};

RegistrationForm.propTypes = {
  hasLabel: PropTypes.bool
};

export default RegistrationForm;
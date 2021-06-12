import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import { fetchAllOrders } from '../service/order';
import CustomLogin from '../components/CustomLogin';
import fetchToken from '../service/auth';
import fetchProducts from '../service/products';

function Login() {
  const history = useHistory();
  const [formData, setFormData] = useState(new Map());

  const register = () => history.push('/register');

  const validate = () => {
    const passLimit = 5;

    const email = formData.get('email');
    const password = formData.get('password');
    if (email) {
      const regexEmail = /\S+@\S+\.\S+/;
      if (!regexEmail.test(email)) {
        return true;
      }
    }

    if (!password || password.length <= passLimit) {
      return true;
    }
    return false;
  };

  const handleInputChange = useCallback(({ target: { name, value } }) => {
    setFormData((prevState) => new Map(prevState).set(name, value));
  }, []);

  const handleSubmit = async () => {
    const email = formData.get('email');
    const password = formData.get('password');
    const user = await fetchToken(email, password);
    console.log('user', user);
    await fetchProducts(); // mudança do local do fetch
    const { role } = user;
    if (role === 'client') return history.push('/products');
    await fetchAllOrders();
    history.push('/admin/orders');
  };

  return (
    <Grid
      textAlign="center"
      style={ { height: '105vh', backgroundColor: 'rgb(33, 33, 33)' } }
      verticalAlign="middle"
    >
      <Grid.Column style={ { maxWidth: 500 } }>
        <CustomLogin
          formData={ formData }
          onInputChange={ handleInputChange }
          onHandleSubmit={ handleSubmit }
          goRegister={ register }
          isValid={ validate }
        />
      </Grid.Column>
    </Grid>
  );
}

export default Login;

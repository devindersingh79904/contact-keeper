import React, { useEffect, useContext } from 'react';
import Contacts from '../contact/Contacts';
import ContactForm from '../contact/ContactFom';
import ContactFilter from '../contact/ContactFilter';
import AuthContext from '../../Context/auth/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);

  const { loadUser } = authContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='grid-2'>
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  );
};

export default Home;

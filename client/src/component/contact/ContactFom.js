import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../Context/contact/contactContext';

const ContactForm = () => {
  const contactContext = useContext(ContactContext);

  const { addContact, current, clearCurrent, updateContact } = contactContext;

  useEffect(() => {
    if (current) {
      setContact(current);
    } else {
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal',
      });
    }
  }, [contactContext, current]);

  const [contact, setContact] = useState({
    name: '',
    email: ' ',
    phone: '',
    type: 'personal',
  });

  const { name, email, phone, type } = contact;
  const onChange = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const onClear = () => {
    clearCurrent();
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (current) {
      updateContact(contact);
    } else {
      addContact(contact);
    }
    clearCurrent();
    setContact({
      name: '',
      email: '',
      phone: '',
      type: 'personal',
    });
  };
  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>{current ? 'Update' : 'Add'} Contact</h2>
      <input
        type='text'
        name='name'
        placeholder='Enter Name'
        value={name}
        onChange={onChange}
      />
      <input
        type='email'
        name='email'
        placeholder='Enter Email'
        value={email}
        onChange={onChange}
      />
      <input
        type='text'
        name='phone'
        placeholder='Enter PhoneNo'
        value={phone}
        onChange={onChange}
      />
      <h5>Contact type</h5>
      <input
        type='radio'
        name='type'
        value='personal'
        checked={type === 'personal'}
        onChange={onChange}
      />
      Personal{' '}
      <input
        type='radio'
        name='type'
        value='professional'
        checked={type === 'professional'}
        onChange={onChange}
      />
      Professional{' '}
      <div>
        <input
          type='submit'
          value={current ? 'Update Contact' : 'Add Contact'}
          className='btn btn-primary btn-block'
        />
        {current && (
          <div>
            <button className='btn btn-light btn-block' onClick={onClear}>
              Clear{' '}
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

export default ContactForm;

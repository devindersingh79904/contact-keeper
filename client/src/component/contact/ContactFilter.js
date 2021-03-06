import React, { useContext, useRef, useEffect } from 'react';
import ContactContext from '../../Context/contact/contactContext';

const ContactFilter = () => {
  const contactContext = useContext(ContactContext);

  const text = useRef('');

  const { filtered, filterContact, clearFilter } = contactContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
    // eslint-disable-next-line
  }, []);

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterContact(e.target.value);
    } else {
      clearFilter();
    }
  };
  return (
    <form>
      <input
        ref={text}
        type='text'
        placeholder='Fiter Contact'
        onChange={onChange}
      />
    </form>
  );
};

export default ContactFilter;

import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../Context/contact/contactContext';

const ContactItem = ({ contact }) => {
  const contactContext = useContext(ContactContext);
  const { id, name, type, email, phone } = contact;
  const { deleteContact, setCurrent, clearCurrent } = contactContext;

  const onDelete = () => {
    deleteContact(id);
    clearCurrent();
  };

  const onEdit = () => {
    setCurrent(contact);
  };

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {name}{' '}
        <span
          className={
            'badge ' +
            (type === 'professional' ? 'badge-success' : 'badge-primary')
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>

      <ul className='list'>
        {email && (
          <li>
            <i className='fas fa-envelope-open'>{email}</i>
          </li>
        )}

        {phone && (
          <li>
            <i className='fas fa-phone'>{phone}</i>
          </li>
        )}
      </ul>
      <p>
        <button className='btn btn-dark btn-sm' onClick={onEdit}>
          Edit
        </button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};
export default ContactItem;

import { connect } from "react-redux";
import PropTypes from "prop-types";
import styles from "./ContactList.module.css";
import actions from "../../redux/contactsActions";

const ContactList = ({ contacts, onDeleteContact }) => (
  <ul className={styles.list}>
    {contacts.map(({ id, name, number }) => (
      <li className={styles.item} key={id}>
        <p className={styles.info}>
          {name}: {number}
        </p>
        <button
          className={styles.btn}
          type="button"
          onClick={() => onDeleteContact(id)}
        >
          Delete
        </button>
      </li>
    ))}
  </ul>
);

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const getVisibleContacts = (allContacts, filter = "") => {
  const normalizedFilter = filter.toLowerCase();

  return allContacts.filter(({ name }) =>
    name.toLowerCase().includes(normalizedFilter)
  );
};

const mapDispatchToProps = (dispatch) => ({
  onDeleteContact: (id) => dispatch(actions.deleteContact(id)),
});

const mapStateToProps = ({ contacts: { items, filter } }) => {
  const visibleContacts = getVisibleContacts(items, filter);
  return {
    contacts: visibleContacts,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);

import { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styles from "./ContactForm.module.css";
import actions from "../../redux/contactsActions";

class ContactForm extends Component {
  state = {
    name: "",
    number: "",
  };

  handleChange = (e) => {
    const name = e.currentTarget.name;
    this.setState({
      [name]: e.currentTarget.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const checkContact = this.props.existContacts.some(
      (element) => element.name === this.state.name
    );

    checkContact
      ? alert(`${this.state.name} is already in contacts`)
      : this.props.onSubmit(this.state);

    this.resetInput();
  };

  resetInput = () => {
    this.setState({ name: "", number: "" });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form className={styles.form} onSubmit={this.handleSubmit}>
        <label className={styles.label}>
          Name
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            className={styles.input}
            placeholder="Jon Jonson"
            value={name}
            onChange={this.handleChange}
            required
          />
        </label>

        <label className={styles.label}>
          Number
          <input
            className={styles.input}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            placeholder="111-11-11"
            value={number}
            required
            onChange={this.handleChange}
          />
        </label>
        <button type="submit" className={styles.btn}>
          Add contact
        </button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  existContacts: state.contacts.items,
});
const mapDispatchToProps = (dispatch) => ({
  onSubmit: (data) => dispatch(actions.addContact(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);

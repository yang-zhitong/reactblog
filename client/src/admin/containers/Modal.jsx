import React from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../actions';

const Modal = ({ modal, closeModal }) => {
  if (modal) {
    alert(modal);
    setTimeout(() => {
      closeModal();
    }, 100);
  }
  return <div></div>;
}

const mapStateToProps = ({ modal }) => {
  return {
    modal,
  };
};

export default connect(mapStateToProps, { closeModal })(Modal);
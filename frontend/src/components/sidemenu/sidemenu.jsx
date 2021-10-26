import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { closeSidemenu } from '../../actions/sidemenu_actions';
import './sidemenu.css';
import Pantry from '../pantry/pantry_container';

class SideMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location !== this.props.location) {
      this.props.closeSidemenu();
    }
  }

  render() {
    if (!this.props.sidemenu) {
      return null;
    }

    return (
      <div className="sidemenu">
        <p className="close-sidemenu" onClick={this.props.closeSidemenu}>
          <i className="fas fa-times" />
        </p>
        <Pantry />
      </div>
    );
  }
}

const mSTP = (state) => {
  return {
    sidemenu: state.ui.sideMenu,
  };
};

const mDTP = (dispatch) => {
  return {
    closeSidemenu: () => dispatch(closeSidemenu()),
  };
};

export default withRouter(connect(mSTP, mDTP)(SideMenu));

import React, {PropTypes} from 'react';
import Header from './common/Header';
import {connect} from 'react-redux';


class App extends React.Component{
  render () {
    return (
      <div>
        <div className="container-fluid">
          <Header
          loading = {this.props.loading}  
            />
          {this.props.children}
        </div>
      </div>
    );
  }
}

App.propTypes =
{
  children: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    loading: state.ajaxCalls > 0
  };
};

export default connect(mapStateToProps)(App);

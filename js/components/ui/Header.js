import React from 'react';
import { connect } from 'react-redux';
import { Header as NativeHeader } from 'react-native-elements';

class Header extends React.Component {
  render() {
    const { theme } = this.props;

    return (
        <NativeHeader
            leftComponent={{ icon: 'menu', color: '#fff' }}
            centerComponent={{ text: "Moola Manager", style: { color: '#fff' } }}
            rightComponent={{ icon: 'more-vert', color: '#fff' }}
            backgroundColor={theme.primaryColor}
        />
    );
  }
};

const mapStateToProps = (state) => {
    return {
        theme: state.ui.theme
    };
};

export default connect(mapStateToProps)(Header);

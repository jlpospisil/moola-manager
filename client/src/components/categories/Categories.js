import React, { Component } from 'react';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
import { Page } from 'react-onsenui';


export default class Categories extends Component {

    render () {
        return (
            <Page>
                <main>
                    <h2>Categories</h2>
                </main>
            </Page>
        );
    }
}


// const mapStateToProps = (state) => {
//     return {
//         accounts: state.accounts.accounts
//     };
// };
//
// const mapDispatchToProps = dispatch => {
//     return {
//         actions: bindActionCreators(AccountActions, dispatch)
//     };
// };
//
// export default connect(mapStateToProps, mapDispatchToProps)(Accounts);
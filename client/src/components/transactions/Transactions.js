import React, { Component } from 'react';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
import { Page } from 'react-onsenui';


export default class Transactions extends Component {

    render () {
        return (
            <Page>
                <main>
                    <h2>Transactions</h2>
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
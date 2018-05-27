import React, { Component } from 'react';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
import { Page, List, ListItem } from 'react-onsenui';


export default class Budgets extends Component {

    render () {
        return (
            <Page>
                <main>
                    <List
                        dataSource={[]}
                        renderRow={(budget, index) => (
                            <ListItem key={index}>
                                {budget.name}
                            </ListItem>
                        )}
                    />
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
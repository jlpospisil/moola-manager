import React, { Component } from 'react';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
import { Page, List, ListItem } from 'react-onsenui';


export default class Categories extends Component {

    render () {
        return (
            <Page>
                <main>
                    <List
                        dataSource={[]}
                        renderRow={(category, index) => (
                            <ListItem key={index}>
                                {category.name}
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
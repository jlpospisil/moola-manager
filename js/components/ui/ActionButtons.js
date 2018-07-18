import React from 'react';
import { connect } from 'react-redux';
import ActionButton from 'react-native-action-button';
import { Icon } from 'react-native-elements';

class ActionButtons extends React.Component {
    render() {
        const { theme, fabs } = this.props;

        return (
            <ActionButton
                fixNativeFeedbackRadius={true}
                offsetY={70}
                offsetX={15}
                buttonColor={theme.secondaryColor}
                renderIcon={() => <Icon name="add" color="#fff" />}
            >
                {
                    fabs.map(fab =>
                        <ActionButton.Item
                            key={fab.key.toString()}
                            title={fab.title}
                            buttonColor="#fff"
                            textStyle={{color: theme.primaryColor}}
                            onPress={() => {
                                alert('TODO: add new transaction');
                            }}
                            onLongPress={() => {
                                alert('TODO: display other fabs here');
                            }}
                        >
                            <Icon name={fab.icon} color={theme.primaryColor} />
                        </ActionButton.Item>
                    )
                }
            </ActionButton>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        theme: state.ui.theme,
        fabs: state.ui.fabs
    };
};

export default connect(mapStateToProps)(ActionButtons);
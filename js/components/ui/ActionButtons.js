import React from 'react';
import { connect } from 'react-redux';
import ActionButton from 'react-native-action-button';
import { Icon } from 'react-native-elements';

class ActionButtons extends React.Component {
    render() {
        const { theme } = this.props;

        return (
            <ActionButton
                fixNativeFeedbackRadius={true}
                offsetY={70}
                offsetX={15}
                buttonColor={theme.secondaryColor}
                renderIcon={() => <Icon name="add" color="#fff" />}
            >
                <ActionButton.Item title="New Account" buttonColor="#fff" onPress={() => {}}>
                    <Icon name="credit-card" color={theme.primaryColor} />
                </ActionButton.Item>

                <ActionButton.Item title="New Transaction" buttonColor="#fff" onPress={() => {}}>
                    <Icon name="receipt" color={theme.primaryColor} />
                </ActionButton.Item>
            </ActionButton>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        theme: state.ui.theme
    };
};

export default connect(mapStateToProps)(ActionButtons);
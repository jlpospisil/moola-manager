import { StyleSheet } from 'react-native';

const styles = {
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ECEFF1'
  },
  fullWidth: {
    alignSelf: 'stretch'
  },
  listItemButton: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    width: 75
  }
};

export default StyleSheet.create(styles);

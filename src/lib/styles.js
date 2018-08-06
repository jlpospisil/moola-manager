import { StyleSheet } from 'react-native';

export const primaryColor = '#43a047';

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
  },
  input:{
    alignSelf: 'stretch',
    height: 40,
    marginBottom: 10,
    padding: 10
  },
  buttonContainer:{
    alignSelf: 'stretch',
    backgroundColor: primaryColor,
    paddingVertical: 15,
    borderRadius: 25
  },
  buttonText:{
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: '700'
  },
  textPrimary: {
    color: primaryColor,
  },
  padding20: {
    padding: 20
  }
};

export default StyleSheet.create(styles);

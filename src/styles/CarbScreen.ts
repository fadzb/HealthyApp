import colors from '../colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.GRAY_ULTRA_LIGHT,
    alignItems: 'flex-start',
  },
  text: {
    borderColor: colors.BLACK,
    borderBottomWidth: StyleSheet.hairlineWidth,
    fontSize: 20,
  },
  item: {
    padding: 10,
    marginVertical: 1,
    marginHorizontal: 1,
    borderColor: colors.GRAY_LIGHT,
    borderWidth: 3,
  },
  listItemContainer: {
    height: 60,
    width: '90%',
    padding: 10,
    marginVertical: 1,
    marginHorizontal: 1,
    borderColor: colors.GRAY_LIGHT,
    borderWidth: 3,
  },
  foodListContainer: {
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: '100%',
  },
});
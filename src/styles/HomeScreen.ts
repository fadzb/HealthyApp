import { StyleSheet } from 'react-native';
import { blueVersion as colors } from '../colors';
import { SECONDARY, PRIMARY } from './global';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  item: {
    flex: 1,
    height: 100,
    paddingVertical: 20,
    // borderColor: colors.primaryLight,
    // borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    width: 100,
  },
  itemText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 19,
  },
  itemImage: {
    height: 35,
  },
  // Card Items e.g. Overview
  card: {
    width: '95%',
    overflow: 'hidden',
    // alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 15,
    // borderColor: 'red',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: PRIMARY,
  },
});

import { StyleSheet } from 'react-native';

import { colors, metrics } from 'styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: metrics.baseRadius,
    padding: metrics.basePadding,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.darker,
    alignSelf: 'center',
    marginBottom: metrics.baseMargin,
  },
});

export default styles;

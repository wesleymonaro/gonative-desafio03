import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const CalloutBox = ({ user }) => (
  <View style={styles.container}>
    <Text style={styles.name}>
      {user.name}
    </Text>
    <Text>
      {user.bio}
    </Text>

  </View>
);

CalloutBox.propTypes = {
  user: PropTypes.shape({
    login: PropTypes.string,
    avatar: PropTypes.string,
    coordinates: PropTypes.shape({
      lat: PropTypes.number,
      lon: PropTypes.number,
    }),
  }).isRequired,
};

export default CalloutBox;

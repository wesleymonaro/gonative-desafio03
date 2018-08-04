import React, { Component } from 'react';
import { View } from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as UserActions } from 'store/ducks/users';
import MapUser from './components/mapUser';
import styles from './styles';

import Modal from './components/modal';

const MAP_BOX_TOKEN = 'pk.eyJ1Ijoid2VzbGV5bW9uYXJvIiwiYSI6ImNqa2RhbWw0YzBoeHUzd3FtcHZpaTY4bjIifQ.lYSOeUucWfHFNpxXhwEIaA';

MapboxGL.setAccessToken(MAP_BOX_TOKEN);

class Home extends Component {
  static navigationOptions = {
    header: null,
  }

  static propTypes = {
    openModalRequest: PropTypes.func.isRequired,
    modalOpen: PropTypes.bool.isRequired,
    users: PropTypes.arrayOf(PropTypes.shape({
      login: PropTypes.string,
      avatar: PropTypes.string,
      coordinates: PropTypes.shape({
        lat: PropTypes.number,
        lon: PropTypes.number,
      }),
    })).isRequired,
  }

  render() {
    const { modalOpen, users, openModalRequest } = this.props;

    return (
      <View style={styles.container}>
        <MapboxGL.MapView
          centerCoordinate={[-46.211379, -23.541047]}
          zoomLevel={11}
          style={styles.container}
          showUserLocation
          onLongPress={info => openModalRequest(info.geometry.coordinates)}
          // styleURL={MapboxGL.StyleURL.Dark}
        >
          {users.map(user => <MapUser key={user.login} user={user} />)}


        </MapboxGL.MapView>
        { modalOpen
          && (<Modal />)}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users.data,
  modalOpen: state.users.modalOpen,
});

const mapDispatchToProps = dispatch => bindActionCreators(UserActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);

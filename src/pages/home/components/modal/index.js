import React, { Component } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as UserActions } from 'store/ducks/users';
import styles from './styles';

class Modal extends Component {
  static propTypes = {
    closeModalRequest: PropTypes.func.isRequired,
    addUserRequest: PropTypes.func.isRequired,
    errorOnAdd: PropTypes.string,
  }

  static defaultProps = {
    errorOnAdd: '',
  }

  state = {
    username: '',
  }


  addUser = () => {
    const { username } = this.state;
    const { addUserRequest } = this.props;

    if (!username.length) return;

    addUserRequest(username);
  }

  render() {
    const { closeModalRequest, errorOnAdd } = this.props;
    const { username } = this.state;


    return (
      <View style={styles.container}>
        <View style={styles.modalBox}>
          <Text style={styles.modalTitle}>
            Adicionar novo local
          </Text>

          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Usuário no Github"
            underlineColorAndroid="transparent"
            autoFocus
            value={username}
            onChangeText={text => this.setState({ username: text })}
          />

          {errorOnAdd && (
            <View style={styles.errorBox}>
              <Text style={styles.error}>
                {errorOnAdd}
              </Text>
            </View>
          )}

          <View style={styles.buttonsBox}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => closeModalRequest()}
            >
              <Text style={styles.buttonText}>
                Cancelar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={this.addUser}
            >
              <Text style={styles.buttonText}>
                Salvar
              </Text>
            </TouchableOpacity>


          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users.data,
  loading: state.users.loading,
  errorOnAdd: state.users.errorOnAdd,
  coordinates: state.users.coordinates,
});

const mapDispatchToProps = dispatch => bindActionCreators(UserActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Modal);

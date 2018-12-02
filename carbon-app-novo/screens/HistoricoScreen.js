import React from "react";
import { Header, ListItem } from "react-native-elements";
import moment from "moment";
import {
  ScrollView,
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator
} from "react-native";
import { ExpoLinksView } from "@expo/samples";
import colors from "../assets/colors";
import axios from "axios";

export default class HistoricoScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  state = {
    loading: false
  };

  async componentDidMount() {
    this.setState({ loading: true });

    try {
      const result = await axios.get("/ocorrencia");

      this.setState({
        ocorrencias: result.data
      });
      console.log(result.data);
    } catch (e) {
      console.log(e);
      alert("Tivemos um problma ao registrar sua ocorrência");
    } finally {
      this.setState({ loading: false });
    }
  }

  renderItem({ item }) {
    return (
      <ListItem
        title={item.causa.nome}
        hideChevron
        subtitle={item.local_fato.nome}
        rightTitle={moment(item.created_at).format("DD/MM/YYYY HH:mm")}
      />
    );
  }

  render() {
    const { ocorrencias } = this.state;

    return (
      <>
        <Header
          backgroundColor={colors.primaryCOlor}
          statusBarProps={{ barStyle: "light-content" }}
          centerComponent={{
            text: "Histórico",
            style: { color: "#fff" }
          }}
        />
        <View style={{ backgroundColor: "white" }}>
          <FlatList
            data={ocorrencias}
            keyExtractor={item => item.id}
            renderItem={this.renderItem}
            refreshing={this.state.loading}
            onRefresh={() => this.componentDidMount()}
          />
        </View>

        {this.state.loading ? (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator
              color="white"
              style={styles.loading}
              size="large"
            />
          </View>
        ) : null}
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  }
});

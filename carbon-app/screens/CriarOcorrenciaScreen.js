import React from "react";
import axios from "axios";
import {
  CheckBox,
  Icon,
  ButtonGroup,
  ListItem,
  FormInput as Input,
  Button
} from "react-native-elements";
import { ConfirmDialog } from "react-native-simple-dialogs";
import {
  StatusBar,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
  Picker,
  View
} from "react-native";
import { Constants, Location, Permissions } from "expo";
import { causas } from "../data/causas";
import { agravantes } from "../data/agravantes";
import { locaisFato } from "../data/locais_fato";
import { situacoesVitima } from "../data/situacoes_vitima";

import DialogInput from "../components/DialogInput";
import colors from "../assets/colors";
import Touchable from "../components/Touchable";
import RecordSound from "../components/RecordSound";

function changeSize(src, size) {
  if (!src) {
    const rst = [];
    for (var i = 0; i < size; i++) rst.push({ key: (i + 1).toString() });
    return rst;
  }
  if (src.length < size) {
    const rst = [...src];
    for (var i = rst.length; i < size; i++)
      rst.push({ key: (i + 1).toString() });
    return rst;
  }

  return src.filter((_, i) => i < size);
}

const tiposVeiculos = [
  {
    id: 1,
    nome: "Carro"
  },
  {
    id: 2,
    nome: "Moto"
  },
  {
    id: 3,
    nome: "Bicicleta"
  },
  {
    id: 4,
    nome: "Onibus"
  },
  {
    id: 5,
    nome: "Caminhão"
  },
  {
    id: 6,
    nome: "Caminhonete"
  },
  {
    id: 7,
    nome: "Veiculo agricola"
  }
];

const femaleIcon = () => (
  <Icon name="venus" type="font-awesome" color={colors.femaleColor} />
);
const maleIcon = () => (
  <Icon name="mars" type="font-awesome" color={colors.maleColor} />
);

export default class OcorrenciaScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    agravantes: [],
    needToRequestQtdVitimas: false,
    temVitimas: false,
    qtdVitimas: null,
    vitimas: [],
    saving: null,
    needToRequestQtdVeiculos: false,
    qtdVeiculos: 1,
    veiculos: [{ key: "1" }],
    sendingNarrativa: false
  };

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }
    this.setState({ loadingLocation: true });

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location, loadingLocation: false });

    this.timeout = setTimeout(() => this._getLocationAsync(), 20000);
  };

  save = async () => {
    try {
      this.setState({ saving: true });

      const {
        location,
        causa_id,
        local_fato_id,
        anexo,
        vitimas,
        veiculos,
        agravantes
      } = this.state;

      const data = {
        latitude:
          (location && location.coords && location.coords.latitude) || 0,
        longitude:
          (location && location.coords && location.coords.longitude) || 0,
        protocolo: "-1", //removido
        causa_id: causa_id || 4,
        local_fato_id: local_fato_id || 1,
        anexos: anexo ? [anexo] : [],
        agravantes,
        vitimas: vitimas.map(x => ({ ...x, key: undefined })),
        veiculos: veiculos
          .filter(x => x.placa || x.tipo_veiculo_id)
          .map(x => ({
            ...x,
            key: undefined,
            tipo_veiculo_id: x.tipo_veiculo_id || 1
          }))
      };
      console.log(data);
      const result = await axios.post("/ocorrencia", data);
      console.log(result);

      alert("A ocorrencia foi registrada");

      this.props.navigation.goBack();
    } catch (error) {
      console.log(error);
      alert("Tivemos um problma ao registrar sua ocorrência");
    } finally {
      this.setState({ saving: false });
    }
  };

  componentDidMount() {
    const { navigation } = this.props;
    const temVitima = navigation.getParam("temVitimas", false);

    if (temVitima) {
      this.handleTemVitimas();
    }

    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this._getLocationAsync();
    }
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  _renderHeader() {
    return (
      <View style={styles.header}>
        <StatusBar
          backgroundColor={styles.primaryCOlor}
          barStyle="dark-content"
        />
        <View style={styles.headerTile} />
        <View style={styles.headerTile}>
          <Text> Nova Ocorrencia </Text>
        </View>
        <View style={[styles.headerTile, styles.headerTileLeft]}>
          <Touchable>
            <Icon
              size={30}
              name="ios-close"
              type="ionicon"
              onPress={() => this.props.navigation.goBack()}
            />
          </Touchable>
        </View>
      </View>
    );
  }

  get indiceVitimas() {
    const { qtdVitimas } = this.state;

    if (qtdVitimas > 5) return 5;
    return qtdVitimas - 1;
  }

  get indiceVeiculos() {
    const { qtdVeiculos } = this.state;

    if (qtdVeiculos > 5) return 5;
    return qtdVeiculos - 1;
  }

  uploadNarrativa = async sound => {
    try {
      const formData = new FormData();

      formData.append("anexo", {
        uri: sound.uri, // your file path string
        name: `anexo.${Platform.OS == "ios" ? "caf" : "3gp"}`,
        type: `audio/${Platform.OS == "ios" ? "caf" : "3gp"}`
      });

      const res = await axios.post(`/upload/audio-${Platform.OS}`, formData);
      console.log(res);
      this.setState({
        sendingNarrativa: false,
        anexo: res.url
      });
    } catch (e) {
      debugger;

      console.log(JSON.stringify(e, null, 4));
    }
    debugger;
  };

  handleUpdateVitimas = index => {
    if (index === 5) {
      this.setState({ needToRequestQtdVitimas: true });

      return;
    }
    const qtdVitimas = index + 1;

    this.setState({
      qtdVitimas,
      vitimas: changeSize(this.state.vitimas, qtdVitimas)
    });
  };

  handleUpdateVeiculos = index => {
    if (index === 5) {
      this.setState({ needToRequestQtdVeiculos: true });

      return;
    }
    const qtdVeiculos = index + 1;

    this.setState({
      qtdVeiculos,
      veiculos: changeSize(this.state.veiculos, qtdVeiculos)
    });
  };

  _maybeRenderDialogMaisQue6() {
    const { needToRequestQtdVitimas } = this.state;

    return (
      <DialogInput
        isDialogVisible={needToRequestQtdVitimas}
        title={"Quantidade de Vitimas"}
        message={"Informe a quantidade de vitimas"}
        hintInput={"6"}
        textInputProps={{
          keyboardType: "number-pad"
        }}
        submitInput={inputText => {
          this.setState({
            needToRequestQtdVitimas: false,
            qtdVitimas: +(inputText || "6"),
            vitimas: changeSize(this.state.vitimas, +(inputText || "6"))
          });
        }}
        closeDialog={() => {
          this.setState({
            needToRequestQtdVitimas: false,
            qtdVitimas: null,
            vitimas: []
          });
        }}
      />
    );
  }

  _maybeRenderDialogMaisQue6Veiculos() {
    const { needToRequestQtdVeiculos } = this.state;

    return (
      <DialogInput
        isDialogVisible={needToRequestQtdVeiculos}
        title={"Quantidade de Veiculos"}
        message={"Informe a quantidade de veiculos"}
        hintInput={"6"}
        textInputProps={{
          keyboardType: "number-pad"
        }}
        submitInput={inputText => {
          this.setState({
            needToRequestQtdVeiculos: false,
            qtdVeiculos: +(inputText || "6"),
            veiculos: changeSize(this.state.veiculos, +(inputText || "6"))
          });
        }}
        closeDialog={() => {
          this.setState({
            needToRequestQtdVeiculos: false,
            qtdVeiculos: null,
            veiculos: []
          });
        }}
      />
    );
  }

  _renderVitima = ({ item, index }) => {
    return (
      <ListItem
        onPress={() =>
          this.setState({ editingVitima: item, editingIndex: index })
        }
        title={item.nome || "Toque para informar o nome"}
        leftIcon={{
          name: item.sexo
            ? item.sexo == "f"
              ? "venus"
              : "mars"
            : "genderless",
          color: item.sexo
            ? item.sexo == "f"
              ? colors.femaleColor
              : colors.maleColor
            : colors.neutralColor,
          type: "font-awesome"
        }}
      />
    );
  };

  _renderVeiculo = ({ item, index }) => {
    return (
      <ListItem
        onPress={() =>
          this.setState({ editingVeiculo: item, editingVeiculoIndex: index })
        }
        title={item.placa || "Toque para informar a Placa"}
        subtitle={
          item.tipo_veiculo_id
            ? tiposVeiculos[item.tipo_veiculo_id].nome
            : "Informe o tipo do veiculo"
        }
      />
    );
  };
  _maybeRenderVitimas() {
    const { qtdVitimas, temVitimas, vitimas } = this.state;

    const buttons = [
      "1",
      "2",
      "3",
      "4",
      "5",
      qtdVitimas > 5 ? qtdVitimas.toString() : " Mais "
    ];

    if (!temVitimas) return null;

    return (
      <View>
        <Text style={styles.label}> Quantidade de Vitimas </Text>
        <ButtonGroup
          onPress={this.handleUpdateVitimas}
          selectedIndex={this.indiceVitimas}
          selectedButtonStyle={styles.selectedButtonStyle}
          selectedTextStyle={styles.selectedButtonTextStyle}
          buttons={buttons}
        />

        <Text style={styles.label}> Vitimas </Text>

        <FlatList data={vitimas || []} renderItem={this._renderVitima} />
      </View>
    );
  }

  _renderVeiculos() {
    const { qtdVeiculos, veiculos } = this.state;

    const buttons = [
      "1",
      "2",
      "3",
      "4",
      "5",
      qtdVeiculos > 5 ? qtdVeiculos.toString() : " Mais "
    ];

    return (
      <View>
        <Text style={styles.label}> Quantidade de Veiculos </Text>
        <ButtonGroup
          onPress={this.handleUpdateVeiculos}
          selectedIndex={this.indiceVeiculos}
          selectedButtonStyle={styles.selectedButtonStyle}
          selectedTextStyle={styles.selectedButtonTextStyle}
          buttons={buttons}
        />

        <Text style={styles.label}> Veiculos </Text>

        <FlatList data={veiculos || []} renderItem={this._renderVeiculo} />
      </View>
    );
  }

  _renderEditVitima() {
    const buttons = [
      {
        element: femaleIcon
      },
      {
        element: maleIcon
      }
    ];

    return (
      <ConfirmDialog
        title="Editar Dados da Vitima"
        visible={!!this.state.editingVitima}
        onTouchOutside={() => this.setState({ editingVitima: null })}
        positiveButton={{
          title: "Salvar",
          onPress: () => {
            const { editingIndex, editingVitima } = this.state;
            if (editingIndex < 0) {
              this.setState({
                vitimas: this.state.vitimas.concat(editingVitima),
                editingVitima: null
              });
              return;
            }

            const vitimas = [...this.state.vitimas];
            vitimas[editingIndex] = editingVitima;

            this.setState({
              vitimas,
              editingVitima: null
            });
          }
        }}
      >
        <View>
          <Input
            placeholder="Informe o nome da Vítima"
            value={this.state.editingVitima && this.state.editingVitima.nome}
            onChangeText={nome =>
              this.setState({
                editingVitima: {
                  ...this.state.editingVitima,
                  nome
                }
              })
            }
          />
          <Text style={[styles.label, styles.center]}> Sexo da Vitima </Text>
          <View style={styles.buttonSmall}>
            <ButtonGroup
              selectedButtonStyle={styles.selectedButtonSexStyle}
              selectedTextStyle={styles.selectedButtonTextStyle}
              onPress={index =>
                this.setState({
                  editingVitima: {
                    ...this.state.editingVitima,
                    sexo: index ? "m" : "f"
                  }
                })
              }
              selectedIndex={
                this.state.editingVitima &&
                (this.state.editingVitima.sexo == "m"
                  ? 1
                  : this.state.editingVitima.sexo == "f"
                  ? 0
                  : null)
              }
              buttons={buttons}
            />
          </View>
          <Text style={[styles.label, styles.center]}> Situação </Text>
          <View>
            <Picker
              selectedValue={
                this.state.editingVitima &&
                this.state.editingVitima.situacao_vitima_id
              }
              onValueChange={(itemValue, itemIndex) =>
                this.setState({
                  editingVitima: {
                    ...this.state.editingVitima,
                    situacao_vitima_id: itemValue || 1
                  }
                })
              }
            >
              {situacoesVitima.map(tipo => (
                <Picker.Item label={tipo.nome} value={tipo.id} key={tipo.id} />
              ))}
            </Picker>
          </View>
        </View>
      </ConfirmDialog>
    );
  }

  _renderEditVeiculo() {
    const buttons = [
      {
        element: femaleIcon
      },
      {
        element: maleIcon
      }
    ];

    return (
      <ConfirmDialog
        title="Editar Dados da Veiculo"
        visible={!!this.state.editingVeiculo}
        onTouchOutside={() => this.setState({ editingVeiculo: null })}
        positiveButton={{
          title: "Salvar",
          onPress: () => {
            const { editingVeiculoIndex, editingVeiculo } = this.state;
            if (editingVeiculoIndex < 0) {
              this.setState({
                veiculos: this.state.veiculos.concat(editingVeiculo),
                editingVeiculo: null
              });
              return;
            }

            const veiculos = [...this.state.veiculos];
            veiculos[editingVeiculoIndex] = editingVeiculo;

            this.setState({
              veiculos,
              editingVeiculo: null
            });
          }
        }}
      >
        <View>
          <Input
            placeholder="Informe a placa do Veiculo"
            value={this.state.editingVeiculo && this.state.editingVeiculo.placa}
            onChangeText={placa =>
              this.setState({
                editingVeiculo: {
                  ...this.state.editingVeiculo,
                  placa
                }
              })
            }
          />
          <View>
            <Picker
              selectedValue={
                this.state.editingVeiculo &&
                this.state.editingVeiculo.tipo_veiculo_id
              }
              onValueChange={(itemValue, itemIndex) =>
                this.setState({
                  editingVeiculo: {
                    ...this.state.editingVeiculo,
                    tipo_veiculo_id: itemValue
                  }
                })
              }
            >
              {tiposVeiculos.map(tipo => (
                <Picker.Item label={tipo.nome} value={tipo.id} key={tipo.id} />
              ))}
            </Picker>
          </View>
        </View>
      </ConfirmDialog>
    );
  }

  handleTemVitimas = () => {
    let { temVitimas, qtdVitimas, vitimas } = this.state;

    if (!temVitimas) {
      qtdVitimas = Math.max(1, qtdVitimas);
    }

    this.setState({
      temVitimas: !temVitimas,
      qtdVitimas: qtdVitimas,
      vitimas: changeSize(vitimas, qtdVitimas)
    });
  };

  isCheckedAgravante(id) {
    const { agravantes } = this.state;

    return agravantes.includes(id);
  }
  toggleAgravante(id, toggle) {
    let { agravantes } = this.state;

    if (toggle) {
      agravantes = agravantes.concat(id);
    } else {
      agravantes = agravantes.filter(x => x != id);
    }

    this.setState({
      agravantes
    });
  }
  renderAgravantes() {
    return (
      <>
        <Text style={[styles.label]}>Agravantes</Text>

        {agravantes.map(group => (
          <>
            <Text style={[styles.label, styles.smallLabel]}>{group.name}</Text>
            {group.children.map(item => (
              <CheckBox
                checked={this.isCheckedAgravante(item.id)}
                checkedColor={colors.dangerColor}
                onPress={() =>
                  this.toggleAgravante(
                    item.id,
                    !this.isCheckedAgravante(item.id)
                  )
                }
                title={item.name}
              />
            ))}
          </>
        ))}
      </>
    );
  }

  renderCausas() {
    return (
      <>
        <Text style={[styles.label]}>Causa do Incidente</Text>

        <View>
          <Picker
            selectedValue={this.state.causa_id}
            onValueChange={(causa_id, itemIndex) =>
              this.setState({
                causa_id
              })
            }
          >
            <Picker.Item label={"Selecione"} value={null} key={0} />

            {causas.map(tipo => (
              <Picker.Item label={tipo.nome} value={tipo.id} key={tipo.id} />
            ))}
          </Picker>
        </View>
      </>
    );
  }

  renderLocalFato() {
    return (
      <>
        <Text style={[styles.label]}>Local do Fato</Text>

        <View>
          <Picker
            selectedValue={this.state.local_fato_id}
            onValueChange={(local_fato_id, itemIndex) =>
              this.setState({
                local_fato_id
              })
            }
          >
            <Picker.Item label={"Selecione"} value={null} key={0} />

            {locaisFato.map(tipo => (
              <Picker.Item label={tipo.nome} value={tipo.id} key={tipo.id} />
            ))}
          </Picker>
        </View>
      </>
    );
  }
  render() {
    const { temVitimas, qtdVitimas } = this.state;

    return (
      <View style={styles.container}>
        {this._maybeRenderDialogMaisQue6()}
        {this._maybeRenderDialogMaisQue6Veiculos()}

        {this._renderEditVitima()}
        {this._renderEditVeiculo()}

        {this._renderHeader()}
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <CheckBox
            checked={temVitimas}
            checkedColor={colors.dangerColor}
            onPress={this.handleTemVitimas}
            title="Tem vitimas?"
          />
          {this._maybeRenderVitimas()}
          {this._renderVeiculos()}

          <View style={{ paddingTop: 16, paddingHorizontal: 16 }}>
            <Text style={styles.label}> Audio da Narrativa </Text>
            <RecordSound
              loading={this.state.sendingNarrativa}
              text="Gravar a Narrativa"
              onComplete={sound => this.uploadNarrativa(sound)}
              onClear={() => this.setState({ anexo: null })}
            />
          </View>
          <View style={{ paddingTop: 16, paddingHorizontal: 16 }}>
            {this.renderAgravantes()}
          </View>
          <View style={{ paddingTop: 16, paddingHorizontal: 16 }}>
            {this.renderCausas()}
          </View>
          <View style={{ paddingTop: 16, paddingHorizontal: 16 }}>
            {this.renderLocalFato()}
          </View>
          <View style={{ paddingVertical: 42 }}>
            <Button
              icon={{ type: "font-awsome", name: "save" }}
              title="Salvar"
              onPress={this.save}
              loading={
                this.state.loadingLocation &&
                !this.state.sendingNarrativa &&
                !this.state.location
              }
              backgroundColor={
                this.state.loadingLocation &&
                !this.state.sendingNarrativa &&
                !this.state.location
                  ? colors.neutralColor
                  : colors.primaryCOlor
              }
              buttonStyle={{ borderRadius: 32 }}
            />
          </View>
        </ScrollView>
        {this.state.saving ? (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator
              color="white"
              style={styles.loading}
              size="large"
            />
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  center: {
    alignSelf: "center"
  },
  header: {
    paddingTop: 30,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  headerTile: {
    padding: 8
  },
  headerTileLeft: {
    paddingTop: 0
  },

  headerTileIcon: {
    fontSize: 30
  },
  contentContainer: {
    paddingTop: 30
  },
  orangeBackground: {
    backgroundColor: colors.warningColor
  },
  greenBackground: {
    backgroundColor: colors.successColor
  },
  label: {
    padding: 8,
    paddingTop: 32,
    fontSize: 22,
    textAlign: "center",
    left: -4
  },
  smallLabel: {
    fontSize: 16,
    textAlign: "left"
  },
  tileSetContainer: {
    alignItems: "stretch",
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 8
  },
  tileButton: {
    margin: 0,
    alignSelf: "stretch",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: colors.primaryCOlor,
    height: 120,
    minWidth: "40%",
    flex: 1
  },
  tileTitle: {
    color: "white",
    textAlign: "center",
    fontSize: 14
  },
  tileAccent: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600"
  },
  selectedButtonStyle: {
    backgroundColor: colors.primaryCOlor
  },
  selectedButtonSexStyle: {
    borderColor: colors.primaryCOlor,
    borderWidth: 1
  },
  selectedButtonTextStyle: {
    color: "white"
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  buttonSmall: {
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    alignSelf: "center"
  },
  loadingOverlay: {
    position: "absolute",
    zIndex: 999,
    backgroundColor: "rgba(0,0,0,0.4)",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
  },
  loading: {
    alignSelf: "center"
  },
  navigationFilename: {
    marginTop: 5
  }
});

import React from "react";
import CardTop from "./CardTop";
import axios from "axios";

export default class OcorrenciaMes extends React.PureComponent {
  state = {
    data: "",
    loading: true
  };

  async componentDidMount() {
    this.setState({
      loading: true
    });

    await this.getData();

    this.setState({
      loading: false
    });
  }

  async getData() {
    let response = await axios.get("/estatistica/ocorrencia-mes");

    this.setState(
      {
        data: response.data
      },
      () => {
        this.timeout = setTimeout(async () => {
          await this.getData();
        }, 10000);
      }
    );
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  render() {
    let { data, loading } = this.state;

    return (
      <div>
        <CardTop
          loading={loading}
          title="Ocorrências no Mês"
          value={data}
          icon="fa fa-car"
        />
      </div>
    );
  }
}

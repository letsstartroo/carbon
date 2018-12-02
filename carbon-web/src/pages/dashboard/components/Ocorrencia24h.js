import React from "react";
import CardTop from "./CardTop";
import axios from "axios";

export default class Ocorrencia24h extends React.PureComponent {
  state = {
    data: "",
    loading: false
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
    let response = await axios.get("/estatistica/ocorrencia-morte-24h");

    this.setState(
      {
        loading: false,
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
          title="Ocorrências com mortes nas últimas 24hrs"
          value={data}
          icon="fa fa-male"
        />
      </div>
    );
  }
}

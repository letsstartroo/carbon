import React from "react";
import CardTop from "./CardTop";
import axios from "axios";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Bar } from "react-chartjs-2";

export default class EvolucaoAcidenteTransito extends React.Component {
  state = {
    data: [[], []],
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
    let response = await axios.get("/estatistica/evolucao-acidente");

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

    console.log("data", data);

    const dataSource = {
      labels: [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro"
      ],
      datasets: [
        {
          label: "2017",
          backgroundColor: "rgba(16,162, 50,0.6)",
          borderColor: "rgba(16,162, 50,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(16,162, 50,0.8)",
          hoverBorderColor: "rgba(16,162, 50,1)",
          data: [...data[0]]
        },
        {
          label: "2018",
          backgroundColor: "rgba(236,69,14,0.6)",
          borderColor: "rgba(236,69,14,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(236,69,14,0.8)",
          hoverBorderColor: "rgba(236,69,14,1)",
          data: [...data[1]]
        }
      ]
    };

    return (
      <div>
        {loading && <LinearProgress />}
        <Bar
          data={dataSource}
          height={350}
          options={{
            responsive: true,
            maintainAspectRatio: false
          }}
        />
      </div>
    );
  }
}

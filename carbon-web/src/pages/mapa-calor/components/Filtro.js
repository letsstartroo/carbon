import React from "react";
import tiposVeiculos from "../../../services/tipo-veiculo";
import agravantes from "../../../services/agravante";
import causas from "../../../services/causas";
import situacoesVitimas from "../../../services/situacao-vitima";
import { Button, Paper } from "@material-ui/core";

const styles = {
  col: {
    width: "18%",
    float: "left",
    padding: 8
  },
  select: {
    padding: "6px 8px",
    height: 30,
    width: "100%"
  },
  date: {
    height: 30,
    width: "100%"
  }
};

export default class Filtro extends React.PureComponent {
  state = {
    filtros: {}
  };

  handleChange(prop, value) {
    let filtros = this.state.filtros;

    filtros[prop] = value;

    this.setState({
      filtros: { ...filtros }
    });
  }

  filtrar() {
    this.props.onChange(this.state.filtros);
  }

  render() {
    let { filtros } = this.state;

    return (
      <div>
        <div style={styles.col}>
          <label>Tipo de Veículo:</label> <br />
          <select
            style={styles.select}
            value={filtros.tipo_veiculo_id}
            onChange={e => this.handleChange("tipo_veiculo_id", e.target.value)}
          >
            <option value="">--Todos--</option>
            {tiposVeiculos.map((item, key) => (
              <option key={key} value={item.id}>
                {item.nome}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.col}>
          <label>Agravantes:</label> <br />
          <select
            style={styles.select}
            value={filtros.agravante_id}
            onChange={e => this.handleChange("agravante_id", e.target.value)}
          >
            <option value="">--Todos--</option>
            {agravantes.map((item, key) => (
              <optgroup label={item.name}>
                {item.children.map(child => (
                  <option key={key} value={child.id}>
                    {child.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        <div style={styles.col}>
          <label>Causas:</label> <br />
          <select
            style={styles.select}
            value={filtros.causa_id}
            onChange={e => this.handleChange("causa_id", e.target.value)}
          >
            <option value="">--Todos--</option>
            {causas.map((item, key) => (
              <option key={key} value={item.id}>
                {item.nome}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.col}>
          <label>Situação da Vitima:</label> <br />
          <select
            style={styles.select}
            value={filtros.situacao_vitima_id}
            onChange={e =>
              this.handleChange("situacao_vitima_id", e.target.value)
            }
          >
            <option value="">--Todos--</option>
            {situacoesVitimas.map((item, key) => (
              <option key={key} value={item.id}>
                {item.nome}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.col}>
          <label>Sexo:</label> <br />
          <select
            style={styles.select}
            value={filtros.sexo}
            onChange={e => this.handleChange("sexo", e.target.value)}
          >
            <option value="">--Todos--</option>
            <option value={"m"}>Masculino</option>
            <option value={"f"}>Feminino</option>
          </select>
        </div>

        <div style={styles.col}>
          <label>Data Inicial:</label> <br />
          <input
            type="date"
            style={styles.date}
            value={filtros.data_inicial}
            onChange={e => this.handleChange("data_inicial", e.target.value)}
          />
        </div>

        <div style={styles.col}>
          <label>Data Final:</label> <br />
          <input
            type="date"
            style={styles.date}
            value={filtros.data_final}
            onChange={e => this.handleChange("data_final", e.target.value)}
          />
        </div>
        <div style={styles.col}>
          <Button
            size="small"
            style={{ marginTop: 20 }}
            variant="contained"
            color="primary"
            onClick={() => this.filtrar()}
          >
            <i className="fa fa-search" /> Filtrar
          </Button>
        </div>
      </div>
    );
  }
}

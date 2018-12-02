import React from "react";
import styles from "../styles.module.scss";
import CircularProgress from "@material-ui/core/CircularProgress";

export default class CardTop extends React.PureComponent {
  render() {
    let { title, value, icon, color, loading } = this.props;
    return (
      <div className={styles.cardTop}>
        {loading && <CircularProgress />}

        <h2 className={styles.value}>{value}</h2>
        <h4 className={styles.title}>{title}</h4>

        <i className={icon + " " + styles.icon + " " + color} />
      </div>
    );
  }
}

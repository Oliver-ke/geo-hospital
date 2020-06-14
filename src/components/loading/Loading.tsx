import React, { FC, ReactElement } from "react";
import loading from "../../assets/loading.svg";

import './loading.styles.scss';
const Loading: FC = (): ReactElement => (
  <div className="loading">
    <img src={loading} alt="Loading" />
  </div>
);

export default Loading;

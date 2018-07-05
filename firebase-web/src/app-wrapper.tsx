import DevTool from "mobx-react-devtools";
import * as React from "react";

import App from './app';

export default function() {
  return (
    <div>
      <App/>
      <DevTool/>
    </div>
  );
}

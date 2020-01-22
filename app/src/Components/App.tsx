import * as React from "react";

export interface AppProps { firstName?: string; }

const App = ({ firstName }) => (
	<h1>Hello World {firstName ? firstName : "Mehdi"}</h1>
);

export default App;
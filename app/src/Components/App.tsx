import * as React from "react";
import "./../Style/_Styles.scss";

type AppProps = { firstName?: string; }

export const App = ({ firstName } : AppProps) => (
	<h1>Hello World {firstName ? firstName : "Mehdi"}</h1>
);

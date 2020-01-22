import * as React from "react";
import "./../Style/_Styles.scss";

export const App = ({ firstName }) => (
	<h1>Hello World {firstName ? firstName : "Mehdi"}</h1>
);

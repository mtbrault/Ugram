import * as React from "react";

export const App = ({ firstName }) => (
	<h1>Hello World {firstName ? firstName : "Mehdi"}</h1>
);
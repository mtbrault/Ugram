import * as React from "react";

export interface AppProps { firstName?: string; }

export const App = (props: AppProps) => <h1>Hello World {props.firstName ? props.firstName : "Mehdi"}</h1>;
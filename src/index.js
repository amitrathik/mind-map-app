import React from "react";
import ReactDOM  from "react-dom";
import "./styles/main.scss";

// views
import GraphView from "./views/Graph";

class App extends React.Component {
    constructor(props) {
		super(props);
	}

    render() {
        return (
            <div>
                <GraphView />
            </div>
        );
    }
}

ReactDOM.render(
	<App />,
	document.getElementById("root")
);
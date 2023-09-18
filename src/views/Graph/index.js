import React from "react";
import Graph from "../../components/Graph"
class GraphView extends React.Component{
    constructor(props){
        super(props);
        this.state={}
    }

    render(){
        return (
            <div>
                <Graph />
            </div>
        )
    }
}

export default GraphView
import React from "react";
import WordPressSVG from "../../assets/images/wp.svg";
import TwitterSVG from "../../assets/images/tw.svg";
import FacebookSVG from "../../assets/images/fb.svg";
import PinterestSVG from "../../assets/images/pin.svg";
import LinkedInSVG from "../../assets/images/li.svg";


class Graph extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
			nodes: [],
			links: [],
			selectedNode: "",
			showModal : false,
			newNode : null
		};	
		
		this.drag = this.drag.bind(this);
		this.drop = this.drop.bind(this);
		this.handleNodeClick = this.handleNodeClick.bind(this);
        this.graph = React.createRef();
	}

	
	componentDidMount(){
		// const graph = this.graph.current;
		// const graphSpecs = graph.getBoundingClientRect();
		// const nodes = [{
		// 	id : 0,
		// 	svg : WordPressSVG,
		// 	x : `${(graphSpecs.width/2) - 32}px`,
		// 	y : `${(graphSpecs.height/2) - 32}px`
		// }];
		// this.setState({
		// 	nodes : nodes,
		// 	selectedNode : nodes[0]
		// })
	}

	handleNodeClick = ev => {
		console.log("node clicked", ev.target.id);
		const thisNode = this.state.nodes.find(node => node.id === ev.target.id);
		console.log(thisNode)
		this.setState({
		  selectedNode: thisNode
		});
	  };
	
	  drag = ev => {
		const isExistingNode = ev.target.id.includes("node-");
		ev.dataTransfer.setData("text", ev.target.id);
		ev.dataTransfer.effectAllowed = isExistingNode ? "move" : "copy";
		ev.dataTransfer.dropEffect = isExistingNode ? "move" : "copy";
	  };
	
	  drop = ev => {
		const graph = this.graph.current;
		const graphSpecs = graph.getBoundingClientRect();
		ev.preventDefault();
		const data = ev.dataTransfer.getData("text");
		console.log(
		  "drop",
		  ev.target,
		  graphSpecs.top,
		  graphSpecs.left,
		  ev.clientX,
		  ev.clientY
		);

		console.log(data);
		const nodeId = `node-${this.state.nodes.length}`;
		if (this.state.nodes.length < 1) {
			let svg = "";
			switch(data){
				case "wordpress":
						svg = WordPressSVG
					break;
				case "facebook":
						svg = FacebookSVG
					break;
				case "linkedin":
						svg = LinkedInSVG
					break;
				case "twitter":
						svg = TwitterSVG
					break;
				case "pinterest":
					svg = PinterestSVG
				break;
				default:
					break;
			}
		  this.state.nodes.push({
			id: nodeId,
			y: ev.clientY - graphSpecs.top - 32 + "px",
			x: ev.clientX - graphSpecs.left - 32 + "px",
			svg: svg,
			type : data
		  });
		} else {
		  const thisNode = this.state.nodes.find(node => node.id === data);
		  const thisNodeIndex = this.state.nodes.findIndex(
			node => node.id === data
		  );
		  console.log(!thisNode)
		  let svg = "";
		  switch(data){
			  case "wordpress":
					  svg = WordPressSVG
				  break;
			  case "facebook":
					  svg = FacebookSVG
				  break;
			  case "linkedin":
					  svg = LinkedInSVG
				  break;
			  case "twitter":
					  svg = TwitterSVG
				  break;
			  case "pinterest":
			          svg = PinterestSVG
			  default:
					svg = WordPressSVG
				  break;
		  }
		  if (!thisNode) {
			console.log(this.state.selectedNode)
			const newNode = {
				id : nodeId,
				y: ev.clientY - graphSpecs.top - 32 + "px",
				x: ev.clientX - graphSpecs.left - 32 + "px",
				svg: svg,
				type:data
			}

			this.state.nodes.push(newNode);
	
			this.state.links.push({
				source: this.state.selectedNode.id || "node-0",
				target: newNode.id,
			});
	
			this.setState({
			  nodes: this.state.nodes,
			  links: this.state.links,
			});
		  } 
		}
	  };
	
	  dragover = ev => {
		ev.preventDefault();
		const graph = ev.target.getBoundingClientRect();
		const data = ev.dataTransfer.getData("text");
		console.log("dragOver", ev.target, data);
		return false;
	  };
	
	  dragend = ev => {
		ev.preventDefault();
		const graph = this.graph.current;
		const graphSpecs = graph.getBoundingClientRect();
		console.log(
			"dragend",
			ev.target,
			graphSpecs,
			ev.clientX,
			ev.clientY
		  );
		const thisNode = this.state.nodes.find(node => node.id === ev.target.id);
		const thisNodeIndex = this.state.nodes.findIndex(
		  node => node.id === ev.target.id
		);
	
		if (thisNode) {
			console.log("dragEnd", thisNode);
		  thisNode.x = ev.clientX - graphSpecs.left - 32 + "px";
		  thisNode.y = ev.clientY - graphSpecs.top - 32 + "px";
		  this.setState({
			nodes: [
			  ...this.state.nodes.slice(0, thisNodeIndex), // get all items before updated item
			  thisNode, // the updated item
			  ...this.state.nodes.slice(thisNodeIndex + 1) // get all items after updated item
			]
		  });
		}
	  };


	getNodePlatformSVG(id) {
        let platform = "";
		switch(id){
			case "wordpress":
					platform = WordPressSVG
				break;
			case "facebook":
					platform = FacebookSVG
				break;
			case "linkedin":
					platform = LinkedInSVG
				break;
			case "twitter":
					platform = TwitterSVG
				break;
			case "pinterest":
					platform = PinterestSVG
				break;
			default:
				break;
		}
        
        return platform;
	}

 
	
	render() {
		const { selectedNode, newNode } = this.state;
		const graphHeight = 400;
		const graphWidth = 800;
		const arrowMarkerWidth = 10;
		const arrowMarkerHeight = 10;
		return (
			<div>
				<div className="newNodes">
					<button type="button"  className="btn btn-link"><img id="twitter" draggable="true"  onDragStart={(e) =>this.drag(e)}  className="img" width="64" height="64" src={TwitterSVG} /></button>
					<button type="button"  className="btn btn-link"><img id="facebook" draggable="true" onDragStart={(e) =>this.drag(e)} className="img" width="64" height="64" src={FacebookSVG} /></button>
					<button type="button"  className="btn btn-link"><img id="pinterest" draggable="true" onDragStart={(e) =>this.drag(e)} className="img" width="64" height="64" src={PinterestSVG} /></button>
					<button type="button" className="btn btn-link"><img id="linkedin" draggable="true" onDragStart={(e) =>this.drag(e)} className="img" width="64" height="64" src={LinkedInSVG} /></button>
				</div>
                <div className="graphContainer" >
					<svg
						name="graph"
						width={graphWidth}
						height={graphHeight}
						className="graph"
						onDrop={this.drop}
						onDragOver={this.dragover}
						ref={this.graph}
						>
						<defs>
							<marker
							id="arrow"
							markerWidth={arrowMarkerWidth}
							markerHeight={arrowMarkerHeight}
							refX={2}
							refY={6}
							orient={`auto`}
							>
							<path d="M2,2 L2,11 L10,6 L2,2" fill="black" />
							</marker>
						</defs>

						{this.state.nodes.length > 0
							? this.state.nodes.map((node, index) => {
								const nodeClass =
								selectedNode !== "" && node.id === selectedNode.id
									? "selected"
									: "";
								return (
								<foreignObject
									key={index}
									width={64}
									height={64}
									style={{ transform: `translate(${node.x},${node.y})` }}
									className={`node ${nodeClass}`}
								>
									<img
									id={`${node.id}`}
									className="node"
									width={64}
									height={64}
									draggable={true}
									onDragStart={this.drag}
									onDragOver={this.dragover}
									onDragEnd={this.dragend}
									onClick={this.handleNodeClick}
									src={node.svg}
									/>
								</foreignObject>
								);
							})
							: ""}
						{this.state.links.length > 0
							? this.state.links.map((link, index) => {
								const source = this.state.nodes.find(
								node => node.id === link.source
								);
								const target = this.state.nodes.find(
								node => node.id === link.target
								);
							    console.log(source, target)
								const sourceX = parseInt(source.x, 10) + 32;
								const sourceY = parseInt(source.y, 10) + 32;
								const sourceLeft = parseInt(source.x, 10);
								const sourceRight = sourceLeft + 64;
								const sourceTop = parseInt(source.y, 10);
								const sourceBottom = sourceTop + 64;

								const targetX = parseInt(target.x, 10) + 32;
								const targetY = parseInt(target.y, 10) + 32;
								const targetLeft = parseInt(target.x, 10);
								const targetRight = targetLeft + 64;
								const targetTop = parseInt(target.y, 10);
								const targetBottom = targetTop + 64;

								const dY = targetY - sourceY;
								const dX = targetX - sourceX;
								const m = dY / dX;
								const b = targetY - m * targetX;

								let LX = sourceX;
								let LY = sourceY;
								let MX = targetX;
								let MY = targetY;

								if (targetX < sourceX) {
								// if target node is on top left side of source node
								LX = sourceX - 32 - 7;
								MX = targetX + 32;
								LY = m * LX + b;
								MY = m * MX + b;
								if (MY > targetBottom) {
									MY = targetBottom;
									LY = sourceTop - 7;
									MX = (MY - b) / m;
									LX = (LY - b) / m;
								} else if (MY < targetTop) {
									MY = targetTop;
									LY = sourceBottom + 7;
									MX = (MY - b) / m;
									LX = (LY - b) / m;
								}
								} else {
									// if target node is on top left side of source node
									LX = sourceX + 32 + 7;
									MX = targetX - 32;
									LY = m * LX + b;
									MY = m * MX + b;
									if (MY > targetBottom) {
										MY = targetBottom;
										LY = sourceTop - 7;
										MX = (MY - b) / m;
										LX = (LY - b) / m;
									} else if (MY < targetTop) {
										MY = targetTop;
										LY = sourceBottom + 7;
										MX = (MY - b) / m;
										LX = (LY - b) / m;
									}
								}

								return (
								<path
									key={index}
									d={`M${MX},${MY} L${LX},${LY}`}
									stroke="black"
									strokeWidth={1}
									fill="none"
									markerEnd={`url(#arrow)`}
								/>
								);
							})
							: ""}
						</svg>
                </div>
			</div>
		);
	}
}

export default Graph;

import React from "react";
import { ForceGraph2D } from "react-force-graph";
import { Col } from "reactstrap";

export interface INode {
  id: string;
  val: number;
  name: string;
  __typename?: string;
}
export interface ILink {
  source: string;
  target: string;
  curvature?: number;
}
export interface Data {
  nodes: Array<INode>;
  links: Array<ILink>;
}
const processData = (dr: number[][]): Data => {
  const nodes = new Array<INode>();
  const links = new Array<ILink>();
  dr.forEach((d, idx) => {
    nodes.push({
      id: `${idx}`,
      name: `${idx}`,
      val: idx,
      __typename: idx % 2 ? "odd" : "even",
    });
    d.forEach((l) => {
      links.push({
        source: `${idx}`,
        target: `${l}`,
        curvature: idx === l ? .5 : undefined
      });
    });
  });
  return { nodes, links };
};
const Graph: React.FC<{ rawData: number[][] }> = ({ rawData }) => {
  const [data, setData] = React.useState<Data>();
  React.useEffect(() => {
    setData(processData(rawData));
  }, [rawData]);

  return (
    <Col xs="12">
      <ForceGraph2D
        graphData={data}
        linkDirectionalArrowLength={5}
        nodeVal={5}
        nodeAutoColorBy={"__typename"}
        enablePointerInteraction={true}
        linkCurvature="curvature"
        nodeCanvasObject={(node: any, ctx, globalScale) => {
          const label = node.id;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = "#FFFFFF";
          ctx.fillText(`${label}`, node.x ?? 0, node.y ?? 0);
        }}
        nodeCanvasObjectMode={() => "after"}
      />
    </Col>
  );


};

export default Graph;

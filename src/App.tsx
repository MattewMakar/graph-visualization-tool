import React from "react";
import Graph from "./Graph";
import "./App.css";
import { Badge, Container, Row } from "reactstrap";
import DataProcessor from "./DataProcessor";
function App() {
  const [rawData, setRawData] = React.useState<number[][]>([]);
  return (
    <Container className="App" fluid>
      <h1 style={{ textAlign: "center" }}>
        Graph data structure Visualization tool{" "}
        <Badge>using react-force-graph</Badge>
      </h1>
      <Row>
        <DataProcessor setRawData={(data: number[][]) => setRawData(data)} />
        <Graph rawData={rawData} />
      </Row>
    </Container>
  );
}

export default App;

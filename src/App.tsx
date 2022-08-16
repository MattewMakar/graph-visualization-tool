import React from "react";
import Graph from "./Graph";
import "./App.css";
import { Badge, Container, Row, Spinner } from "reactstrap";
import DataProcessor from "./DataProcessor";
function App() {
  const [rawData, setRawData] = React.useState<number[][]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  return (
    <Container className="App" fluid>
      <h1 style={{ textAlign: "center" }}>
        Graph data structure Visualization tool{" "}
        <Badge pill style={{ fontSize: "1rem", position: "relative", top: -5 }}>using react-force-graph</Badge>
      </h1>
      <Row>
        <DataProcessor setRawData={(data: number[][]) => setRawData(data)} setIsLoading={(loading: boolean)=> setIsLoading(loading)} />
        {isLoading ? <div className="d-flex w-100 h-100 justify-content-center align-items-center"><Spinner
          className="m-5"
          color="primary"
        >
          Loading...
        </Spinner></div> : <Graph rawData={rawData} />}
      </Row>
    </Container>
  );
}

export default App;

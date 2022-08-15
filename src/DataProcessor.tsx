import React from "react";
import { Col, FormFeedback, FormGroup, Input, Label } from "reactstrap";

const DataProcessor: React.FC<{ setRawData: (data : number[][]) => void }> = ({
  setRawData,
}) => {
    const [hasError, setHasError] =  React.useState<boolean>(true);
  const onChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    const fileList = e.target.files;
    if (!fileList?.length) return;
    fileReader.readAsText(fileList[0], "UTF-8");
    fileReader.onload = (e) => {
      const input = JSON.parse(`${e.target?.result}`);
      if (input instanceof Array<number[]>) {
        setRawData(input as number[][]);
      } else if(typeof input === 'object'){        
        const keys = Object.keys(input);
        const rawData = new Array<number[]>(keys.length);
        for(const key of keys)
        {
             rawData[+key] = input[key];
        }
        setRawData(rawData);
      }else {
        setHasError(true)
        setRawData([])
      }
    };
  };
  return (
    <Col xs="12">
      <FormGroup>
        <Label for="jsonFile">
          Upload your JSON file here 
          <br /> <strong>Note:</strong>  as of now the app only support number node
          in 2d array and adjacency lists representation of a graph{" "}
        </Label>
        <Input
          name="jsonFile"
          type="file"
          accept=".json,.jsonc"
          bsSize="lg"
          onChange={onChangeFile}
          valid={!hasError}
        />
        <FormFeedback>Invalid input</FormFeedback>
      </FormGroup>
    </Col>
  );
};

export default DataProcessor;

import React from 'react';
import { Table, Button, Tag, Row, Col, Divider} from 'antd';

export const Extra = (props) => {
  const { playerIndex } = props;
  return (
    <Row gutter={4} justify="start" type="flex">
      <Col>
        <Button
          onClick={() => {
            props.onClickItem(playerIndex, { score: 1, name: "Black" });
          }}
          shape="primary"
          icon="line"
          >
            </Button>
      </Col>
      <Col>
        <Button
          onClick={() => {
            props.onClickItem(playerIndex, { score: 2, name: "Red" });
          }}
          shape="primary"
          icon="pause"
        ></Button>
      </Col>
      <Col>
        <Button
          onClick={() => {
            props.onClickItem(playerIndex, { score: 3, name: "3 Pairs" });
          }}
          shape="primary"
          icon="menu"
        ></Button>
      </Col>
      <Col>
        <Button
          onClick={() => {
            props.onClickItem(playerIndex, { score: 4, name: "FoaK" });
          }}
          shape="primary"
          icon="appstore"
        ></Button>
      </Col>
      <Col>
        <Button
          onClick={() => {
            props.onClickItem(playerIndex, { score: -1, name: "Black" });
          }}
          shape="danger"
          icon="line"
        ></Button>
      </Col>
      <Col>
        <Button
          onClick={() => {
            props.onClickItem(playerIndex, { score: -2, name: "Red" });
          }}
          shape="danger"
          icon="pause"
        ></Button>
      </Col>
      <Col>
        <Button
          onClick={() => {
            props.onClickItem(playerIndex, { score: -3, name: "3 Pairs" });
          }}
          shape="danger"
          icon="menu"
        ></Button>
      </Col>
      <Col>
        <Button
          onClick={() => {
            props.onClickItem(playerIndex, { score: -4, name: "FoaK" });
          }}
          shape="danger"
          icon="appstore"
        ></Button>
      </Col>
    </Row>

  )
}
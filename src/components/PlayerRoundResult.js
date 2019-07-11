import React from 'react';
import { Row, Col, Tag } from 'antd';

export const PlayerRoundResult = (props) => {
  const { playerIndex, items, onRemoveItem } = props;

  return (
    <Row justify="start" type="flex">
      {
        items.map((item, index) => {
          return (
            <Col key={index} gutter={8}>
              <Tag
                color={item.score >= 0 ? "#87d068" : "#f50"}
                closable
                onClose={(e) => {
                  e.preventDefault();
                  onRemoveItem(playerIndex, index)
                }}>
                {item.name}
              </Tag>
            </Col>
          )
        })
      }
    </Row>
  );
}
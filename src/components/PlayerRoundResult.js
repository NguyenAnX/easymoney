import React from 'react';
import { Row, Col, Tag, Button } from 'antd';

export const PlayerRoundResult = (props) => {
  const { player, playerIndex, items, onRemoveItem, onRemovePosition } = props;

  return (
    <Row justify="start" type="flex">
      {player.position != 0 ?
        <Col>
          <Tag
            color="#108ee9"
            onClick={() => onRemovePosition(playerIndex)}
          >
            {player.position}
          </Tag>
        </Col> : null}
      {
        items.map((item, index) => {
          return (
            <Col key={index}>
              <Tag
                color={item.score >= 0 ? "#87d068" : "#f50"}
                onClick={(e) => {
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
import React from 'react';
import { Button, Row, Col } from 'antd';

export const RoundPosition = (props) => {
  const { positions, player, playerIndex, onPositionClick } = props;
  return (
    <Row justify="start" type="flex" gutter={4}>
      {
        Object.keys(positions).map((key) => {
          return (
            positions[key] && player.position == 0 ?
              <Col>
                <Button 
                  onClick={() => onPositionClick(playerIndex, key)}
                  shape="circle">
                  {key}
                </Button>
              </Col> : null
          )
        })
      }
    </Row>
  )
}
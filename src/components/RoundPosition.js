import React from 'react';
import { Button, Row, Col, Dropdown, Menu, Icon } from 'antd';

const winItems = [
  {
    name: "Black",
    score: 1,
  },
  {
    name: "Red",
    score: 2,
  },
  {
    name: "3 Pairs",
    score: 3,
  },
  {
    name: "FoaK",
    score: 4,
  },
]

const loseItems = [
  {
    name: "Black",
    score: -1,
  },
  {
    name: "Red",
    score: -2,
  },
  {
    name: "3 Pairs",
    score: -3,
  },
  {
    name: "FoaK",
    score: -4,
  },
]

export const RoundPosition = (props) => {
  const { positions, player, playerIndex, onPositionClick, onExtraItemClick } = props;

  const winMenu = (
    <Menu style={{ backgroundColor: '#87d068' }}>
      {
        winItems.map((item, index) => {
          return (
            <Menu.Item
              onClick={() => onExtraItemClick(playerIndex, item)}
              key={index}
            >
              {item.name}
            </Menu.Item>
          )
        })
      }
    </Menu>
  )

  const loseMenu = (
    <Menu style={{ backgroundColor: '#f50' }}>
      {
        loseItems.map((item, index) => {
          return (
            <Menu.Item
              onClick={() => onExtraItemClick(playerIndex, item)}
              key={index}
            >
              {item.name}
            </Menu.Item>
          )
        })
      }
    </Menu>
  )

  return (
    <Row justify="start" type="flex" gutter={4}>
      {
        Object.keys(positions).map((key) => {
          return (
            positions[key].selected === false && player.position === 0 ?
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
      <Col>
        <Dropdown overlay={winMenu}>
          <Button style={{ backgroundColor: '#87d068' }} shape="circle">
            <Icon type="plus"></Icon>
          </Button>
        </Dropdown>
      </Col>
      <Col>
        <Dropdown overlay={loseMenu}>
          <Button style={{ backgroundColor: '#f50' }} shape="circle">
            <Icon type="minus"></Icon>
          </Button>
        </Dropdown>
      </Col>
    </Row>
  )
}
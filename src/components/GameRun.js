import React from 'react';
import { Table, Button, Tag, Row, Col, Card } from 'antd';
import { RoundPosition } from './RoundPosition';
import { Extra } from './Extra';
import { PlayerRoundResult } from './PlayerRoundResult';

class GameRun extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      players: [
        {
          key: '1',
          name: 'p1',
          score: 0,
          earn: 0,
          roundResult: [],
          position: 0,
        },
        {
          key: '2',
          name: 'p2',
          score: 0,
          earn: 0,
          roundResult: [],
          position: 0,
        },
        {
          key: '3',
          name: 'p3',
          score: 0,
          earn: 0,
          roundResult: [],
          position: 0,
        },
        {
          key: '4',
          name: 'p4',
          score: 0,
          earn: 0,
          roundResult: [],
          position: 0,
        },
      ],
      positions: {
        1: true,
        2: true,
        3: true,
        4: true,
      }
    }

    this.columns = [
      {
        render: () => <Button shape="circle" icon="edit" />,
      },
      {
        title: 'Name',
        dataIndex: 'name',
      },
      { 
        title: 'Position',
        dataIndex: '',
        render: (text, record, index) => <RoundPosition positions={this.state.positions} player={record} playerIndex={index} onPositionClick={this.onPositionClick} />,
      },
      {
        title: 'Extra',
        dataIndex: 'extra',
        render: (text, record, index) => <Extra playerIndex={index} onClickItem={this.onClickExtraItem} />
      },
      {
        title: 'Round Result',
        dataIndex: 'roundResult',
        render: (text, record, index) => <PlayerRoundResult playerIndex={index} items={record.roundResult} onRemoveItem={this.removePlayerItem} />
      },
      {
        title: 'Earn',
        dataIndex: 'earn',
      },
      {
        title: 'Score',
        dataIndex: 'score',
      },
    ];

    this.onClickExtraItem = this.onClickExtraItem.bind(this)
    this.removePlayerItem = this.removePlayerItem.bind(this)
    this.onPositionClick = this.onPositionClick.bind(this)
  }


  onClickExtraItem(playerIndex, item) {
    let player = this.state.players[playerIndex]
    player.earn += item.score
    player.roundResult.push(item)
    this.forceUpdate()
  }

  removePlayerItem(playerIndex, itemIndex) {
    let player = this.state.players[playerIndex]
    let item = player.roundResult[itemIndex]
    player.earn -= item.score
    player.roundResult.splice(itemIndex, 1)
    this.forceUpdate()
  }

  onPositionClick(playerIndex, position) {
    let positions = this.state.positions
    positions[position] = false

    let player = this.state.players[playerIndex]
    player.position = position

    this.forceUpdate()
  }

  render() {
    return (
      <Card bordered={false}>
        <Row gutter={8} justify="start" type="flex">
          <Col>
            <Button type="primary">Next Round</Button>
          </Col>
          <Col>
            <Button>Clear</Button>
          </Col>
          <Col>
            <Button type="danger">End Game</Button>
          </Col>
        </Row>
        <br/>
        <Row>
          <Table
            dataSource={this.state.players}
            columns={this.columns}
            bordered
            pagination={false}
          />
        </Row>
      </Card>
    )
  }
}

export default GameRun;

import React from 'react';
import {Button, Card, Col, message, Popconfirm, Row, Table} from 'antd';
import ls from 'local-storage'
import {RoundPosition} from './RoundPosition';
import {PlayerRoundResult} from './PlayerRoundResult';

const defaultStateMachine = []

const defaultPlayers = [
  {
    key: '1',
    name: 'An',
    score: 0,
    earn: 0,
    roundResult: [],
    position: 0,
  },
  {
    key: '2',
    name: 'Đạt',
    score: 0,
    earn: 0,
    roundResult: [],
    position: 0,
  },
  {
    key: '3',
    name: 'Sơn',
    score: 0,
    earn: 0,
    roundResult: [],
    position: 0,
  },
  {
    key: '4',
    name: 'Thịnh',
    score: 0,
    earn: 0,
    roundResult: [],
    position: 0,
  },
  {
    key: '5',
    name: 'Trung',
    score: 0,
    earn: 0,
    roundResult: [],
    position: 0,
  },
  {
    key: '6',
    name: 'Vinh',
    score: 0,
    earn: 0,
    roundResult: [],
    position: 0,
  },
]

const initPositions = {
  1: {
    selected: false,
    score: 2,
  },
  2: {
    selected: false,
    score: 1,
  },
  3: {
    selected: false,
    score: -1,
  },
  4: {
    selected: false,
    score: -2,
  },
}

class GameRun extends React.Component {
  constructor(props) {
    super(props)
    const persistedState = ls.get('easyMoney')
    if (persistedState) {
      this.state = persistedState
    } else {
      this.state = {
        players: defaultPlayers,
        positions: initPositions,
        stateMachine: defaultStateMachine,
      }
    }
    this.initColumns()
  }

  initColumns = () => {
    this.columns = [
      {
        title: 'Name',
        dataIndex: 'name',
      },
      {
        title: 'Position',
        dataIndex: '',
        render: (text, record, index) =>
          <RoundPosition
            positions={this.state.positions}
            player={record}
            playerIndex={index}
            onPositionClick={this.selectPosition}
            onExtraItemClick={this.addExtraItem}
          />,
      },
      {
        title: 'Round Result',
        dataIndex: 'roundResult',
        render: (text, record, index) =>
          <PlayerRoundResult
            player={record}
            playerIndex={index}
            items={record.roundResult}
            onRemoveItem={this.removePlayerItem}
            onRemovePosition={this.removePlayerPosition}
          />
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
  }

  addExtraItem = (playerIndex, item) => {
    let player = this.state.players[playerIndex]
    player.earn += item.score
    player.roundResult.push(item)
    this.forceUpdate()
  }

  removePlayerItem = (playerIndex, itemIndex) => {
    let player = this.state.players[playerIndex]
    let item = player.roundResult[itemIndex]
    player.earn -= item.score
    player.roundResult.splice(itemIndex, 1)
    this.forceUpdate()
  }

  selectPosition = (playerIndex, positionIndex) => {
    let addedPosition = this.state.positions[positionIndex]
    addedPosition.selected = true

    let player = this.state.players[playerIndex]
    player.position = positionIndex
    player.earn += addedPosition.score

    this.forceUpdate()
  }

  removePlayerPosition = (playerIndex) => {
    let player = this.state.players[playerIndex]
    let positionIndex = player.position
    let removedPosition = this.state.positions[positionIndex]

    removedPosition.selected = false
    player.position = 0
    player.earn -= removedPosition.score

    this.forceUpdate()
  }

  isRoundCheckSumOK = () => {
    const players = this.state.players
    const checkSum = players.reduce((checkSum, player) => {
      return checkSum + player.earn
    }, 0)

    return checkSum === 0
  }

  onNextRoundClick = () => {
    const players = this.updatePlayers()
    const positions = this.resetPositions()
    const updatedStateMachine = this.updateStateMachine()

    this.setState({
      players,
      positions,
      updatedStateMachine
    }, () => {
      ls.set('easyMoney', this.state)
    })
  }

  clearRoundResult = () => {
    const players = this.resetPlayersRoundResult()
    const positions = this.resetPositions()
    this.setState({
      players,
      positions
    })
  }

  updateStateMachine = () => {
    defaultStateMachine.push({
      timestamp: Date.now(),
      players: this.state.players,
    })
  }

  updatePlayers = () => {
    return this.state.players.map((player) => {
      const newScore = player.score + player.earn
      return {
        ...player,
        earn: 0,
        score: newScore,
        position: 0,
        roundResult: [],
      }
    })
  }

  resetPlayersRoundResult = () => {
    return this.state.players.map((player) => {
      return {
        ...player,
        earn: 0,
        position: 0,
        roundResult: [],
      }
    })
  }

  resetPositions = () => {
    return Object.keys(this.state.positions).reduce((memo, positionIndex) => {
      const position = this.state.positions[positionIndex]
      return {
        ...memo,
        [positionIndex]: {
          selected: false,
          score: position.score,
        }
      }
    }, {})
  }

  endGame = () => {
    const players = this.state.players.map((player) => {
      return {
        ...player,
        earn: 0,
        position: 0,
        roundResult: [],
        score: 0,
      }
    })
    const positions = this.resetPositions()

    this.setState({
        players,
        positions,
      },
      () => {
        ls.set('easyMoney', this.state)
      }
    )
    message.info('Started a new game');
  }

  render() {
    return (
      <Card bordered={false}>
        <Row gutter={8} justify="start" type="flex">
          <Col>
            <Button
              disabled={!this.isRoundCheckSumOK()}
              onClick={this.onNextRoundClick}
              type="primary"
            >
              Next Round
            </Button>
          </Col>
          <Col>
            <Button onClick={this.clearRoundResult}>Clear</Button>
          </Col>
          <Col>
            <Popconfirm placement="bottom" title="Are you sure to end game?" onConfirm={this.endGame} okText="Yes"
                        cancelText="No">
              <Button type="danger">End Game</Button>
            </Popconfirm>
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

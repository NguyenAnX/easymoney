import React from 'react';
import { Table, Divider, Tag } from 'antd';
import { GameRunAction } from './GameRunAction';
import 'antd/dist/antd.css';

const dataSource = [
    {
      key: '1',
      name: 'An',
      score: 0,
    },
    {
      key: '2',
      name: 'Thinh',
      score: 0,
    },
    {
        key: '3',
        name: 'Dat',
        score: 0,
      },
  ];
  
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score',
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: () => <GameRunAction />,
    },
  ];
  

export const GameRun = () => {
    return (
        <div>
            <Table dataSource={dataSource} columns={columns} />
        </div>
    )
}

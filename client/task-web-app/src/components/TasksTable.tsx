import { Button, Checkbox, Col, Row, Table, Tag } from 'antd';
import React from 'react';
import { useModifyTasks } from '../hooks/HttpTasks';
import { HumanDate } from './HumanDate';
import { TaskItem } from 'src/entity/Task';


export interface TasksTableOptions {
  tasks: [];
  onEdit: (taskId: number) => void;
}

export const TasksTable = ({onEdit, tasks}: TasksTableOptions) => {
  const {executeUpdate, result} = useModifyTasks()

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      sorter: (a: TaskItem, b: TaskItem) => {
        return a.priority.localeCompare(b.priority);
      }
    },
    {
      title: 'Due Date',
      dataIndex: 'dueAt',
      key: 'dueAt',
      render: (_, {dueAt}, idx: number) => {
        return (
          <HumanDate isoDate={dueAt} key={`dueAt:${idx}`}/>
        )
      },
      sorter: (a: TaskItem, b: TaskItem) => {
        const a2 = new Date(a.dueAt) || Date.UTC(1970,  0, 1)
        const b2 = new Date(b.dueAt) || Date.UTC(1970,  0, 1)
        return a2.getTime() - b2.getTime()
      }
    },
    {
      title: 'Status',
      dataIndex: 'completedAt',
      key: 'status',
      render: (_, {completedAt}, idx: number) => {
        const color = completedAt ? 'green' : 'orange';
        return (
          <Tag color={color} key={`status:${idx}`}>
            {completedAt ? 'Completed' : 'ToDo'}
          </Tag>
        )
      },
      sorter: (a: TaskItem, b: TaskItem) => {
        const a2 = a.completedAt ? 'Completed' : 'ToDo';
        const b2 = b.completedAt ? 'Completed' : 'ToDo';
        return a2.localeCompare(b2);
      }
    },
    {
      title: 'Created Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (_, {createdAt}, idx: number) => {
        return (
          <HumanDate isoDate={createdAt} key={`createdAt:${idx}`}/>
        )
      }
    },
    {
      title: 'Completed Date',
      dataIndex: 'completedAt',
      key: 'completedAt',
      render: (_, {completedAt}, idx: number) => {
        return (
          <HumanDate isoDate={completedAt} key={`completedAt:${idx}`}/>
        )
      }
    },
    {
      title: 'Completed?',
      key: 'completed',
      fixed: 'right',
      width: 100,
      render: (_, task, idx: number) => {
        return (<Checkbox
          onChange={async () => {
            task.completedAt = task.completedAt ? null : new Date().toISOString()
            await executeUpdate(task.id, task)
            }
          }
          checked={!!task.completedAt}
          key={`completed:${idx}`
          }/>)
      },
    },
    {
      title: 'Actions',
      key: 'edit',
      fixed: 'right',
      width: 100,
      render: (_, task, idx: number) => {
        return (<Button
          size="small"
          key={`edit:${idx}`}
          onClick={() => onEdit(task.id)}
        >
          edit
        </Button>)
      },
    },
  ];

  return (
    <Row>
      <Col span={24}>
        <br/>
        {tasks ? <Table dataSource={tasks} columns={columns} rowKey="id"/> : null}
      </Col>
    </Row>
  )
}

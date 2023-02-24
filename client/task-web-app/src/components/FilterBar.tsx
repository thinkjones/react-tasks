import { Col, Row, Select, DatePicker, Input, Radio, Button } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import { PlusOutlined } from '@ant-design/icons';
import { TaskPriority, TasksFilter, TaskStatus } from '../entity/Task';
import dayjs from 'dayjs';

const StyledFormItemLabel = styled.div`
  font-size: 1em;
  color: gray;
  display: inline-block;
  margin-right: 5px;
`;

const Spacer = styled.div`
  display: inline-block;
  min-width: 20px;
`;

export interface SearchItemOptions {
  onChange: (value: string) => void
  value: string | undefined;
}

const ItemLabel = ({text}: { text: string }) => {
  return <StyledFormItemLabel>{text}</StyledFormItemLabel>
}

const SearchFilter = ({onChange, value}: SearchItemOptions) => {
  return (
    <>
      <ItemLabel text="Search:"/>
      <Input placeholder="title or description" value={value} style={{width: 200}}
             onChange={e => onChange(e.target.value)}/>
    </>
  )
}

const DueDateFilter = ({onChange, value}: SearchItemOptions) => {
  return (
    <>
      <ItemLabel text="Due Date:"/>
      <DatePicker value={value ? dayjs(value.slice(0, 10), 'YYYY-MM-DD') : undefined}
                  onChange={e => onChange(e ? e.toISOString() : '')}/>
    </>
  )
}

const TaskPriorityFilter = ({onChange, value}: SearchItemOptions) => {
  return (
    <>
      <ItemLabel text="Priority:"/>
      <Select
        defaultValue=""
        placeholder="Select Priority"
        style={{width: 120}}
        value={value}
        onChange={e => onChange(e)}
        options={[
          {value: 'high', label: 'High'},
          {value: 'medium', label: 'Medium'},
          {value: 'low', label: 'Low'}
        ]}
      />
    </>
  )
}

const StatusFilter = ({onChange, value}: SearchItemOptions) => {
  return (
    <>
      <Radio.Group
        value={value}
        defaultValue="all"
        onChange={(e) => {
          console.log('StatusFilter OnChance', {value: e.target.value})
          onChange(e.target.value)
      }}>
        <Radio.Button value="all">All</Radio.Button>
        <Radio.Button value="completed">Completed</Radio.Button>
        <Radio.Button value="todo">To Do</Radio.Button>
      </Radio.Group>
    </>
  )
}

export interface FilterBarOptions {
  handleAddTask: () => void;
  onSearch: (search: TasksFilter) => void
}

export const FilterBar = ({handleAddTask, onSearch}: FilterBarOptions) => {
  const [task, setEditTask] = useState<TasksFilter>({searchTerm: '', status: 'all', dueAt: undefined, priority: undefined} as TasksFilter);
  return (

    <Row>
      <Col span={23}>
        <SearchFilter value={task.searchTerm} onChange={text => {
          task.searchTerm = text
          setEditTask(task)
        }}/>
        <Spacer/>
        <StatusFilter value={task.status} onChange={text => {
          console.log('Parent', {state: text});
          setEditTask({...task, status: text as TaskStatus})
        }}/>
        <Spacer/>
        <DueDateFilter value={task.dueAt} onChange={text => {
          task.dueAt = text
          setEditTask(task)
        }}/>
        <Spacer/>
        <TaskPriorityFilter value={task.priority} onChange={text => {
          task.priority = text as TaskPriority
          setEditTask(task)
        }}/>
        <Spacer/>
        <Button type="primary"
                onClick={() => {
                  console.log('searchTask', task)
                  onSearch(task)
                }
                }
        >Search</Button>
        <Spacer/>
        <Button
          onClick={() => {
            const newTask = {...task, searchTerm: '', status: 'all', dueAt: undefined, priority: undefined} as TasksFilter
            setEditTask(newTask)
            onSearch(newTask)
          }
          }>
          Clear</Button>
      </Col>
      <Col span={1}>
        <Button type="primary" icon={<PlusOutlined/>} onClick={handleAddTask}/>
      </Col>
    </Row>
  )
}

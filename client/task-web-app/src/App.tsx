import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { FilterBar } from './components/FilterBar';
import { TasksTable } from './components/TasksTable';
import { TaskForm } from './components/TaskForm';
import { useFetchTasks } from './hooks/HttpTasks';
import dayjs from 'dayjs';
import { TaskItem } from './entity/Task';
const {Header, Content, Footer} = Layout;

const App: React.FC = () => {
  const {
    token: {colorBgContainer},
  } = theme.useToken();
  const {data, loading, error, refetch} = useFetchTasks();
  const [taskId, setTaskId] = React.useState<null | number>(null);
  const [editTask, setEditTask] = React.useState<any>({});

  return (
    <Layout>
      <Header style={{position: 'sticky', top: 0, zIndex: 1, width: '100%', color: 'white'}}>
        Gene's Task Demo
      </Header>
      <Content className="site-layout" style={{padding: '0 50px'}}>
        <Breadcrumb style={{margin: '16px 0'}}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Tasks</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{padding: 24, minHeight: 380, background: colorBgContainer}}>
          <FilterBar
            handleAddTask={() => {setTaskId(-1)}}
            onSearch={(searchTask) => {
              refetch({params: searchTask})
            }}
          />
          {taskId == null && data?.tasks ?
            <TasksTable
              tasks={data.tasks}
              onEdit={(newId) => {
                const task = data.tasks.find((t:TaskItem) => t.id === newId);
                if (task) {
                  if (task.dueAt) {
                    task.dueAtDate = dayjs(task.dueAt.slice(0, 10), 'YYYY-MM-DD')
                  } else {
                    task.dueAtDate = undefined;
                  }
                  setEditTask(task)
                  setTaskId(newId)}}
                }
          /> : null}
          {taskId !== null ?
            <TaskForm taskId={taskId}
                      onCompleted={(refresh) => {
                        setTaskId(null)
                        setEditTask({})
                        if (refresh) {
                          refetch()
                        }
                      }}
                    initialValues={editTask}/> : null}
        </div>
      </Content>
      <Footer style={{textAlign: 'center'}}>Ant Design ©2023 Created by Ant UED</Footer>
    </Layout>
  );
};

export default App;

import React from 'react';
import { Button, Checkbox, DatePicker, Form, Input, Select, } from 'antd';
import { useModifyTasks } from '../hooks/HttpTasks';
import { TaskItem } from '../entity/Task';


export interface TaskFormOptions {
  taskId?: number;
  onCompleted: (refresh: boolean) => void;
  initialValues: Record<string, any>;
}
export const TaskForm = ({taskId, onCompleted, initialValues}: TaskFormOptions) => {
  console.log(taskId)
  const {executeUpdate, result} = useModifyTasks()
  const onFinish = async (values: any) => {
    const task: TaskItem = {
      id: taskId === -1 ? undefined : taskId,
      title: values.title,
      description: values.description,
      dueAt: values.dueAtDate.toISOString(),
      priority: values.priority,
      completedAt: values.completed ? new Date().toISOString() : undefined
    }
    if (task.id) {
      const result = await executeUpdate(task.id, task)
      console.log('Success:', values);
      onCompleted(true);
    }
  };

  return (
    <>
      <Form
        labelCol={{span: 4}}
        wrapperCol={{span: 14}}
        layout="horizontal"
        style={{maxWidth: 600}}
        onFinish={onFinish}
        initialValues={initialValues}
      >
        <Form.Item label="Completed" name="completed" valuePropName="completed">
          <Checkbox/>
        </Form.Item>
        <Form.Item
          label="Title"
          name="title"
          rules={[{required: true, message: 'Please input title!'}]}>
          <Input/>
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{required: true, message: 'Please input description!'}]}>
          <Input/>
        </Form.Item>
        <Form.Item label="Priority" name="priority">
          <Select
            defaultValue=""
            placeholder="Select Priority"
            style={{width: 120}}
            onChange={() => {
              console.log('Changed')
            }
            }
            options={[
              {value: 'high', label: 'High'},
              {value: 'medium', label: 'Medium'},
              {value: 'low', label: 'Low'}
            ]}
          />
        </Form.Item>
        <Form.Item label="Due On" name="dueAtDate">
          <DatePicker />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Save</Button>
          <Button onClick={() => onCompleted(false)}>Cancel</Button>
        </Form.Item>
      </Form>
    </>
  );
};


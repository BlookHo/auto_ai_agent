import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table, Modal, Form, Input, Select, message, Space, Popconfirm } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();

  // Fetch users from API
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/v1/users', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      message.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const showAddUserModal = () => {
    setEditingUser(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const showEditUserModal = (user) => {
    setEditingUser(user);
    form.setFieldsValue({
      email: user.email,
      role: user.role,
      // Don't pre-fill password field for security
    });
    setIsModalVisible(true);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const token = localStorage.getItem('token');
      
      // If editing, use PUT, otherwise POST
      const url = editingUser 
        ? `/api/v1/users/${editingUser.id}`
        : '/api/v1/users';
      
      const method = editingUser ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            email: values.email,
            password: values.password,
            password_confirmation: values.password_confirmation,
            role: values.role,
          },
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save user');
      }
      
      message.success(editingUser ? 'User updated successfully' : 'User created successfully');
      setIsModalVisible(false);
      fetchUsers();
    } catch (error) {
      console.error('Error saving user:', error);
      message.error(error.message || 'Failed to save user');
    }
  };

  const handleDelete = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/v1/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      
      message.success('User deleted successfully');
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      message.error('Failed to delete user');
    }
  };

  const columns = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (_, record) => (
        <span>
          <UserOutlined style={{ marginRight: 8 }} />
          {record.email}
        </span>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <span style={{ textTransform: 'capitalize' }}>{role}</span>
      ),
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="link" 
            icon={<EditOutlined />} 
            onClick={() => showEditUserModal(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this user?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
        <h2>User Management</h2>
        <Button type="primary" onClick={showAddUserModal}>
          Add New User
        </Button>
      </div>
      
      <Table 
        columns={columns} 
        dataSource={users} 
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
      
      <Modal
        title={editingUser ? 'Edit User' : 'Add New User'}
        visible={isModalVisible}
        onOk={handleSubmit}
        onCancel={() => setIsModalVisible(false)}
        confirmLoading={loading}
      >
        <Form
          form={form}
          layout="vertical"
          name="user_form"
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please input the email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Input 
              prefix={<MailOutlined />} 
              placeholder="Email" 
              disabled={!!editingUser}
            />
          </Form.Item>
          
          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: !editingUser, message: 'Please input the password!' },
              { min: 6, message: 'Password must be at least 6 characters!' },
            ]}
          >
            <Input.Password 
              prefix={<LockOutlined />} 
              placeholder="Password" 
            />
          </Form.Item>
          
          <Form.Item
            name="password_confirmation"
            label="Confirm Password"
            dependencies={['password']}
            rules={[
              { required: !editingUser, message: 'Please confirm the password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords do not match!'));
                },
              }),
            ]}
          >
            <Input.Password 
              prefix={<LockOutlined />} 
              placeholder="Confirm Password" 
            />
          </Form.Item>
          
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: 'Please select a role!' }]}
          >
            <Select placeholder="Select a role">
              <Option value="admin">Admin</Option>
              <Option value="expert">Expert</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Users;

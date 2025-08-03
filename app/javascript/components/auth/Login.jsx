import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Button, Form, Input, Typography, Card, message, Divider, Space } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Save the token and user data
      localStorage.setItem('token', data.token);
      
      // Show success message
      message.success('Login successful!');
      
      // Redirect to home page
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      message.error(error.message || 'Login failed. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f0f2f5',
      padding: '20px'
    }}>
      <Card 
        style={{ 
          width: '100%',
          maxWidth: 420,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
        }}
        bodyStyle={{ padding: '32px' }}
      >
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Title level={3} style={{ marginBottom: 8 }}>Welcome Back</Title>
          <Text type="secondary">Sign in to your account to continue</Text>
        </div>
        
        <Form
          name="login"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="email"
            rules={[
              { 
                required: true, 
                message: 'Please input your email!' 
              },
              { 
                type: 'email', 
                message: 'Please enter a valid email address!' 
              }
            ]}
          >
            <Input 
              prefix={<MailOutlined />} 
              placeholder="Email" 
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { 
                required: true, 
                message: 'Please input your password!' 
              },
              { 
                min: 6, 
                message: 'Password must be at least 6 characters long!' 
              }
            ]}
          >
            <Input.Password 
              prefix={<LockOutlined />} 
              placeholder="Password" 
              size="large"
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 16 }}>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              block
              size="large"
            >
              Sign In
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <Text type="secondary">
              Don't have an account?{' '}
              <RouterLink to="/register" style={{ fontWeight: 500 }}>
                Sign up
              </RouterLink>
            </Text>
          </div>
        </Form>
        
        <Divider style={{ margin: '24px 0' }}>OR</Divider>
        
        <Space direction="vertical" style={{ width: '100%' }}>
          <Button 
            type="default" 
            block 
            size="large"
            onClick={() => {
              // Demo login functionality
              onFinish({
                email: 'admin@example.com',
                password: 'password123'
              });
            }}
          >
            Use Demo Account
          </Button>
        </Space>
      </Card>
    </div>
  );
};

export default Login;

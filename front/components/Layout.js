import React from 'react';
import Link from 'next/link';
import { Menu, Icon } from 'antd';

const Layout = ({ children }) => {
  return (
    <div>
      <Menu mode='horizontal' selectedKeys={['trade']}>
        <Menu.Item key='home'>
          <Link href='/'>
            <a>
              <Icon
                type='sync'
                spin
                style={{ fontSize: '20px', verticalAlign: 'middle' }}
              />
              <h1
                style={{
                  margin: 0,
                  fontWeight: 400,
                  display: 'inline-block',
                  verticalAlign: 'middle',
                }}
              >
                icon-delta
              </h1>
            </a>
          </Link>
        </Menu.Item>
        <Menu.Item key='trade'>
          <Link href='/'>
            <a>Trade</a>
          </Link>
        </Menu.Item>
        <Menu.Item key='howto' style={{ float: 'right', marginRight: '10px' }}>
          <a
            href='https://www.notion.so/How-to-Guide-5bc85e598dba4cb599b365d0b95f82d4'
            target='_blank'
          >
            <Icon type='question-circle' style={{ marginRight: '5px' }} />
            How can i use?
          </a>
        </Menu.Item>
      </Menu>
      {children}
    </div>
  );
};

export default Layout;

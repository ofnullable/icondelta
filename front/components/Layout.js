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
          <Link href=''>
            <a>trade</a>
          </Link>
        </Menu.Item>
        <Menu.Item key='someother'>
          <Link href=''>
            <a>some other</a>
          </Link>
        </Menu.Item>
      </Menu>
      {children}
    </div>
  );
};

export default Layout;

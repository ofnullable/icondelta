import React from 'react';

import { header_item } from './style.scss';

const Header = () => (
  <header>
    <ul>
      <li>
        <div className={header_item}>
          <i className='material-icons'>autorenew</i>
          <h1>
            ICONDELTA
            {/*<small style={{ fontSize: '55%', color: '#ff901a' }}> Beta</small>*/}
          </h1>
        </div>
      </li>
      <li>
        <a
          className={header_item}
          href='https://www.notion.so/How-to-Guide-5bc85e598dba4cb599b365d0b95f82d4'
          target='_blank'
        >
          <i className='material-icons'>help_outline</i>
          How can i use?
        </a>
      </li>
    </ul>
  </header>
);

export default Header;

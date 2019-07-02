import React from 'react';
import Link from 'next/link';

import './Header.scss';

const Header = () => (
  <nav>
    <ul>
      <li>
        <Link href='/'>
          <a>
            <h1>ICONDELTA</h1>
          </a>
        </Link>
      </li>
      <ul>
        <li>
          <a
            href='https://www.notion.so/How-to-Guide-5bc85e598dba4cb599b365d0b95f82d4'
            target='_blank'
          >
            How can i use?
          </a>
        </li>
      </ul>
    </ul>
  </nav>
);

export default Header;

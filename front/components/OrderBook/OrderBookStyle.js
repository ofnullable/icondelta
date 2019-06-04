import styled from 'styled-components';
import { List } from 'antd';

export const ListItem = styled(List.Item)`
  text-align: center;
  margin-bottom: 0 !important;
  & .ant-card {
    border: none;
    & .ant-card-body {
      color: ${props.color};
    }
  }
`;

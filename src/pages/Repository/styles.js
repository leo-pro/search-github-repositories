import styled from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    background: transparent;
    color: #24292e;
    text-decoration: none;
    border-radius: 5px;
    border: 2px solid #24292e;
    padding: 5px;
  }
  a:hover {
    background: #24292e;
    color: #fff;
    transition: 0.2s background;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssueList = styled.ul`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  #issues-error {
    background: #eee;
    color: #333;
    padding: 10px;
  }
  #issues-error p {
    text-align: center;
  }

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;
  }

  & + li {
    margin-top: 10px;
  }

  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 2px solid #eee;
  }

  div {
    flex: 1;
    margin-left: 15px;

    strong {
      font-size: 16px;
      a {
        text-decoration: none;
        color: #333;
        &:hover {
          color: #24292e;
        }
      }
      span {
        background: #eee;
        color: #333;
        border-radius: 2px;
        font-size: 12px;
        font-weight: 600;
        height: 20px;
        padding: 3px 4px;
        margin-left: 10px;
      }
    }
    p {
      margin-top: 5px;
      font-size: 12px;
      color: #999;
    }
  }
`;

export const PrevList = styled.button.attrs({
  type: 'button',
})`
  background: transparent;
  color: #24292e;
  text-decoration: none;
  border-radius: 5px;
  border: 2px solid #24292e;
  padding: 5px;

  &:hover {
    background: #24292e;
    color: #fff;
    transition: 0.2s background;
  }
`;

export const NextList = styled.button.attrs({
  type: 'button',
})`
  background: transparent;
  color: #24292e;
  text-decoration: none;
  border-radius: 5px;
  border: 2px solid #24292e;
  padding: 10px;

  &:hover {
    background: #24292e;
    color: #fff;
    transition: 0.2s background;
  }
`;

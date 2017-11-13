import React from 'react';
import styled from 'styled-components';
import FiniteMachine from './FiniteMachine';
// import Match from './Match';
// import Switch from './Switch';

const chart = {
  parallel: true,
  states: {
    sidebar: {
      initial: 'hide',
      states: {
        hide: { on: { TOGGLE_SIDEBAR: 'show' } },
        show: { on: { TOGGLE_SIDEBAR: 'hide' } }
      }
    },
    page: {
      initial: 'page1',
      states: {
        page1: { on: { NEXT_PAGE: 'page2' } },
        page2: { on: {
          PREV_PAGE: 'page1',
          NEXT_PAGE: 'page3'
        } },
        page3: { on: {
          PREV_PAGE: 'page2',
          NEXT_PAGE: 'page1'
        } }
      }
    }
  }
}

// const reducer = (state = defaultState, action) => {
//   const { type, data } = action;

//   if (type === 'page1.NEXT') {
//     return { ...state, drawer: data }
//   }

//   return state;
// }

const Wrapper = styled.div`
  & span {
    color: tomato;
  }
`;

const Nav = styled.nav`
  display: ${props => props.show === 'show' ? 'block' : 'none'};

  & ul {
    list-style: none;
    margin: 0;
    padding: 0;

    & li {
      margin: 0;
      padding: 2px 5px;
    }
  }

`;

class StateMachine extends React.Component {
  render() {
    return (
      <FiniteMachine
        log={true}
        chart={chart}
        // reducer={reducer}
        render={machine => (
          <Wrapper>
            <span>The current state is: {JSON.stringify(machine.state)}</span><br />
            <span>Current data state is: {JSON.stringify(machine.data)}</span><br />
            <button onClick={() => machine.transition('TOGGLE_SIDEBAR')}>Show menu</button>
            <Nav show={machine.state.sidebar}>
              <ul>
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
              </ul>
            </Nav>
            {
              machine.state.page === 'page1' && (
                <div>
                  <h1>Page 1</h1>
                  <button onClick={() => machine.transition('NEXT_PAGE')}>Next page</button>
                </div>
              )
            }
            {
              machine.state.page === 'page2' && (
                <div>
                  <h1>Page 2</h1>
                  <button onClick={() => machine.transition('PREV_PAGE')}>Prev page</button>
                  <button onClick={() => machine.transition('NEXT_PAGE')}>Next page</button>
                </div>
              )
            }
            {
              machine.state.page === 'page3' && (
                <div>
                  <h1>Page 3</h1>
                  <button onClick={() => machine.transition('PREV_PAGE')}>Prev page</button>
                  <button onClick={() => machine.transition('NEXT_PAGE')}>Next page</button>
                </div>
              )
            }
          </Wrapper>
        )}
      />
    );
  }
}

export default StateMachine;

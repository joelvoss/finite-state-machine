import React from 'react';
import { Machine } from 'xstate';
import PropTypes from 'prop-types';

class FiniteMachine extends React.Component {
  static propTypes = {
    log: PropTypes.bool,
    chart: PropTypes.object.isRequired,
    reducer: PropTypes.func
  };
  static defaultProps = {
    log: false,
    reducer: null
  };

  // define our finite machine (see xstate lib)
  machine = Machine(this.props.chart);

  state = {
    data: this.props.reducer ? this.props.reducer(undefined, { type: '@init' }) : undefined,
    machineState: this.machine.getInitialState()
  };

  /**
   * Transition from one state to another.
   * @param {String} actionType - The action type to transition to.
   * @param {Object} newData - Data to pass along with the transition.
   */
  transition = (actionType, newData) => {
    const { log, chart, reducer } = this.props;
    const { data, machineState } = this.state;

    const nextState = this.machine
      .transition(machineState, actionType)
      .value;

    const action = {
      data: newData,
      nextState,
      type: actionType
    };

    if (log) {
      console.log(`Dispatch action → ${action.type} with data: `, action.data);
    }

    this.setState({
      data: reducer ? reducer(data, action) : undefined,
      machineState: nextState
    }, log ? () => {
      console.log(`Setting new state with data:`, this.state.machineState, this.state.data);
    } : undefined );
  };

  render() {
    return this.props.render({
      state: this.state.machineState,
      data: this.state.data,
      transition: this.transition
    });
  }
}

export default FiniteMachine;

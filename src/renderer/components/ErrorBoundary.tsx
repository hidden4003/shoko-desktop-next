import React, {ErrorInfo} from 'react';
import PropTypes from 'prop-types';

type State = {
  hasError: boolean
  error: Error | string
  info: ErrorInfo | null
}

export default class ErrorBoundary extends React.Component<{},State> {
  static propTypes = {
    children: PropTypes.object.isRequired
  };

  constructor(props: Readonly<{}>) {
    super(props);
    this.state = { hasError: false, info: null, error: '' };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Display fallback UI
    this.setState({ hasError: true, error, info });
  }

  render() {
    if (this.state.hasError) {
      const { error, info } = this.state;
      return (
        <div style={{ marginLeft: '1rem', textAlign: 'center' }}>
          <h2>We have run into a problem:</h2>
          <h3>Error: {error.toString()}</h3>
          {info && info.componentStack ? (
            <h3>
              Trace:<pre>{info.componentStack.toString()}</pre>
            </h3>
          ) : null}
        </div>
      );
    }
    return this.props.children;
  }
}

import React, { Component, ChangeEvent, KeyboardEvent } from 'react';

interface Props {
  name: string
  placeholder: string
  value: string
  error?: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  onKeyPress: (event: KeyboardEvent<HTMLInputElement>) => void
}

export default class Input extends Component<Props> {
  render() {
    let wrapperClass = 'form-group';
    if (this.props.error && this.props.error.length > 0) {
      wrapperClass += ' ' + 'has-error';
    }

    return (
      <div className={wrapperClass}>
        <div className='field'>
          <input type='text'
            name={this.props.name}
            className='form-control'
            placeholder={this.props.placeholder}
            value={this.props.value}
            onChange={this.props.onChange}
            onKeyPress={this.props.onKeyPress}
          />
          <div className='input'>{this.props.error}</div>
        </div>
      </div>
    )
  }
}

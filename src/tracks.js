import React, { Component } from 'react'

export default class Tracks extends Component {
  render() {
    return (
      <li>
        {this.props.tracks}
      </li>
    )
  }
}

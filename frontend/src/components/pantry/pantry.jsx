import React, { Component } from 'react'

export default class Pantry extends Component {
  

  render() {
    return (
      <div>
        Check the logs
        {console.log(this.props.pantries)}
      </div>
    )
  }
}

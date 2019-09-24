class Clock extends React.Component{

  constructor(props)
  {
    super(props)
    this.state = 
    {
      currentTime: (new Date()).toLocaleString()
    }
  }

  render()
  {
    React.createElement('div', null, ""+this.state.currentTime)
  }
}
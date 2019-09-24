class DateAndTime extends React.Component
{
    render(){
        let timea = new Date().toLocaleString()

        return React.createElement('span', null, 'Current date and time is ${timea}')
    }

}

ReactDOM.render(
    React.createElement(DateAndTime, null),
    document.getElementById('content')
)
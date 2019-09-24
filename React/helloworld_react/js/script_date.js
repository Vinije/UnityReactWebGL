
class DateAndTime extends React.Component
{
    render(){
        let timea = new Date().toLocaleString()

        return React.createElement('span', null, 'Current date and time is ' + timea)
    }
}

class Content extends React.Component{

    GetUrl(){
        return "http://www.stackoverflow.com"
    }

    render(){
        
        return React.createElement('div', null, 
        React.createElement('p', null, "Pro více info klikni zde: "),
        React.createElement('a', {href: this.GetUrl()}, "StackOverFlow"))
    }
}
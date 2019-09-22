class HelloWorld extends React.Component
{
    render(){
        return React.createElement('h1', 
        this.props, 
        "Hello " + this.props.frameworkName + " world!!!")
    }
}

class DateAndTime extends React.Component
{
    render(){
        let timea = new Date().toLocaleString()

        return React.createElement('span', null, 'Current date and time is ' + timea)
    }
}

ReactDOM.render(React.createElement('div', null, 
    React.createElement(HelloWorld, {
        id: 'ember',
        frameworkName: 'Ember.js',
        title: 'Framework for creation of ambitious web applications'
    }),
    React.createElement(HelloWorld, {
        id: 'backbone',
        frameworkName:'Backbone.js',
        title: 'Backbone framework'
    }),
    React.createElement(DateAndTime, null)), 
    document.getElementById('content'))

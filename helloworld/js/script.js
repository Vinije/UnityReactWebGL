class HelloWorld extends React.Component
{
    render(){
        return React.createElement('h1', 
        this.props, 
        "Hello " + this.props.frameworkName + " world!!!")
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
    React.createElement(DateAndTime, null), 
    React.createElement(Content, null)),
    document.getElementById('content'))

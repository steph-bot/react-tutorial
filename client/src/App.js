import React, { Component } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";

class Form extends React.Component {
    state = { companyName: 'Microsoft' };

    handleSubmit = async (event) => {
        event.preventDefault();
        const resp = await axios.get(`https://api.github.com/users/${this.state.companyName}`);
        this.props.onSubmit(resp.data);
        this.setState({ companyName: '' });
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <span className="formtext">Stephanie</span>
                <input
                    type="text"
                    value={this.state.companyName}
                    onChange={event => this.setState({ companyName: event.target.value })}
                    placeholder="Enter Company Name"
                    required
                />
                <button>Go!</button>
            </form>
        );
    }
}
class App extends Component {
    constructor(props) {
        super(props);
        this.state = { apiResponse: "" };
    }

    callAPI() {
        fetch("http://localhost:9000/testAPI")
            .then(res => res.text())
            .then(res => this.setState({ apiResponse: res }))
            .catch(err => err);
    }

    componentDidMount() {
        this.callAPI();
    }

    doSomething = (companyinfo) => {
        console.log(companyinfo);
    };

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <Form onSubmit={this.doSomething} />
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">{this.state.apiResponse}</p>
            </div>
        );
    }
}

export default App;

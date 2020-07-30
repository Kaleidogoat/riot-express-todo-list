import React, { Component } from "react";
import axios from "axios";



export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            username: "",
            password: ""
        };
        this.handleChange = this.handleChange.bind(this);

    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    addUser = (event) => {
        event.preventDefault();
        console.log(this.state.firstName)
        let url = "http://localhost:3001/users/signup";
        axios.post(url, {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            username: this.state.username,
            password: this.state.password
        }).then(response => {
            // refresh the data
            console.log(response);
            // empty the input
            // this.users.current.value = "";
        });
    };
    render() {
        return (
            <form onSubmit={this.addUser}>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" value={this.state.firstName} onChange={this.handleChange} name="firstName" className="form-control" placeholder="First name" />
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" value={this.state.lastName} onChange={this.handleChange} name="lastName" className="form-control" placeholder="Last name" />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" name="email" value={this.state.email} onChange={this.handleChange} className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Username</label>
                    <input type="text" name="username" value={this.state.username} onChange={this.handleChange} className="form-control" placeholder="Enter username" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" value={this.state.password} onChange={this.handleChange} className="form-control" placeholder="Enter password" />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered? <a href="/sign-in">sign in</a>
                </p>
            </form>
        );
    }
}
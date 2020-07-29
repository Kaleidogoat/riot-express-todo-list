import React, { Component } from "react";
import axios from "axios";



export default class SignUp extends Component {

    addUser = () => {
        let url = "http://localhost:3001/users/signup";
        axios.post(url, {
            firstName: this.firstName.current.value,
            lastName: this.lastName.current.value,
            email: this.email.current.value,
            username: this.username.current.value,
            password: this.password.current.value
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
                    <input type="text" name="firstName" className="form-control" placeholder="First name" />
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" name="lastName" className="form-control" placeholder="Last name" />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" name="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Username</label>
                    <input type="text" name="username" className="form-control" placeholder="Enter username" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" className="form-control" placeholder="Enter password" />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered? <a href="/sign-in">sign in</a>
                </p>
            </form>
        );
    }
}
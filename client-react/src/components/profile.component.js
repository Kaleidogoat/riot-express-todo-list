import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default class Profile extends Component {
    constructor(props) {

        super(props);
        this.state = {
            UserId: this.props.userid,
            FirstName: "",
            LastName: "",
            username: "",
            email: ""
        };
        
        this.handleChange = this.handleChange.bind(this);
    }

  1
    //     axios.get('/user?ID=12345')
    //   .then(function(response) {
    //         console.log(response);
    //     })
    //   .catch(function(error) {
    //         console.log(error);
    //     });

    getUser = () => {
        console.log(this.props.userid)
        //event.preventDefault();
        // console.log(UserId)
        // let UserId = this.state.UserId;
        let url = "http://localhost:3001/users/" + this.props.userid
        axios.get(url, {


        }).then(response => {
            //alert(response.data.FirstName);
            this.setState({
                events: response.data,
                UserId: this.props.userid,
                FirstName: response.data.FirstName,
                LastName: response.data.LastName,
                username: response.data.username,
                email: response.data.email
            })
            console.log(response.data);
            // empty the input
            // this.users.current.value = "";
        });
    }

    componentWillMount(){
        this.getUser();
    }

        render(){
            return(
                <h1>{this.state.userid}</h1>
            )
        }
    }
        <form onSubmit={this.getUser}>


            <div className="form-group">
                <label >User Id:</label>
                <label value={this.state.UserId}></label>
            </div>
            <div className="form-group">
                <label >Name:</label>
                <label value={this.state.FirstName + " " + this.state.LastName}>{this.state.FirstName + " " + this.state.LastName}</label>
            </div>
            <div className="form-group">
                <label >Email Address:</label>
                <label value={this.state.email}></label>
            </div>
            </form>
import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Profile from "./profile.component";

export default class Home extends Component {
    constructor(props) {

        super(props);
        this.state = {
            UserId: "",
            FirstName: "",
            LastName: "",
            apiUrl: ""
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    //     axios.get('/user?ID=12345')
    //   .then(function(response) {
    //         console.log(response);
    //     })
    //   .catch(function(error) {
    //         console.log(error);
    //     });

    getUser = (event) => {

        event.preventDefault();
        // console.log(UserId)
        // let UserId = this.state.UserId;
        let url = "http://localhost:3001/users/" + this.state.UserId
        axios.get(url, {


        }).then(response => {
            //alert(response.data.FirstName);
            this.setState({
                events: response.data,
                UserId: response.data.UserId,
                FirstName: response.data.FirstName,
                LastName: response.data.LastName
            })
            console.log(response.data);
            // empty the input
            // this.users.current.value = "";
        });

    };
    punchTimein = () => {
        let url = "http://localhost:3001/time/punch";
        axios.post(url, {
            UserId: this.state.UserId
        }).then(response => {
            alert(response.data);
            console.log(response);
            // empty the input
            // this.users.current.value = "";
        });

    };

    handleIdInput(event) {
        this.setState({
            UserId: event.target.value,
            FirstName: "",
            LastName: ""
        });
        console.log(this.state.UserId + this.state.apiUrl)
    }
    handleChangeId = ({ target }) => {
        this.setState({ [target.name]: target.value });
    };
    render() {
        return (
            <React.Fragment>
            <div>
            <form onSubmit={this.getUser}>


                <div className="form-group">
                    <label>User Id</label>
                    <input type="text" onChange={this.handleChangeId} name="UserId" value={this.state.UserId} ></input>
                    {/* <label value={this.state.UserId} onChange={this.handleChange} name="UserId" placeholder="UserId"> </label> */}

                </div>
                <button onClick={this.punchTimein} id="time_button">Punch In</button>
                <table>
                    <tbody>
                        <tr>
                            <th>Last time punch</th>
                        </tr>
                        <tr>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
                <div className="form-group">
                    <label >Name:</label>
                    <label value={this.state.FirstName + " " + this.state.LastName}>{this.state.FirstName + " " + this.state.LastName}</label>
                </div>

                <div className="form-group">
                    <label>Hours:</label>
                </div>
                
                
            </form>
            </div>
           
                <Profile userid={this.state.UserId}/>
            </React.Fragment>
        )
    }
};
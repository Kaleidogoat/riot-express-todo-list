import React, { Component } from "react";
import axios from "axios";

export default class Home extends Component {

    constructor(props) {
        let id = prompt("Enter UserId to Continue");
        super(props);
        this.state = {
            UserId: id,
            FirstName: "",
            LastName: "",
            apiUrl: "http://localhost:3001/users/" + id
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
        let url = "http://localhost:3001/users/";
        axios.get(this.state.apiUrl, {


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
    // punchTime = () => {
    //     event.preventDefault();
    //     let url = "http://localhost:3001/time/punch";
    //     axios.post(url, {
    //         firstName: this.state.firstName,
    //         lastName: this.state.lastName,
    //         email: this.state.email,
    //         username: this.state.username,
    //         password: this.state.password
    //     }).then(response => {
    //         alert(response.data);
    //         console.log(response);
    //         // empty the input
    //         // this.users.current.value = "";
    //     });
    //     this.setState({
    //         firstName: "",
    //         lastName: "",
    //         email: "",
    //         username: "",
    //         password: ""
    //     });
    // };


    render() {
        return (
            <form onSubmit={this.getUser}>
                <h3>Hours this week</h3>

                <div className="form-group">
                    <label>User Id</label>
                    {/* <label value={this.state.UserId} onChange={this.handleChange} name="UserId" placeholder="UserId"> </label> */}
                    <p value={this.state.UserId}>     {this.state.UserId}</p>
                </div>
                <button id="time_button">Punch Time Clock</button>
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
                <button type="submit">Go</button>
            </form>
        )
    }
}
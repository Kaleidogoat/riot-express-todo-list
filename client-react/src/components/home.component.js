import React, { Component } from "react";

export default class Home extends Component {
    render(){
        return (
            <form>
                <h3>Hours this week</h3>

                <div className="form-group">
                    <label>Name:</label>

                </div>
                <div className="form-group">
                    <label>Job:</label>
                </div>
                <div className="form-group">
                    <label>Hours:</label>
                </div>

            </form>
        )
    }
}
import React, { Component } from 'react'
import {
    Redirect
} from "react-router-dom";
class Register extends Component {
    constructor() {
        super()
        this.state = {
            redirect: false
        }
    }

    register() {
        if (this.state.password == this.state.c_password) {
            fetch("https://simfoni-supplier.herokuapp.com/api/suppliers/register/", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(this.state)
            }).then((result) => {
                if (result.status == 201) {
                    result.json().then((resp) => {
                    })
                    this.setState({ redirect: true });
                }
                else if (result.status == 400) {
                    alert("Validation Failed, Please put email and Password in correct manner")
                }
                else {
                    alert("Something went wrong")
                }
            }).catch(err => {
                console.log('Errors: ', err)
            })
        }
        else {
            alert("Confirm Password are not matching with Password")
        }
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/auth" />;
        }
        return (
            <div className="header">
                <h2>Welcome to Simfoni Supplier Dashboard</h2>
                <div className="auth-inner">
                    <div>
                        <input type="text" placeholder="Business Name" onChange={(e) => { this.setState({ business_name: e.target.value }) }} /> <br /><br />
                        <input type="text" placeholder="Address" onChange={(e) => { this.setState({ address: e.target.value }) }} /> <br /><br />
                        <input type="text" placeholder="Full Name" onChange={(e) => { this.setState({ primary_full_name: e.target.value }) }} /> <br /><br />
                        <input type="text" placeholder="Email" onChange={(e) => { this.setState({ primary_email: e.target.value }) }} /> <br /><br />
                        <input type="text" placeholder="Password" onChange={(e) => { this.setState({ password: e.target.value }) }} /> <br /><br />
                        <small><i>*Should contain one Capital and one lowercase letter, one digit,<br /> one special character
and minimum of 8 characters.</i></small> <br />
                        <input type="text" placeholder="Confirm Password" onChange={(e) => { this.setState({ c_password: e.target.value }) }} /> <br /><br />
                        <button onClick={() => this.register()}>Register</button> <br />
                        <small>Already have an account? <a href="/"> Login</a></small>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register
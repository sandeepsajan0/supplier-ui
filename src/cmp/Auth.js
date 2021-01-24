import React, { Component } from 'react'
import {
    Redirect
} from "react-router-dom";
import '../App.css';

class Auth extends Component {
    constructor() {
        super()
        this.state = {
            is_admin: false,
            redirect: false,
        }
    }

    login() {
        fetch("https://simfoni-supplier.herokuapp.com/api/suppliers/login/", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state)
        }).then((result) => {
            if (result.status == 200) {
                result.json().then((resp) => {
                    localStorage.setItem("access", JSON.stringify(resp.access))
                    localStorage.setItem("id", JSON.stringify(resp.account_id))
                    localStorage.setItem("refresh", JSON.stringify(resp.refresh))
                    localStorage.setItem("is_admin", resp.is_admin)
                    this.setState({ redirect: true, is_admin: resp.is_admin })
                })
            }
            else if (result.status == 404) {
                alert("No user Found, Please double check the credentials")
            }
            else {
                alert("Something went wrong")
            }
        })
    }

    render() {
        if (this.state.redirect && this.state.is_admin) {
            return < Redirect to='/admin' />;
        }
        else if (this.state.redirect) {
            return < Redirect to='/profile' />;
        }
        return (
            <div className="header">
                <h2>Welcome to Simfoni Supplier Dashboard</h2>
                < div className="auth-inner">
                    <div className="form-group">
                        <br />
                        <input type="text" placeholder="Email" onChange={(e) => { this.setState({ username: e.target.value }) }} /> <br /><br />
                    </div>

                    <div className="form-group">
                        <br />
                        <input type="password" className="form-control" placeholder="Enter password" onChange={(e) => { this.setState({ password: e.target.value }) }} />
                    </div>
                    <br />
                    <button type="submit" onClick={() => { this.login() }}>Login</button>
                    <br />
                    <small>Create an account? <a href="/register"> Register</a></small>
                </div >
            </div>
        )
    }
}

export default Auth
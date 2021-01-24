import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import '../App.css';

class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            refresh: localStorage.getItem("refresh"),
            response: null,
            editing: false,
            auth_redirect: false,
            product_supplier: null,
            logout: false,
        }

    }
    componentDidMount() {
        this.profile()
    }
    refresh() {
        fetch("https://simfoni-supplier.herokuapp.com/api/suppliers/token/refresh/", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ "refresh": JSON.parse(localStorage.getItem("refresh")) })
        }).then((result) => {
            if (result.status == 200) {
                result.json().then((resp) => {
                    localStorage.setItem("access", JSON.stringify(resp.access))

                })
                {
                    !this.editing ? (
                        this.profile()
                    ) : (
                            this.profileEdit()
                        )
                }

            }
            else if (result.status == 401) {
                this.setState({ auth_redirect: true })
            }
            else {
                alert("Something went wrong")
            }
        }).catch(err => {
            console.log('Errors: ', err)
        })
    }

    profile() {
        var url = "https://simfoni-supplier.herokuapp.com/api/suppliers/" + localStorage.getItem("id") + "/"
        var token = "Bearer " + JSON.parse(localStorage.getItem("access"))
        fetch(url, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": token
            },
        }).then((result) => {
            if (result.status == 200) {
                result.json().then((resp) => {
                    this.setState({ response: resp, product_supplier: resp.product_supplier })
                })
            }
            else if (result.status == 401) {
                this.refresh()
            }
            else {
                alert("Something went wrong")
            }
        }).catch(err => {
            console.log('Errors: ', err)
        })
    }

    profileEdit() {
        var url = "https://simfoni-supplier.herokuapp.com/api/suppliers/update/" + localStorage.getItem("id") + "/"
        var token = "Bearer " + JSON.parse(localStorage.getItem("access"))
        fetch(url, {
            method: "PATCH",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify(this.state)
        }).then((result) => {
            if (result.status == 200) {
                result.json().then((resp) => {
                    this.setState({ response: resp })
                })
                this.setState({ editing: false })
            }
            else if (result.status == 401) {
                this.refresh()
            }
            else if (result.status == 400) {
                alert("Something wrong with the given values")
            }
            else {
                alert("Something went wrong")
            }
        }).catch(err => {
            console.log('Errors: ', err)
        })
    }

    render() {
        if (this.state.auth_redirect) {
            return <Redirect to="/" />
        }
        if (this.state.logout) {
            return <Redirect to="/logout" />
        }

        return (
            <div className="header">
                <h2>Welcome to the Simfoni Dashboard</h2>
                <div className="auth-inner" >
                    {!this.state.response ? (
                        < div > Loading ....</div>
                    ) : (this.state.editing ? (
                        <div>
                            <h2> Hello {this.state.response.primary_email}</h2>
                            <h2>Edit Profile</h2>
                            <p><b>Email: </b>{this.state.response.primary_email}</p>
                            <p><b>Businesss Name:</b> <input type="text" defaultValue={this.state.response.business_name} onChange={(e) => { this.setState({ business_name: e.target.value }) }} /></p>
                            <p><b>Full Name: </b><input type="text" defaultValue={this.state.response.primary_full_name} onChange={(e) => { this.setState({ primary_full_name: e.target.value }) }} /></p>
                            <p><b>Address: </b><input type="text" defaultValue={this.state.response.address} onChange={(e) => { this.setState({ address: e.target.value }) }} /></p>
                            <p><b>Phone: </b><input type="text" defaultValue={this.state.response.primary_phone} onChange={(e) => { this.setState({ primary_phone: e.target.value }) }} /></p>
                            <p><b>Secondary Name: </b><input type="text" defaultValue={this.state.response.secondary_full_name} onChange={(e) => { this.setState({ secondary_full_name: e.target.value }) }} /></p>
                            <p><b>Secondary Email: </b><input type="text" defaultValue={this.state.response.secondary_email} onChange={(e) => { this.setState({ secondary_email: e.target.value }) }} /></p>
                            <p><b>Secondary Phone: </b><input type="text" defaultValue={this.state.response.secondary_phone} onChange={(e) => { this.setState({ secondary_phone: e.target.value }) }} /></p>
                            <p><b>Related Entities: </b><input type="text" defaultValue={this.state.response.related_entities} onChange={(e) => { this.setState({ related_entities: e.target.value }) }} /></p>
                            <button onClick={() => { this.profileEdit() }}> Save</button>

                        </div>) :
                        (<div>
                            <h2> Hello {this.state.response.primary_email}</h2>
                            <h2>Profile</h2>
                            <p><b>Businesss Name: </b>{this.state.response.business_name}</p>
                            <p><b>Full Name: </b>{this.state.response.primary_full_name}</p>
                            <p><b>Address: </b>{this.state.response.address}</p>
                            <p><b>Email: </b>{this.state.response.primary_email}</p>
                            <p><b>Phone: </b>{this.state.response.primary_phone}</p>
                            <p><b>Secondary Name: </b>{this.state.response.secondary_full_name}</p>
                            <p><b>Secondary Email: </b>{this.state.response.secondary_email}</p>
                            <p><b>Secondary Phone: </b>{this.state.response.secondary_phone}</p>
                            <p><b>Related Entities: </b>[{this.state.response.related_entities}]</p>
                            <p><b>Products: </b> {this.state.product_supplier.map(item => (
                                <p>{item.name}</p>
                            ))}</p>
                            <button onClick={() => this.setState({ editing: true })}> Edit Profile</button>
                        </div>))
                    }
                </div >
                <br />
                <div style={{ paddingLeft: "50%" }}>  <button onClick={() => { this.setState({ logout: true }) }}>Logout</button></div>
            </div>
        )
    }
}

export default Profile
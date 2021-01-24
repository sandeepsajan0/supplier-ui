import React, { Component, PureComponent } from 'react'
import { Redirect } from 'react-router-dom';
import '../App.css';

class ProfileEdit extends Component {
    constructor(props) {
        super(props)

        this.state = {
            refresh: localStorage.getItem("refresh"),
            response: null,
            access: this.props.access,
            auth_redirect: false
        }

    }
    // componentDidMount() {
    //     const { response } = this.props.location.state
    // }
    refresh() {
        fetch("https://simfoni-supplier.herokuapp.com/api/suppliers/token/refresh/", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state)
        }).then((result) => {
            if (result.status == 200) {
                result.json().then((resp) => {
                    console.log("refresh", resp)
                    localStorage.setItem("access", JSON.stringify(resp.access))

                })
                this.profile()
            }
            else if (result.status == 401) {
                this.setState({ auth_redirect: false })
            }
        })
    }

    profile() {
        var url = "https://simfoni-supplier.herokuapp.com/api/suppliers/" + localStorage.getItem("id") + "/"
        var token = "Bearer " + JSON.parse(localStorage.getItem("access"))
        console.log("token", token)
        fetch(url, {
            method: "PATCH",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": token
            },
        }).then((result) => {
            if (result.status == 200) {
                result.json().then((resp) => {
                    console.log(resp)
                    this.setState({ response: resp })
                    console.log("resp", this.state.response)
                })
            }
            if (result.status == 401) {
                this.refresh()
            }
        })
    }

    render() {

        console.log("edit", this.props, this.state)
        return (

            <div className="" >
                {!this.state.response ? (
                    < div > Loading ....</div>
                ) : (
                        <div>
                            <h2>Profile</h2>
                            <input type="text" placeholder="Email" onChange={(e) => { this.setState({ business_name: e.target.value }) }} /> <br /><br />
                            <p><b>Businesss Name: </b>{this.state.response.business_name}</p>
                            <p><b>Full Name: </b>{this.state.response.primary_full_name}</p>
                            <p><b>Address: </b>{this.state.response.address}</p>
                            <p><b>Email: </b>{this.state.response.primary_email}</p>
                            <p><b>Phone: </b>{this.state.response.primary_phone}</p>
                            <p><b>Secondary Name: </b>{this.state.response.secondary_full_name}</p>
                            <p><b>Secondary Email: </b>{this.state.response.secondary_email}</p>
                            <p><b>Secondary Phone: </b>{this.state.response.secondary_phone}</p>
                            <p><b>Related Entities: </b>[{this.state.response.related_entities}]</p>
                            <button onClick={() => <Redirect to="/profile" />}>Save</button>

                        </div>)
                }
            </div >
        )
    }
}

export default ProfileEdit
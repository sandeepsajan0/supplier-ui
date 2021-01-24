import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Logout extends Component {
    constructor(props) {
        super(props)

        this.state = {
            logged_out: false
        }
    }
    componentDidMount() {
        this.Logout()
    }

    Logout() {
        fetch("https://simfoni-supplier.herokuapp.com/api/suppliers/logout/", {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ "refresh": JSON.parse(localStorage.getItem("refresh")) })
        }).then((result) => {
            if (result.status == 204) {
                this.setState({ logged_out: true })
                localStorage.clear()


            }
            else {
                alert("Something went wrong")
            }
        })
    }

    render() {
        return (
            this.state.logged_out ? (

                <Redirect to="/" />
            ) : (<div className="header">Loading ....</div>)
        )

    }
}

export default Logout
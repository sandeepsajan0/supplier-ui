import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class List extends Component {
    constructor(props) {
        super(props)

        this.state = {
            response: null,
            auth_redirect: false,
            logout: false,
        }
    }
    componentDidMount() {
        this.listing()
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
                this.listing()
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

    listing() {
        var url = "https://simfoni-supplier.herokuapp.com/api/suppliers/"
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
                    this.setState({ response: resp })
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

    renderTableHeader() {
        return ["Id", "Business Name", "Email", "Full Name", "Address"].map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    renderTableData() {
        return this.state.response.results.map((supplier, index) => {
            const { id, business_name, primary_email, primary_full_name, address } = supplier //destructuring
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{business_name}</td>
                    <td>{primary_email}</td>
                    <td>{primary_full_name}</td>
                    <td>{address}</td>
                </tr>
            )
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
                <h2>Welcome to the Admin Pannel</h2>


                <div className="listing">
                    {!this.state.response ? (
                        < div > Loading ....</div>
                    ) : (
                            <div>
                                <table id="supplier">
                                    <tbody>
                                        <tr>{this.renderTableHeader()}</tr>
                                        {this.renderTableData()}
                                    </tbody>
                                </table>
                            </div>
                        )
                    }


                </div>
                <br />
                <div style={{ paddingLeft: "94%" }}>  <button onClick={() => { this.setState({ logout: true }) }}>Logout</button></div>
            </div>
        )
    }
}

export default List
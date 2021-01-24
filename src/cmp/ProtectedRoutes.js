import React from 'react'
import {
    Redirect
} from "react-router-dom";

function ProtectedRoutes(props) {
    const Comp = props.cmp
    var admin_route = props.admin
    var auth = JSON.parse(localStorage.getItem("id"))
    var is_admin = JSON.parse(localStorage.getItem("is_admin"))
    if (auth) {
        if (props.logout) {
            return <Comp />
        }
        else if (admin_route) {
            if (is_admin === true) {
                return <Comp />
            }
            else {
                return (<div> <Redirect to="/" /></div>)
            }
        }
        else {
            if (is_admin === true) {
                return <div><Redirect to="/" /></div>
            }
            else {
                return <Comp />
            }
        }

    }
    else { return (<div> <Redirect to="/" /></div>) }
}

export default ProtectedRoutes
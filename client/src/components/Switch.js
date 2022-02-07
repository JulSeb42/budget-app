// Packages
import React, { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import axios from "axios"

// Pages
import Home from "../pages/Home"
import NotFound from "../pages/NotFound"

// Auth
import Signup from "../pages/auth/Signup"
import Login from "../pages/auth/Login"
import ThankYou from "../pages/auth/ThankYou"
import Verify from "../pages/auth/Verify"
import ForgotPassword from "../pages/auth/ForgotPassword"
import ForgotSent from "../pages/auth/ForgotSent"
import ResetPassword from "../pages/auth/ResetPassword"
import Goodbye from "../pages/auth/Goodbye"

// User
import MyAccount from "../pages/user/MyAccount"
import EditAccount from "../pages/user/EditAccount"
import EditPassword from "../pages/user/EditPassword"

// Utils
import ProtectedRoutes from "./utils/ProtectedRoutes"

function Switch() {
    const [allUsers, setAllUsers] = useState([])
    const [edited, setEdited] = useState(false)

    useEffect(() => {
        axios
            .get("/users/user")
            .then(res => setAllUsers(res.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <Routes>
            <Route path="/" element={<Home />} />

            {/* Auth */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/thank-you" element={<ThankYou />} />
            {allUsers.map(user => (
                <Route
                    path={`/verify/${user.verifyToken}/${user._id}`}
                    element={
                        <ProtectedRoutes redirectTo="/login">
                            <Verify edited={edited} setEdited={setEdited} />
                        </ProtectedRoutes>
                    }
                    key={`${user.verifyToken}/${user._id}`}
                />
            ))}
            <Route path="/login/forgot-password" element={<ForgotPassword />} />
            <Route
                path="/login/forgot-password/email-sent"
                element={<ForgotSent />}
            />
            {allUsers.map(user => (
                <Route
                    path={`/reset-password/${user.resetToken}/${user._id}`}
                    element={<ResetPassword />}
                    key={`${user.resetToken}-${user._id}`}
                />
            ))}
            <Route path="/goodbye" element={<Goodbye />} />

            {/* User */}
            <Route
                path="/my-account"
                element={
                    <ProtectedRoutes redirectTo="/login">
                        <MyAccount />
                    </ProtectedRoutes>
                }
            />
            <Route
                path="/my-account/edit"
                element={
                    <ProtectedRoutes redirectTo="/login">
                        <EditAccount edited={edited} setEdited={setEdited} />
                    </ProtectedRoutes>
                }
            />
            <Route
                path="/my-account/edit-password"
                element={
                    <ProtectedRoutes redirectTo="/login">
                        <EditPassword edited={edited} setEdited={setEdited} />
                    </ProtectedRoutes>
                }
            />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default Switch

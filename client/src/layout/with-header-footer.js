import React, { Component } from "react";
import Header from "./header";
import Footer from "./footer";
import {Container} from "react-bootstrap";

function WithHeaderAndFooter({children}) {
    return (
        <React.Fragment>
            <Header/>
            <main>
                <Container fluid={true} className="nc-container">
                    {children}
                </Container>
            </main>
            <Footer/>
        </React.Fragment>
    );

}

export default WithHeaderAndFooter;
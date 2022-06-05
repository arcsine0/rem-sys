import React, {useState} from "react"

import test from './test.css'

function Test(props) {

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{props.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{props.desc}</h6>
                <p className="card-text">This card is copy pasted straight from the Bootstrap website</p>
            </div>
        </div>
    )
}

export default Test;
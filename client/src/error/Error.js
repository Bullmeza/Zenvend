import React from "react";


export default class Error extends React.Component{
    render(){
        return(
            <div className="box" style={{textAlign: "center"}}>
                <div>
                    <h1>Error 404</h1>
                    <a href="/"><p>Back to safety</p></a>
                </div>
            </div>
        );
    }
}
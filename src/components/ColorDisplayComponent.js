import React, { Component } from 'react';

function ColorDisplay(props) {

    /* Display Colors */
    const analysisColor = rgbaColor(props.redValue, props.greenValue, props.blueValue, props.opacityValue);
    const complementColor = coRgbaColor(props.redValue, props.greenValue, props.blueValue, props.opacityValue);

    /* Color Styles */
    const styleAnalysisDiv = {
        "background-color" : analysisColor
    };
    const styleComplementDiv = {
        "background-color" : complementColor
    };
    
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div id="analysisClrHeader">
                        <h5><strong>Analysis Color</strong></h5>
                        <p></p>
                    </div>
                    <div id="analysisDiv" style={styleAnalysisDiv}>
                    </div>
                    <div id="complementClrHeader">
                        <h5><strong>Complement Color</strong></h5>
                        <p></p>
                    </div>
                    <div id="complementDiv" style={styleComplementDiv}>
                    </div>
                </div>
            </div>
        </div>
    );

}

function rgbaColor(redV, greenV, blueV, opacityV) {
    const opVal = (opacityV / 100.0);
    const rgbaStr = `rgba(${redV}, ${greenV}, ${blueV}, ${opVal})`;
    return rgbaStr;
}

function coRgbaColor(redV, greenV, blueV, opacityV) {
    const opVal = (opacityV / 100.0);
    const coRedV = 255 - redV;
    const coGreenV = 255 - greenV;
    const coBlueV = 255 - blueV;
    const coRgbaStr = `rgba(${coRedV}, ${coGreenV}, ${coBlueV}, ${opVal})`;
    return coRgbaStr;
}

export default ColorDisplay;

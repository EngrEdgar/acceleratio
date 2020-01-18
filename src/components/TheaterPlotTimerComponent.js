import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';

class TheaterPlotTimer extends Component {

    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.drawSegment = this.drawSegment.bind(this);
        this.drawAxes = this.drawAxes.bind(this);
    }

    componentDidMount() {
        const theCanvas = this.canvasRef.current;
        const theCTX = theCanvas.getContext("2d");

        console.log(`In TheaterPlotTimer componentDidMount()...`);
        console.log(`theCanvas is ${theCanvas}`);
        console.log(`theCTX is ${theCTX}`);
        console.log(`axesNeeded is ${this.props.axesNeeded}`);

        this.drawAxes(theCTX);
    }

    drawAxes(theCTX) {

        console.log(`In TheaterPlotTimer drawAxes()`);

        theCTX.strokeStyle = "rgba(0, 150, 150, 1.0)";
        theCTX.beginPath();
        theCTX.moveTo(0, 100);
        theCTX.lineTo(300, 100);
        theCTX.stroke();
    }

    drawSegment() {
        /* console.log(`at TheaterPlotTimer drawSegment()`); */
        const theCanvas = this.canvasRef.current;
        if (theCanvas) {
            const theCTX = theCanvas.getContext("2d");
            if (this.props.axesNeeded) {

                if (!(this.props.physicalTime === 0)) {
                    const xpOldScaled = 50 + Math.round(this.props.xpOld / 2);
                    const xpNewScaled = 50 + Math.round(this.props.xpNew / 2);

                    if (this.props.smRgbaColor) {
                        theCTX.strokeStyle = this.props.smRgbaColor;
                    }
                    else {
                        theCTX.strokeStyle = "rgba(255, 255, 255, 1.0)";    
                    }
                    
                    //theCTX.strokeStyle = "rgba(150, 0, 0, 0.70)";
                    
                    theCTX.beginPath();
                    theCTX.moveTo(this.props.ypOld, xpOldScaled);
                    theCTX.lineTo(this.props.ypNew, xpNewScaled);
                    theCTX.stroke();      
                }               
            }
            else {
                theCTX.clearRect(0, 0, 300, 200 )
                this.drawAxes(theCTX);
            }
        }
    }

    render() {

        const styleAcousticsFld = {
            "background-color" : this.props.smRgbaColor
        };

        const pxSpringHeight = this.props.numSpringHeight + "px";
        const pxWeightTop = this.props.numWeightTop + "px";

        let strPhysicalTime = "";
        if (this.props.axesNeeded) {
            strPhysicalTime = this.props.physicalTime + "";
        }

        const styleSpring = {
            "height" : pxSpringHeight,
            "background-color": this.props.smRgbaColor
        }

        const styleWeight = {
            "top" : pxWeightTop,
            "background-color": this.props.smRgbaColor
        }

        this.drawSegment();

        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div id="theThtr">
                            <div id="theSprng" style={styleSpring}></div>
                            <div id="theWght" style={styleWeight}></div>
                        </div>
                        <div className="canvas-container" id="pltDiv">
                            <canvas ref={this.canvasRef} id="pltCanvas"></canvas>
                        </div>
                        <div id="clckDiv">
                            <label htmlFor="liveTimerFld" id="timerLbl">
                                Seconds
                            </label>
                            <input type="text" name="liveTimer" id="liveTimerFld" value={strPhysicalTime} size="4">
                            </input>
                        </div>
                        <div id="acDesignationDiv">
                            <Row className="form-group">
                                <Col className="ml-0" xs={{size: 6, offset: 0}}>
                                    <label htmlFor="acHertz" id="acHertzLbl">
                                        Hertz
                                    </label>
                                    <input type="text" name="acHertz" id="acHertz" value={this.props.freqHertz} style={styleAcousticsFld} size="4">
                                    </input>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col className="ml-0" xs={{size: 2, offset: 0}}>
                                    <label htmlFor="acNote" id="acNoteLbl">
                                        Note
                                    </label>
                                    <input type="text" name="acNote" id="acNote" value={this.props.smAcNote} style={styleAcousticsFld} size="6">
                                    </input>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col className="ml-0" xs={{size: 2, offset: 0}}>
                                    <label htmlFor="acOctave" id="acOctaveLbl">
                                        Octave
                                    </label>
                                    <input type="text" name="acOctave" id="acOctave" value={this.props.smAcOctave} style={styleAcousticsFld} size="6">
                                    </input>
                                </Col>
                            </Row>
                        </div>
                        <div id="spacerDiv"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TheaterPlotTimer;

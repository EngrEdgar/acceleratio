import React, { Component } from 'react';
import { Button, Label, Col, Row } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import TheaterPlotTimer from './TheaterPlotTimerComponent';

const required = val => val && val.length;
const isPositiveNumber = val => (!isNaN(+val) && (val > 0));

const xPosAttach = 10;
const xPosMin = 100;
const xPosMax = 300;
const xPosRest = ( ( xPosMin + xPosMax ) / 2 );
const temporalScaleFactor = 1.0;
const spatialScaleFactor = 1.0;
/* Start: Time Interval Between Succesive Iterations */
const deltaTimeJS = 0.5; //in ms.
/* End: Time Interval Between Successive Iterations */
const xVarStopLimit = 0.000000000000000001;

/* Global Variable Declaration of setInterval Id */
let sprMassSetIntervalId = 0;
/* End Global Declaration of of setInterval Id */

/* Global Variable Declaration of Displacement of Weight from Rest Position */
let xPosDispInit = 0;
let xVarInit = xPosDispInit * spatialScaleFactor;
let xOfTime = xVarInit;
/* End Displacment Variable Declaration */

/* Global Variable Declaration of Pixel Location of Weight Top */
let xPos = xPosDispInit + xPosRest;
let xpOld = xPos - 100;
let ypOld = 0;
let xpNew = xpOld;
let ypNew = ypOld;
/* End Declaration of Pixel Location */

/* Functional Globals Declaration */
let decayFactor;
let freqRadPerSec;
let decayFactorOne;
let decayFactorTwo;
let situationNumber;
let kc1;
let kc2;
let c1;
let c2;
let k1;
let k2;
let stoppable = false;
let terminalCondition = false;
/* End Functional Globals Declaration */

/* Acoustic Variables Declaration */
let freqHertz;
let smAcNote;
let smAcOctave;
let smRgbaColor;
/* End Acoustic Variables Declaration */

/* Time Globals */
let timeJS = 0; //in ms.
let physicalTime = javaScriptTimeToPhysicalTime(); //in seconds
let physicalTimeMax;
/* End Time Globals */

class SpringMass extends Component {

    constructor(props) {
        super(props);

        this.state = {
            mass: '',
            damping: '',
            springConstant: '',
            simTimeMax: '',
            touched: {
                mass: false,
                damping: false,
                springConstant: false,
                simTimeMax: false
            },
            numSpringHeight: ( xPosRest - xPosAttach ),
            numWeightTop: xPosRest,
            axesNeeded: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.pushWeightUp = this.pushWeightUp.bind(this);
        this.pushWeightDown = this.pushWeightDown.bind(this);
        this.stopSimulation = this.stopSimulation.bind(this);
        this.stepThroughTime = this.stepThroughTime.bind(this);
    }

    handleSubmit(values) {
        console.log(`In handleSubmit()`);
        console.log("JSON stringfied is: " + JSON.stringify(values));
        //alert("JSON stringfied is: " + JSON.stringify(values));
        console.log(`values.mass is ${values.mass}`);
        this.setState({mass: values.mass});
        this.setState({damping: values.damping});
        this.setState({springConstant: values.springConstant});
        this.setState({simTimeMax: values.simTimeMax});
        this.setState({axesNeeded: true});
        console.log(this.state);

        xPosDispInit = this.state.numWeightTop - xPosRest;
        xVarInit = xPosDispInit * spatialScaleFactor;
        console.log(`xVarInit is ${xVarInit}`);

        physicalTimeMax = values.simTimeMax;

        const alphaBeta = quadraticSolution(values.mass, values.damping, values.springConstant);
        timePlotParameters(alphaBeta);

        timeJS = 0.0;
        physicalTime = 0.0;
        stoppable = false;
        terminalCondition = false;
        sprMassSetIntervalId = setInterval(this.stepThroughTime, deltaTimeJS);

        //const canvas = ReactDOM.findDOMNode(this.refs.canvas);
        //console.log(`canvas is ${canvas}`);
    }

    pushWeightUp() {
        console.log(`In pushWeightUp()`);
        this.setState({numSpringHeight: (xPosMin - xPosAttach)});
        this.setState({numWeightTop: xPosMin});
    }

    pushWeightDown() {
        console.log(`In pushWeightDown()`);
        this.setState({numSpringHeight: (xPosMax - xPosAttach)});
        this.setState({numWeightTop: xPosMax});
    }

    stopSimulation() {
        console.log(`In stopSimulation()`);
        stoppable = true;
        this.setState({numSpringHeight: ( xPosRest - xPosAttach)});
        this.setState({numWeightTop: xPosRest });
        this.setState({axesNeeded: false});
        freqHertz= 0;
        smAcNote = "";
        smAcOctave = "";
        smRgbaColor = "rgba(255, 255, 255, 1.0)";
    }

    stepThroughTime() {
        //console.log(`In stepThroughTime()`);

        terminalCondition = endSimulation();
        //console.log(`terminalCondition is ${terminalCondition}`);

        if (terminalCondition) {
            clearInterval(sprMassSetIntervalId);
        }
        else {
            timeJS += deltaTimeJS;
            //console.log(`timeJS is ${timeJS}`);
            physicalTime = javaScriptTimeToPhysicalTime(); //in seconds
            xOfTime = physicalTimeToActualVar();
            xPos = xPosRest + actualVariableToDeltaPixel();
            this.setState({numSpringHeight: (xPos - xPosAttach)});
            this.setState({numWeightTop: xPos});
        }
    }

    render() {

        if (this.state.axesNeeded) {
            xpOld = xpNew;
            ypOld = ypNew;
            xpNew = xPos - 100;
            ypNew = Math.round(300 * (physicalTime / physicalTimeMax));
        }

        return (
            <React.Fragment>
                <div className="container">
                    <div className="row row-content">
                        <div className="col-12">
                            <h3>
                                <strong>Spring-Mass System Simulation</strong>
                            </h3>
                            <p></p>
                        </div>
                        <div className="col-12">
                            <LocalForm onSubmit={values => this.handleSubmit(values)}>
                                <Row className="form-group">
                                    <Label htmlFor="mass" className="ml-3" xs={2}>M(kg)</Label>
                                    <Col xs={3}>
                                        <Control.text model=".mass" id="mass" name="mass"
                                            placeholder="1.0"
                                            className="form-control"
                                            validators={{
                                                required,
                                                isPositiveNumber
                                            }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".mass"
                                            show="touched"
                                            component="div"
                                            messages={{
                                                required: 'Required',
                                                isPositiveNumber: 'Must be positive number'
                                            }}
                                        />
                                    </Col>
                                    <Label htmlFor="damping" xs={3}>D(N.sec/m)</Label>
                                    <Col xs={3}>
                                        <Control.text model=".damping" id="damping" name="damping"
                                            placeholder="1.0"
                                            className="form-control"
                                            validators={{
                                                required,
                                                isPositiveNumber
                                            }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".damping"
                                            show="touched"
                                            component="div"
                                            messages={{
                                                required: 'Required',
                                                isPositiveNumber: 'Must be positive number'
                                            }}
                                        />
                                    </Col>
                                </Row>

                                <Row className="form-group">
                                    <Label htmlFor="springConstant" className="ml-3" xs={2}>K(N./m)</Label>
                                    <Col xs={3}>
                                        <Control.text model=".springConstant" id="springConstant" name="springConstant"
                                            placeholder="15.0"
                                            className="form-control"
                                            validators={{
                                                required,
                                                isPositiveNumber
                                            }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".springConstant"
                                            show="touched"
                                            component="div"
                                            messages={{
                                                required: 'Required',
                                                isPositiveNumber: 'Must be positive number'
                                            }}
                                        />
                                    </Col>
                                    <Label htmlFor="simTimeMax" xs={3}>TMax(sec)</Label>
                                    <Col xs={3}>
                                        <Control.text model=".simTimeMax" id="simTimeMax" name="simTimeMax"
                                            placeholder="15.0"
                                            className="form-control"
                                            validators={{
                                                required,
                                                isPositiveNumber
                                            }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".simTimeMax"
                                            show="touched"
                                            component="div"
                                            messages={{
                                                required: 'Required',
                                                isPositiveNumber: 'Must be positive number'
                                            }}
                                        />
                                    </Col>
                                </Row>

                                <Row className="form-group">
                                    <Col className="ml-3" xs={{size: 1, offset: 0}}>
                                        <Button type="button" color="secondary" onClick={this.pushWeightUp}>
                                            Up
                                        </Button>
                                    </Col>
                                    <Col className="ml-2" xs={{size: 3, offset: 0}}>
                                        <Button type="button" color="secondary" onClick={this.pushWeightDown}>
                                            Down
                                        </Button>
                                    </Col>
                                    <Col className="ml-5" xs={{size: 1, offset: 0}}>
                                        <Button type="submit" color="secondary">
                                            Start
                                        </Button>
                                    </Col>
                                    <Col className="ml-4" xs={{size: 1, offset: 0}}>
                                        <Button type="button" color="secondary" onClick={this.stopSimulation}>
                                            Stop
                                        </Button>
                                    </Col>
                                </Row>
                            </LocalForm>
                        </div>
                    </div>
                </div>
                <TheaterPlotTimer 
                    numSpringHeight={this.state.numSpringHeight} 
                    numWeightTop = {this.state.numWeightTop}
                    axesNeeded = {this.state.axesNeeded}
                    xpOld = {xpOld}
                    xpNew = {xpNew}
                    ypOld = {ypOld}
                    ypNew = {ypNew}
                    xPos = {xPos}
                    physicalTime = {physicalTime}
                    physicalTimeMax = {physicalTimeMax}
                    smRgbaColor = {smRgbaColor}
                    freqHertz = {freqHertz}
                    smAcNote = {smAcNote}
                    smAcOctave = {smAcOctave}
                />
            </React.Fragment>
        );
    }
}

function stepsAboveC0(freqInHz) {
    let n = 0;
        const fC0 = 440 * Math.pow(2, -4.75);
        const fM = freqInHz * (Math.pow( 2, (1/24) ) );
        const R = fM / fC0;
        const nS = ( 12 * Math.log(R) ) / ( Math.log(2) );
    n = Math.floor(nS);
    return n;
}

function acOctDesignation(nSteps) {
    if (nSteps >= 0) {
        return Math.floor( nSteps / 12 );
    }
    else {
        return "";
    }
}

function stepsAboveNoteC(nSteps) {
    if (nSteps >= 0) {
        return (nSteps % 12);
    }
    else {
        return -1;    
    }
}

function acNoteDesignation(stepsAboveC) {
    const dict = {0:"C", 1:"C#", 2:"D", 3:"D#", 4:"E", 5:"F", 6:"F#", 7:"G", 8:"G#", 9:"A", 10:"A#", 11:"B"};

    if (stepsAboveC >= 0) {
        const note = dict[stepsAboveC];
        if (note) {
            return note;
        }
        else {
            return "";        
        }
    }
    else {
        return "";        
    }
}

function acHexColor(mNote) {
    const dict = {"C":"28FF00", "C#":"00FFE8", "D":"007CFF", "D#":"0500FF", "E":"4500EA", "F":"57009E", "F#":"750000", "G":"B30000", "G#":"EE0000", "A":"FF6300", "A#":"FFEC00", "B":"99FF00"};
    if (dict[mNote]) {
        return dict[mNote];
    }
    else {
        return "";
    }
}

function dec255(hexFF) {
    if ( (hexFF.length === 0) || (hexFF.length > 2) ) {
        return 0;
    }

    const dict = {"0":0, "1":1, "2":2, "3":3, "4":4, "5":5, "6":6, "7":7, "8":8, "9":9, "A":10, "B":11, "C":12, "D":13, "E":14, "F":15};
    
    const firstHex = hexFF.slice(0,1);
    const secondHex = hexFF.slice(1,2);
    const firstDec = dict[firstHex];
    const secondDec = dict[secondHex];

    if ( (firstDec) && (secondDec) ) {
        return Math.round( (firstDec * 16) + secondDec);
    }
    else {
        return 0;
    }
}

function acRgbaColor(mNote) {
    const hexColor = acHexColor(mNote);
    if (hexColor === "") {
        return "";
    }

    const hexRed = hexColor.slice(0,2);
    const hexGreen = hexColor.slice(2,4);
    const hexBlue = hexColor.slice(4,6);

    const redV = dec255(hexRed);
    const greenV = dec255(hexGreen);
    const blueV = dec255(hexBlue);
    const opacityV = 50;

    return rgbaColor(redV, greenV, blueV, opacityV);
}

function rgbaColor(redV, greenV, blueV, opacityV) {
    const opVal = (opacityV / 100.0);
    const rgbaStr = `rgba(${redV}, ${greenV}, ${blueV}, ${opVal})`;
    return rgbaStr;
}

function quadraticSolution(A, B, C) {
    console.log(`at quadraticSolution`);
    
    let twoA = 2.0 * 0.001;
    if (A <= 0.001) {
      alert(`Coefficient A is too small.`);
    }
    else {
      twoA = 2.0 * A;
    }
    console.log(`twoA is ${twoA}`);

    const partOne = - 1.0 * B / twoA;

    const radicand = (B * B) - (2.0 * twoA * C) ;
    let complexRts = true;
    if (radicand >= 0.0) {
      complexRts = false;
    }

    const partTwo = ( Math.sqrt(Math.abs(radicand)) ) / twoA;
    const qSolution = [partOne, partTwo, complexRts];

    console.log(`partOne is ${partOne}`);
    console.log(`partTwo is ${partTwo}`);
    console.log(`complexRts is ${complexRts}`);

    return qSolution;
}

function timePlotParameters(alphaBeta) {

    const complexRoots = alphaBeta[2];
    freqRadPerSec = 0.0;
    freqHertz = freqRadPerSec / (2.0 * Math.PI);

    if (complexRoots) {
        decayFactor = alphaBeta[0];
        freqRadPerSec = alphaBeta[1];
        /* Start: Acoustic Values */
        freqHertz = freqRadPerSec / (2.0 * Math.PI);
        const nSAC0 = stepsAboveC0(freqHertz);
        smAcOctave = acOctDesignation(nSAC0);
        const nSAC = stepsAboveNoteC(nSAC0);
        smAcNote = acNoteDesignation(nSAC);
        smRgbaColor = acRgbaColor(smAcNote);
        /* End: Acoustic Values */
        k1 = xVarInit;
        k2 = ( (-1.0 * decayFactor * xVarInit) / freqRadPerSec) ;
        situationNumber = 3;
        console.log(`Case 3: Complex Roots`);
    }
    else {
        if (alphaBeta[1] == 0.0) {
          decayFactor = alphaBeta[0];
          c1 = xVarInit;
          c2 = (-1.0 * decayFactor * xVarInit);
          situationNumber = 2;
          console.log(`Case 2: One Real Root`);
        }
        else {
          decayFactorOne = alphaBeta[0] + alphaBeta[1];
          decayFactorTwo = alphaBeta[0] - alphaBeta[1];
          const rootdiff = (decayFactorOne - decayFactorTwo);
          kc1 = ( (-1.0 * xVarInit * decayFactorTwo ) / rootdiff ) ;
          kc2 = ( ( 1.0 * xVarInit * decayFactorOne ) / rootdiff ) ;
          situationNumber = 1;
          console.log(`Case 1: Two Real Roots`);
        }
    }
}

function javaScriptTimeToPhysicalTime() {
    const pTime = temporalScaleFactor * 0.001 * timeJS; //in seconds
    return pTime;
}

function actualVariableToDeltaPixel() {
    const xpx = Math.round( xOfTime / spatialScaleFactor );
    return xpx;
}

function physicalTimeToActualVar() {

    let actVar;

    switch(situationNumber) {

      case 1:
        //alert(`case 1: Two Real Quadratic Roots.`);
        const expFactorOneCase1 = Math.exp(decayFactorOne * physicalTime);
        const expFactorTwoCase1 = Math.exp(decayFactorTwo * physicalTime);
        actVar = (kc1 * expFactorOneCase1) + (kc2 * expFactorTwoCase1);
        if (expFactorTwoCase1 < xVarStopLimit) {
          stoppable = true;
        }
        break;

      case 2:
        //alert(`case 2: One Real Quadaratic Root.`);
        const expFactorCase2 = Math.exp(decayFactor * physicalTime);
        actVar = (c1 + (c2 * physicalTime) ) * expFactorCase2;
        if (expFactorCase2 < xVarStopLimit) {
          stoppable = true;
        }
        break;

      case 3:
        //alert(`case 3: Two Complex Quadratic Roots.`);
        const omega = freqRadPerSec;
        const expFactorCase3 = Math.exp(decayFactor * physicalTime);
        const angleRadians = omega * physicalTime;
        const cosFactor = Math.cos(angleRadians);
        const sinFactor = Math.sin(angleRadians);
        const sinusoidalFactor = k1 * cosFactor + k2 * sinFactor;
        actVar = expFactorCase3 * sinusoidalFactor;
        if (expFactorCase3 < xVarStopLimit) {
          stoppable = true;
        }
        /*
        console.log(`omega is ${omega}`);
        console.log(`physicalTime is ${physicalTime}`);
        console.log(`expFactor is ${expFactor}`);
        console.log(`angleRadians is ${angleRadians}`);
        console.log(`cosFactor is ${cosFactor}`);
        console.log(`sinFactor is ${sinFactor}`);
        console.log(`sinusoidalFactor is ${sinusoidalFactor}`);
        console.log(`actVar is ${actVar}`);
        */
        break;

      default:
        alert(`The quadratic solution variables are ill-defined.`);
        actVar = 20 * physicalTime;
    }

    if (xVarInit == 0) {
      stoppable = true;
    }

    return actVar;
  }

function endSimulation() {
    //console.log(`In endSimulation()`);
    //console.log(`physicalTime is ${physicalTime}`);
    //console.log(`stoppable is ${stoppable}`);

    if (physicalTime >= physicalTimeMax) {
      return true;
    }
    else if (stoppable) {
      return true;
    }
    else {
      return false;
    }
}

export default SpringMass;

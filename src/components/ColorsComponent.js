import React, { Component } from 'react';
import { Button, Label, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = val => val && val.length;
const isNonNegative = val => (!isNaN(+val) && (val >= 0));
const isInColorRange = val => ((val >= 0) && (val <= 255));
const isInPercentage = val => ((val >= 0) && (val <= 100));
const isAnInteger = val => (val == Math.floor(val));
const delta = 1;
let rnuma = 0;
let gnuma = 0;
let bnuma = 0;
let stage = 1;
let colorsSetIntervalId = 0;

class Colors extends Component {

    constructor(props) {
        super(props);

        this.state = {
            acousticNote: '',
            acousticOctave: '',
            redValue: 0,
            greenValue: 0,
            blueValue: 0,
            opacityValue: 100,
            touched: {
                redValue: false,
                greenValue: false,
                blueValue: false,
                opacityValue: false
            },
            showEnabled: true
        };

        this.handleAcousticSubmit = this.handleAcousticSubmit.bind(this);
        this.disableShow = this.disableShow.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showSpectrum = this.showSpectrum.bind(this);
        this.showAllColors = this.showAllColors.bind(this);
    }

    handleAcousticSubmit(acousticValues) {
        //console.log("acousticValues is: " + JSON.stringify(acousticValues));
        //alert("acousticValues is: " + JSON.stringify(acousticValues));
        this.setState({acousticNote: acousticValues.acousticNote});
        this.setState({acousticOctave: acousticValues.acousticOctave});
        //console.log(this.state);
    }

    disableShow() {
        this.setState({showEnabled: false});
    }

    handleSubmit(values) {
        //console.log("Current state is: " + JSON.stringify(values));
        //alert("Current state is: " + JSON.stringify(values));
        this.setState({redValue: values.redValue});
        this.setState({greenValue: values.greenValue});
        this.setState({blueValue: values.blueValue});
        this.setState({opacityValue: values.opacityValue});
        this.disableShow();
        //console.log(this.state);
    }

    showSpectrum() {
        rnuma = 0;
        gnuma = 0;
        bnuma = 0;
        stage = 1;
        colorsSetIntervalId = setInterval(this.showAllColors, 20);
    }

    showAllColors() {
        switch(stage) {
            case 1:
                if (bnuma >= 255) {
                    stage = 2;
                } 
                else {
                    this.setState({redValue: rnuma});
                    this.setState({greenValue: gnuma});
                    this.setState({blueValue: bnuma});            
                    bnuma += delta;
                }
                break;
            case 2:
                if (gnuma >= 255) {
                    stage = 3;
                } 
                else {
                    this.setState({redValue: rnuma});
                    this.setState({greenValue: gnuma});
                    this.setState({blueValue: bnuma});            
                    gnuma += delta;
                }
                break;
            case 3:
                if (bnuma <= 0) {
                    stage = 4;
                } 
                else {
                    this.setState({redValue: rnuma});
                    this.setState({greenValue: gnuma});
                    this.setState({blueValue: bnuma});            
                    bnuma -= delta;
                }
                break;
            case 4:
                if (rnuma >= 255) {
                    stage = 5;
                } 
                else {
                    this.setState({redValue: rnuma});
                    this.setState({greenValue: gnuma});
                    this.setState({blueValue: bnuma});            
                    rnuma += delta;
                }
                break;
            case 5:
                if (bnuma >= 255) {
                    stage = 6;
                }
                else {
                    this.setState({redValue: rnuma});
                    this.setState({greenValue: gnuma});
                    this.setState({blueValue: bnuma});            
                    bnuma += delta;
                }
                break;
            case 6:
                if (gnuma <= 0) {
                    stage = 7;
                }
                else {
                    this.setState({redValue: rnuma});
                    this.setState({greenValue: gnuma});
                    this.setState({blueValue: bnuma});            
                    gnuma -= delta;
                }
                break;
            case 7:
                if (bnuma <= 0) {
                    stage = 8;
                }
                else {
                    this.setState({redValue: rnuma});
                    this.setState({greenValue: gnuma});
                    this.setState({blueValue: bnuma});            
                    bnuma -= delta;
                }
                break;
            case 8:
                if (rnuma <= 0) {
                    stage = 9;
                }
                else {
                    this.setState({redValue: rnuma});
                    this.setState({greenValue: gnuma});
                    this.setState({blueValue: bnuma});            
                    rnuma -= delta;
                }
                break;
            default:
                this.setState({redValue: rnuma});
                this.setState({greenValue: gnuma});
                this.setState({blueValue: bnuma});            
                clearInterval(colorsSetIntervalId);
        }
    }
    
    render() {

        /* Start Acoustic Text Field Values and Background Colors*/
        const acousticFreq = acFrequency(this.state.acousticNote, this.state.acousticOctave);

        const acousticHexCol = acHexColor(this.state.acousticNote);

        const acousticStrColor = acRgbaColor(this.state.acousticNote);

        const acousticStyleColor = {
            "background-color" : acousticStrColor
        };

        /* End Acoustic Text Field Values and Background Colors*/

        /* Start Spectrum Rectangular Display Colors */
        const analysisColor = rgbaColor(this.state.redValue, this.state.greenValue, this.state.blueValue, this.state.opacityValue);
        //console.log(`analysis color is ${analysisColor}`);

        const complementColor = coRgbaColor(this.state.redValue, this.state.greenValue, this.state.blueValue, this.state.opacityValue);
        //console.log(`complement color is ${complementColor}`);

        const styleAnalysisDiv = {
            "background-color" : analysisColor
        };

        const styleComplementDiv = {
            "background-color" : complementColor
        };
        /* End Spectrum Rectangular Display Colors */

        /* Start Spectrum Text Field Values and Background Colors */
        const analysisFldVal = hexaDecimalValue(this.state.redValue, this.state.greenValue, this.state.blueValue);

        const complementFldVal = hexaDecimalValue(255 - this.state.redValue, 255 - this.state.greenValue, 255 - this.state.blueValue);

        const analysisFldColor = rgbaColor(this.state.redValue, this.state.greenValue, this.state.blueValue, 25);
        //console.log(`analysis field color is ${analysisFldColor}`);

        const complementFldColor = coRgbaColor(this.state.redValue, this.state.greenValue, this.state.blueValue, 25);
        //console.log(`complement field color is ${complementFldColor}`);

        const styleAnalysisFld = {
            "background-color" : analysisFldColor
        };

        const styleComplementFld = {
            "background-color" : complementFldColor
        };
        /* End Spectrum Text Field Values and Background Colors */

        return (
            <React.Fragment>
                <div className="container">
                    <div className="row row-content">
                        <div className="col-12">
                            <h3>
                                <strong>Color Spectrum</strong>
                            </h3>
                            <p></p>
                        </div>
                        <div className="col-12">
                            <Row className="form-group">
                                <Col className="ml-0" xs={{size: 5, offset: 0}}>
                                    <Button type="button" disabled={!this.state.showEnabled}  color="secondary" onClick={this.showSpectrum}>
                                        Show Spectrum
                                    </Button>
                                </Col>
                                <Col className="ml-0" xs={{size: 3, offset: 0}} md={{size: 3, offset: 0}}>
                                    <label htmlFor="analysisfld" id="analysisFldLbl"></label>
                                    <input type="text" name="continuum" id="analysisfld" value={analysisFldVal} size="6" style={styleAnalysisFld}></input>
                                </Col>
                                <Col className="ml-0" xs={{size: 3, offset: 0}}>
                                    <label htmlFor="complementfld" id="complementFldLbl"></label>
                                    <input type="text" name="continuum" id="complementfld" value={complementFldVal} size="6" style={styleComplementFld}></input>
                                </Col>
                            </Row>
                        </div>

                        <div className="col-12">
                            <h5>
                                <strong>Specify Each Component (0 to 255)</strong>
                                <p></p>
                            </h5>
                        </div>
                        <div className="col-12">
                            <LocalForm onSubmit={values => this.handleSubmit(values)}>
                                <Row className="form-group">
                                    <Label htmlFor="redValue" xs={2} md={1}>Red</Label>
                                    <Col xs={10} md={2}>
                                        <Control.text model=".redValue" id="redValue" name="redValue"
                                            placeholder={this.state.redValue}
                                            className="form-control"
                                            validators={{
                                                required,
                                                isNonNegative,
                                                isInColorRange,
                                                isAnInteger
                                            }}
                                            onChange={this.disableShow}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".redValue"
                                            show="touched"
                                            component="div"
                                            messages={{
                                                required: 'Required',
                                                isNonNegative: 'Must not be negative number',
                                                isInColorRange: 'Must be 255 or less',
                                                isAnInteger: 'Must be integer'
                                            }}
                                        />
                                    </Col>

                                    <Label htmlFor="greenValue" xs={2} md={1}>Green</Label>
                                    <Col xs={10} md={2}>
                                        <Control.text model=".greenValue" id="greenValue" name="greenValue"
                                            placeholder={this.state.greenValue}
                                            className="form-control"
                                            validators={{
                                                required,
                                                isNonNegative,
                                                isInColorRange,
                                                isAnInteger
                                            }}
                                            onChange={this.disableShow}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".greenValue"
                                            show="touched"
                                            component="div"
                                            messages={{
                                                required: 'Required',
                                                isNonNegative: 'Must not be negative number',
                                                isInColorRange: 'Must be 255 or less',
                                                isAnInteger: 'Must be integer'
                                            }}
                                        />
                                    </Col>

                                    <Label htmlFor="blueValue" xs={2} md={1}>Blue</Label>
                                    <Col xs={10} md={2}>
                                        <Control.text model=".blueValue" id="blueValue" name="blueValue"
                                            placeholder={this.state.blueValue}
                                            className="form-control"
                                            validators={{
                                                required,
                                                isNonNegative,
                                                isInColorRange,
                                                isAnInteger
                                            }}
                                            onChange={this.disableShow}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".blueValue"
                                            show="touched"
                                            component="div"
                                            messages={{
                                                required: 'Required',
                                                isNonNegative: 'Must not be negative number',
                                                isInColorRange: 'Must be 255 or less',
                                                isAnInteger: 'Must be integer'
                                            }}
                                        />
                                    </Col>
                                </Row>

                                <Row className="form-group">
                                    <Label htmlFor="opacityValue" xs={2}>Opacity</Label>
                                    <Col xs={3} sm={2}>
                                        <Control.text model=".opacityValue" id="opacityValue" name="opacityValue"
                                            placeholder="100"
                                            className="form-control"
                                            validators={{
                                                required,
                                                isNonNegative,
                                                isInPercentage
                                            }}
                                            onChange={this.disableShow}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".opacityValue"
                                            show="touched"
                                            component="div"
                                            messages={{
                                                required: 'Required',
                                                isNonNegative: 'Must not be negative number',
                                                isInPercentage: 'Must be in % (100 or less)'
                                            }}
                                        />
                                    </Col>

                                    <Col xs={{size: 4, offset: 3}}>
                                        <Button type="submit" color="secondary">
                                            Analyze
                                        </Button>
                                    </Col>
                                </Row>
                            </LocalForm>
                        </div>
                    </div>
                </div>
            
                <div className="container">
                <div className="row">
                <div className="col-12">
                    <div id="analysisDiv" style={styleAnalysisDiv}></div>
                    <div id="complementClrHeader">
                        <h5><strong>Complement Color</strong></h5>
                        <p></p>
                    </div>
                    <div id="complementDiv" style={styleComplementDiv}></div>
                    <div id="acousticInputsHeader">
                        <h5><strong>Acoustic Designation (Input)</strong></h5>
                        <p></p>
                    </div>
                    <div className="group" id="acousticInputsDiv">
                    <LocalForm onSubmit={values => this.handleAcousticSubmit(values)}>
                        <Row className="form-group">
                            <Label htmlFor="acousticNote" className="pl-3" xs={3}>Note</Label>
                            <Col xs={9}>
                                <Control.select 
                                    model=".acousticNote" 
                                    name="acousticNote"
                                    className="form-control">
                                    <option>Select...</option>
                                    <option>C</option>
                                    <option>C#</option>
                                    <option>D</option>
                                    <option>D#</option>
                                    <option>E</option>
                                    <option>F</option>
                                    <option>F#</option>
                                    <option>G</option>
                                    <option>G#</option>
                                    <option>A</option>
                                    <option>A#</option>
                                    <option>B</option>
                                </Control.select>
                            </Col>

                            <Label htmlFor="acousticOctave" className="pl-3" xs={3}>Octave</Label>
                            <Col xs={9}>
                                <Control.select 
                                    model=".acousticOctave" 
                                    name="acousticOctave"
                                    className="form-control">
                                    <option>Select...</option>
                                    <option>0</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>8</option>
                                    <option>9</option>
                                    <option>10</option>
                                </Control.select>
                            </Col>
                        </Row>
                        <Col xs={{size: 4, offset: 0}}>
                            <Button type="submit" color="secondary">
                                Transform
                            </Button>
                        </Col>
                    </LocalForm>
                    </div>
                    <div id="acousticOutputsHeader">
                        <h5><strong>Acoustic Properties (Output)</strong></h5>
                        <p></p>
                    </div>
                    <Row className="form-group">
                        <Col className="ml-0" xs={{size: 6, offset: 0}}>
                            <label htmlFor="acousticFrequency" id="acousticFreqLbl">Frequency (Hz)</label>

                            <input type="text" name="frequency" id="acousticFrequency" value={acousticFreq} size="4"></input>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Col className="ml-0" xs={{size: 2, offset: 0}}>
                            <label htmlFor="acousticColor" id="acousticColorLbl">Color</label>

                            <input type="text" name="color" id="acousticColor" value={acousticHexCol} style={acousticStyleColor} size="6"></input>
                        </Col>
                    </Row>

                    <div id="colorSpacerDiv"></div>
                    
                </div>
                </div>
                </div>

            </React.Fragment>
        );
    }
}

function acFrequency(mNote, mOctave) {
    const numNotes = stepsFromNoteA(mNote);
    if (numNotes <= -10) {
        return 0;
    }
    const multNotes = Math.pow(2.0, (numNotes/ 12.0) );    

    const numOctaves = stepsFromOctave4(mOctave);
    if (numOctaves <= -5) {
        return 0;
    }
    const multOctaves = Math.pow(2.0, numOctaves);    

    return (440 * multNotes * multOctaves);
}

function stepsFromOctave4(mOctave) {
    if (mOctave === "0") {
        return -4;
    }
    else if (mOctave === "1") {
        return -3;
    }
    else if (mOctave === "2") {
        return -2;
    }
    else if (mOctave === "3") {
        return -1;
    }
    else if (mOctave === "4") {
        return 0;
    }
    else if (mOctave === "5") {
        return 1;
    }
    else if (mOctave === "6") {
        return 2;
    }
    else if (mOctave === "7") {
        return 3;
    }
    else if (mOctave === "8") {
        return 4;
    }
    else if (mOctave === "9") {
        return 5;
    }
    else if (mOctave === "10") {
        return 6;
    }
    return -5;
}

function stepsFromNoteA(mNote) {
    if (mNote === "C") {
        return -9;
    }
    else if (mNote === "C#") {
        return -8;
    }
    else if (mNote === "D") {
        return -7;
    }
    else if (mNote === "D#") {
        return -6;
    }
    else if (mNote === "E") {
        return -5;
    }
    else if (mNote === "F") {
        return -4;
    }
    else if (mNote === "F#") {
        return -3;
    }
    else if (mNote === "G") {
        return -2;
    }
    else if (mNote === "G#") {
        return -1;
    }
    else if (mNote === "A") {
        return 0;
    }
    else if (mNote === "A#") {
        return 1;
    }
    else if (mNote === "B") {
        return 2;
    }
    return -10;
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

function coRgbaColor(redV, greenV, blueV, opacityV) {
    const opVal = (opacityV / 100.0);
    const coRedV = 255 - redV;
    const coGreenV = 255 - greenV;
    const coBlueV = 255 - blueV;
    const coRgbaStr = `rgba(${coRedV}, ${coGreenV}, ${coBlueV}, ${opVal})`;
    return coRgbaStr;
}

function hexDictionary(lessThan16) {
    const dict = {0:"0", 1:"1", 2:"2", 3:"3", 4:"4", 5:"5", 6:"6", 7:"7", 8:"8", 9:"9", 10:"A", 11:"B", 12:"C", 13:"D", 14:"E", 15:"F"};
    return dict[lessThan16];
}

function hexVal(decNum) {
    const intNum = Math.round(decNum);
    const decNum2 = (intNum % 16);
    const decNum1 = Math.floor(intNum/16);
    const hexStr2 = hexDictionary(decNum2);
    const hexStr1 = hexDictionary(decNum1);
    const d2HexStr = `${hexStr1}${hexStr2}`;
    return d2HexStr;
}

function hexaDecimalValue(redPt, greenPt, bluePt) {
    let redStr = hexVal(redPt);
    let greenStr = hexVal(greenPt);
    let blueStr = hexVal(bluePt);
    const hexString = `${redStr}${greenStr}${blueStr}`;
    return hexString;
}

export default Colors;

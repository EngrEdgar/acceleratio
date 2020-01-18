import React, { Component } from 'react';
import { Button, Label, Col, Row } from 'reactstrap';
import { Control, LocalForm } from 'react-redux-form';

class Acoustics extends Component {

    constructor(props) {
        super(props);

        this.state = {
            acousticNote: '',
            acousticOctave: ''
        };

        this.handleAcousticSubmit = this.handleAcousticSubmit.bind(this);
    }

    handleAcousticSubmit(acousticValues) {
        //console.log("acousticValues is: " + JSON.stringify(acousticValues));
        //alert("acousticValues is: " + JSON.stringify(acousticValues));
        this.setState({acousticNote: acousticValues.acousticNote});
        this.setState({acousticOctave: acousticValues.acousticOctave});
        //console.log(this.state);
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

        return (
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div id="acousticsHeader">
                                <h3>
                                    <strong>
                                        Acoustics
                                    </strong>
                                </h3>
                            </div>
                            <div id="acousticInputsHeader">
                                <h5>
                                    <strong>
                                        Acoustic Designation (Input)
                                    </strong>
                                </h5>
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

export default Acoustics;

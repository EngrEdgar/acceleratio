import React from 'react';
import { Link } from 'react-router-dom';

function Guide(props) {
    return (
        <div className="container">
            <div className="row row-content">
                <div className="col-12">
                    <h3 align="center">
                        <strong>
                            User's Guide
                        </strong>
                    </h3>
                    <p></p>
                    <p>
                        This page provides guidance on available functionalities in the <Link to={`/spectrum`}>Spectrum</Link> and <Link to={`/oscillator`}>Oscillator</Link> tabs.
                    </p>
                </div>
            </div>
            <div className="row row-content">    
                <div className="col-sm-12">
                    <h4 align="center">
                        <strong>
                            Color Spectrum
                        </strong>
                    </h4>
                </div>
                <div className="col-sm-12">
                    <p></p>
                    <p>
                        This section uses the RGBA (Red-Green-Blue-Alpha) and Hexadecimal notations to designate or describe any resultant color within the available color spectrum. The application shows both the specified analysis color and its complement at any given time. Click on the “Show Spectrum” button to display continuously changing colors as values are traced along the edge of the RGB cube. 
                    </p>
                    <img src="/assets/images/ShowSpectrum.png" height="12%" alt="Show Spectrum" /> 
                    <br></br><br></br>
                    <p>
                        The two output data fields to the right show the hexadecimal values of the analysis and complement colors; background colors reflect the actual colors on display at any given time. To specify or to see a resultant analysis color, enter corresponding values into each of the four input fields: "Red";"Green"; "Blue"; and "Opacity". It is thus possible to enter any one color from 16,777,216 possibilities at a given opacity (i.e., alpha). Click on the “Analyze” button to display the analysis color, the complement color, and their corresponding hexadecimal values.
                    </p>
                    <img src="/assets/images/Analyze.png" height="18%" alt="Analyze" />
                </div>
            </div>
            <div className="row row-content">    
                <div className="col-sm-12">
                    <h4 align="center">
                        <strong>
                            Acoustics
                        </strong>
                    </h4>
                </div>
                <div className="col-sm-12">
                    <p></p>
                    <p>
                        The "Acoustics" section is a related but distinct application from the "Color Spectrum" applicaiton. Using the respective selection menus, enter the "Note" and "Octave" input data. Then, click on the “Transform” button to show the <a href="https://www.flutopedia.com/sound_color.htm" target="_blank">acoustic properties</a> (i.e., oscillation frequency and acoustic color) corresponding to user-entered acoustic designation.
                    </p>
                    <img src="/assets/images/AcousticInput.png" height="35%" alt="AcousticInput" />
                    <br></br><br></br>
                    <p>
                        This transformation is the inverse process of determining the acoustic designation from calculated oscillation frequencies in the spring-mass system. The transformation uses the <a href="https://ptolemy.berkeley.edu/eecs20/week8/scale.html" target="_blank">A440 standard</a>.
                    </p>
                </div>
            </div>
            <div className="row row-content">     
                <div className="col-sm-12">
                    <h4 align="center">
                        <strong>
                            Oscillator Model
                        </strong>
                    </h4>
                </div>                
                <div className="col-sm-12">
                    <p></p>
                    <p>
                        To simulate the behavior of the equivalent spring-mass system, enter values for the mass, damping coefficient, spring constant, and time span before the start of simulation. Click on the “Up” (or "Down") button to specify a starting displacement above (or below) the equilibrium position. Here, the equilibrium position takes into account the weight of the mass. The "Start" button starts the simulation; the "Stop" button resets it.
                    </p>    
                    <img src="/assets/images/OscillatorModel.png" height="23%" alt="Oscillator Model Input" />
                    <br></br><br></br>
                    <p>
                        The simulated mass moves inside the gray area. The application (a) generates a time plot of the vertical displacement as the mass moves, (b) shows the total time elapsed – from the “release” of the mass from its displaced position, (c) solves the differential equations in real-time, and (d) fully reflects pre-simulation changes in input data – as entered by the user.
                    </p>
                    <p>
                        The display fields (i.e., "Hertz", "Note" and "Octave") indicate acoustic properties and designation corresponding to the user-entered input values for the mass, damping, and spring constant. For any given set of input values, the background color for the display fields (and for the spring and mass graphical representations) adjusts to correspond to the <a href="https://www.flutopedia.com/sound_color.htm" target="_blank">acoustic color of the oscillation frequency</a>.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Guide;

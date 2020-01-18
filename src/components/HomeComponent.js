import React from 'react';
import { Card, CardBody } from 'reactstrap';

function Home(props) {
    return (
        <div className="container">
            <div className="row row-content">
                <div className="col-12">
                    <h3 align="center">
                        <strong>
                            System Analysis
                        </strong>
                    </h3>
                    <p></p>
                    <p>
                        These applications serve as toolkits for professionals involved in the manufacture of products requiring serious consideration of visual and audio elements.
                    </p>
                </div>
            </div>
            <div className="row row-content">    
                <div className="col-sm-12">
                    <h4 align="center">
                        <strong>
                            Color Spectrum and Acoustics
                        </strong>
                    </h4>
                    <Card className="bg-light mt-4">
                        <CardBody>
                            <blockquote className="blockquote" >
                                <p className="mb-1">
                                    <em>
                                        "Now we see only reflections in a mirror, mere riddles, but then we shall be seeing face to face. Now I can know only imperfectly; but then I shall know ... fully ...."
                                    </em>
                                    <span> - 1 Corinthians 13:12
                                    </span>
                                </p>
                            </blockquote>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-sm-12">
                    <p></p>
                    <p>
                        Analysis shows both the analysis color and its complement at any given time. The “Show Spectrum” button displays continuously changing colors as values are traced along the edge of the RGB cube. The two output data fields to the right show the hexadecimal values of the analysis and complement colors; background colors reflect the actual colors on display at any given time. Three input fields allow the user to enter any color value described using the RGBA notation. The user may enter any one color from 16,777,216 possibilities; user may also specify the opacity. The “Analyze” button to the right will display the analysis color, the complement color, and their hexadecimal values.
                    </p>
                    <p>
                        The “Transform” button shows the acoustic properties of oscillation frequency and acoustic color corresponding to user-entered acoustic designation. This transformation is the inverse process of determining the acoustic designation from calculated oscillation frequencies in the spring-mass system.
                    </p>
                </div>
            </div>
            <div className="row row-content">     
                <div className="col-sm-12">
                    <h4 align="center">
                        <strong>
                            Oscillator Model and Acoustics
                        </strong>
                    </h4>
                    <Card className="bg-light mt-4">
                        <CardBody>
                            <blockquote className="blockquote">
                                <p className="mb-0">
                                    <em>
                                        "To every action there is always opposed an equal reaction. . . . An object in motion tends to remain in motion along a straight line unless acted upon by an outside force."
                                    </em>
                                    <span> - Isaac Newton</span>
                                </p>
                            </blockquote>
                        </CardBody>
                    </Card>
                </div>                
                <div className="col-sm-12">
                    <p></p>
                    <p>
                        The oscillator model utilizes the equivalent mass, damping coefficient, and spring constant to represent the actual behavior of physical systems which can be described, at a certain level, by these elements. This representation applies more accurately to analog systems. In the case of electronic systems, the equivalent parameter values can be derived.
                    </p>
                    <p>
                        The user enters values for the mass, damping coefficient, spring constant, and time span before the start of simulation.  The “Move Up” and “Move Down” buttons allow the user to specify the starting displacement of the mass from its equilibrium position – which already takes into account its weight. The other two simulation buttons (i.e., "Start" and "Stop") allow the user to either start or reset the simulation. The gray area shows the movement of the simulated mass. A time plot of the vertical displacement is generated. The total time elapsed – from the “release” of the mass from its displaced position – is also shown. From the user’s perspective, differential equations are solved in real-time. Pre-simulation changes in input data – as entered by the user – are fully reflected in the shape of the time plot.
                    </p>
                    <p>
                        The display fields (i.e., "Hertz", "Note" and "Octave") indicate acoustic properties and designation corresponding to the user-entered input values for the mass, damping, and spring constant. For any given set of input values, the colors for the background of the display fields and for the mass and spring correspond to the acoustic color of the oscillation frequency.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Home;   

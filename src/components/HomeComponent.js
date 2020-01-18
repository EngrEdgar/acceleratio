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
                        Audible sound is a succession of individual or combined pitches (i.e., notes at specified registers) of the same or different intensities.
                    </p>
                    <p>
                        Experiential data has been collected on the relationship between sound pitch class and color. This correlation – more than merely coincidental – uses data from human experience. This set of data allows the experience and conceptualization of a sound pitch in terms of its associated color.
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
                        The oscillator model utilizes the equivalent mass, damping coefficient, and spring constant to represent the actual behavior of physical systems which can be described, at a certain level, by these elements. This representation applies more accurately to analog systems. In the case of electronic or other mechanical or structural systems, the equivalent parameter values can be derived.
                    </p>
                    <p>
                        The oscillator model solves a second order linear differential equation to calculate the resultant frequency of oscillation. Damping causes an exponential decay. The resultant time displacement is directly proportional to the initial displacement imparted to the variable of interest. In a practical system where an undamped time displacement may not be perfectly sinusoidal, the calculated oscillation frequency corresponds to the fundamental frequency in a Fourier Series expansion.
                    </p>
                </div>
            </div>
            <div className="row row-content">     
                <div className="col-sm-12">
                    <h4 align="center">
                        <strong>
                            Areas of Application
                        </strong>
                    </h4>
                    <Card className="bg-light mt-4">
                        <CardBody>
                            <blockquote className="blockquote">
                                <p className="mb-0">
                                    <em>
                                        "The relative attractiveness of options varies when the same problem is framed in different ways."
                                    </em>
                                    <span> - Kahneman and Tversky</span>
                                </p>
                            </blockquote>
                        </CardBody>
                    </Card>
                </div>                
                <div className="col-sm-12">
                    <p></p>
                    <p>
                        The set of analyses presented here correspond to basic steps in several areas of application including acoustics, design of musical instruments, analysis of mechanical and structural systems, and modulation of very high frequency signals using sound. In any area of application, as mentioned above, the analogous or equivalent parameters can be derived. The basic application can then be extended for more in-depth analysis or design.
                    </p>
                </div>
            </div>
            <div className="row row-content">     
                <div className="col-sm-12">
                    <h4 align="center">
                        <strong>
                            User's Guide
                        </strong>
                    </h4>
                    <Card className="bg-light mt-4">
                        <CardBody>
                            <blockquote className="blockquote">
                                <p className="mb-0">
                                    <em>
                                        "The customer has always driven the business model."
                                    </em>
                                    <span> - Amancio Ortega</span>
                                </p>
                            </blockquote>
                        </CardBody>
                    </Card>
                </div>                
                <div className="col-sm-12">
                    <p></p>
                    <p>
                        Click on the Guide tab to get to the User’s Guide.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Home;   

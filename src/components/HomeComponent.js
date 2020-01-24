import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';

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
                        These basic applications serve as aids for users involved in the analysis or design of products requiring consideration of visual and audio elements.
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
                        Audible <a href="https://www.fceia.unr.edu.ar/acustica/comite/soundbas.htm" target="_blank">sound</a> is a succession of individual or combined <a href="http://openmusictheory.com/pitches.html" target="_blank">pitches</a> (i.e., notes at specified registers) of the same or different intensities.
                    </p>
                    <p>
                        Experiential data<sup>1</sup> has been collected on the relationship between sound pitch class and color. This correlation – more than merely coincidental – uses data from human experience. This set of data allows the experience and conceptualization of a sound pitch in terms of its <a href="https://www.flutopedia.com/sound_color.htm" target="_blank">associated color</a>.
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
                        The oscillator model<sup>2</sup> utilizes the equivalent mass, damping coefficient, and spring constant to represent the actual behavior of physical systems which can be described, at a certain level, by these elements. This representation applies more accurately to analog systems. With respect to other fields of application and in the case of electronic or other mechanical or structural systems, the equivalent parameter values can be derived.
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
                                    <span> - Kahneman and Tversky (The Framing of Decisions and the Psychology of Choice, 1981)</span>
                                </p>
                            </blockquote>
                        </CardBody>
                    </Card>
                </div>                
                <div className="col-sm-12">
                    <p></p>
                    <p>
                        The set of analyses presented here correspond to basic steps in several areas of application including <a href="https://acousticalsociety.org/" target="_blank">acoustics</a>, design of <a href="https://exploresound.org/2017/02/physics-stringed-instruments/" target="_blank">musical instruments</a>, analysis of mechanical and <a href="http://www.civil.uwaterloo.ca/Xie/Graphics/XIE_Differential%20Equations%20for%20Engineers_Excerpt.pdf" target="_blank">structural systems</a>, and <a href="https://www.sciencedaily.com/releases/2019/09/190916081442.htm" target="_blank">selective processing</a> in silicon chips using sound waves. In any area of application, as mentioned above, the analogous or equivalent parameters can be derived. The basic application can then be extended for more in-depth analysis or design.
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
                                    <span> - Amancio Ortega (Inditex Annual Report, 2009)</span>
                                </p>
                            </blockquote>
                        </CardBody>
                    </Card>
                </div>                
                <div className="col-sm-12">
                    <p></p>
                    <p>
                        Click on the <Link to={`/guide`}>Guide</Link> tab to get to the User’s Guide.
                    </p>
                </div>
            </div>
            <div className="row row-content">     
                <div className="col-sm-12">
                    <h4 align="center">
                        <strong>
                            Bibliography
                        </strong>
                    </h4>
                    <Card className="bg-light mt-4">
                        <CardBody>
                            <blockquote className="blockquote">
                                <p className="mb-0">
                                    <em>
                                        "In addition to the hyperlinked sources, the following reference materials were also sourced for this website."
                                    </em>
                                    <span> - Acceleratio</span>
                                </p>
                            </blockquote>
                        </CardBody>
                    </Card>
                </div>                
                <div className="col-sm-12">
                    <p></p>
                    <ol>
                        <li>
                            Flynn, E.N. (2014). <i>Liberation of the Senses: An Exploration of Sound-Color Synesthesia in the Music of Alexander Scriabin and Olivier Messiaen</i> (Masteral Thesis). Retrieved from https://kuscholarworks.ku.edu/handle/1808/18408.
                        </li>
                        <li>
                            Rossing, T.D., editor. <i>The Science of String Instruments.</i> Stanford University, 2010. Retrieved from https://logosfoundation.org/kursus/The%20Science%20of%20String%20Instruments.pdf.
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    );
}

export default Home;   

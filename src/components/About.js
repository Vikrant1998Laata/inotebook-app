import React, {useContext, useEffect} from 'react';
import noteContext from '../context/notes/noteContext';

const About = () => {
  const a = useContext(noteContext);

  return (
    <div>
      {/* This is about {a.state.name} and he is in class {a.state.class} */}
      <h1>this about js</h1>
    </div>
  )
}

export default About
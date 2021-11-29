import './App.css';
import React,{useState,useEffect} from "react"
import periodic from "./molar.json"

const MoleculeWrapper = () => {
  const dot = (a, b) => a.map((x, i) => a[i] * b[i]).reduce((m, n) => m + n);
  let [count,setCount] = useState(0);
  const atomicWeight = periodic.reduce((acc, cur) => ({ ...acc, [cur.Symbol]: cur.AtomicMass }), {})
  const CalculateMolarMass = (molState) => {
      let moleculeArray = molState.match( /[A-Z]?[a-z]+|[0-9]+|[A-Z]/g);
      let molarMass = 0
      if (moleculeArray !== null) {
        for (let i = 0; i < (moleculeArray.length); i++){
          if (!isNaN(moleculeArray[i]))
            {continue;}
          if (isNaN(moleculeArray[i+1])){
              molarMass += atomicWeight[moleculeArray[i]];
          }
          if(!isNaN(moleculeArray[i+1])){
            molarMass += atomicWeight[moleculeArray[i]]*moleculeArray[i+1];
          }
        }
      }
      return(
        molarMass
      );
  }
  const Molecule = (props) => {
    const [moleculeState, setMoleculeState] = useState("0");

    const [clickState,setClickState] = useState(false);
    const HandleClick = () => {
      setClickState(!clickState);
      count = count + 1
    }
    const handleChange = (event) => {
      setMoleculeState(event.target.value);
    }

    return(
      <>
      <form className="inputForm">
      <p>Enter chemical formula:</p>
          <label>
          <input type="text"
              onChange={event => {setMoleculeState(event.target.value);
            }
            }
            />
          </label>
      </form>
      <div>{CalculateMolarMass(moleculeState)}</div>
      <button onClick = {HandleClick} > Add new</button>
      {clickState ?
      <div>
        <Molecule />
      </div>
      : null}
      </>
    )
  }


  return(<>
    <Molecule />
    </>
  )
}



function App() {
  return(
    <div className="App">
       <MoleculeWrapper />
    </div>
  )
}

export default App;

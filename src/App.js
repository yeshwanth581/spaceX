import { useState } from "react";
import "./styles.css";
import LandingPage from "./LandingPage";
import DragonInfo from "./DragonInfo";
import ImageContainer from "./ImageContainer";

export default function App() {
const [dragonSelected, setDragonSelected] = useState(null);

/**
 * Sets the seleted dragon to the state
 * @param {object} dragon Dragon selected by user in landing page 
 * @returns 
 */
const changeDragonSelected = dragon => setDragonSelected(dragon);

  // toggling Dragon page and info based on dragon name selected
  return (
    <div className="App">
      <LandingPage changeDragonSelected={changeDragonSelected}/>
      {
        dragonSelected ? (<>
          <DragonInfo dragon={dragonSelected}/>
          <ImageContainer images={dragonSelected.flickr_images}/>
        </>) : null
      }
    </div>
  );
}

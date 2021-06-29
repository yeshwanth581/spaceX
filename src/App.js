import { useState } from "react";
import "./styles.css";
import LandingPage from "./LandingPage";
import DragonInfo from "./DragonInfo";
import ImageContainer from "./ImageContainer";

export default function App() {
const [dragonSelected, setDragonSelected] = useState(null);
const changeDragonSelected = dragon => setDragonSelected(dragon);

  return (
    <div className="App">
      <LandingPage changeDragonSelected={changeDragonSelected}/>
      {dragonSelected ? <DragonInfo dragon={dragonSelected}/> : null}
      {dragonSelected ? <ImageContainer images={dragonSelected.flickr_images}/>  : null}
    </div>
  );
}

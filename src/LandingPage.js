import { useEffect, useState } from "react";
import axios from "axios";

const config = {
    method: 'get',
    url: 'https://api.spacexdata.com/v4/dragons',
    headers: {}
  };
  
export default function LandingPage({changeDragonSelected}) {
    const [dragonsList, setDragonsList] = useState([]);
    const [error, setError] = useState(null);

    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        async function fetchMyAPI() {
            try {
                let response = await axios(config);
                setDragonsList(response.data);
                setError(null);
                setIsLoading(false);
            } catch (error) {
                setDragonsList([]);
                setError(error);
                setIsLoading(false);
            }
        }

        fetchMyAPI()
    }, []);

    return (
        <>
        <div className="landing">
        <div className="heading">
          <div className="name"  data-testid="app-name">SPACE-X</div>
        </div>
        <div className="dragons-container">
          <div className="content">
            <h1 className="name"  data-testid="module-name">DRAGON</h1>
            <b>Dragon is a reusable spacecraft developed by SpaceX, an American private space transportation company based in Hawthorne, California. Dragon is launched into space by the SpaceX Falcon 9 two-stage-to-orbit launch vehicle. The Dragon spacecraft was originally designed for human travel, but so far has only been used to deliver cargo to the International Space Station (ISS)</b>
          </div>
          <div className="dragons">
              {isLoading ? <span>Loading...</span> : null}
              {(dragonsList.length) ? dragonsList.map(dragon => <a  a href="#dragon-info-section" data-testid={dragon.name} onClick={() => changeDragonSelected(dragon)} key={dragon.name} className="button">{dragon.name}</a>) : null}
              {error ? <span>Something went wrong while fetching dragons list</span> : null}
          </div>
        </div>
      </div>
        </>
    )
}
import { useEffect, useState } from "react";
const specifications = ['OVERVIEW', 'HEAT SHEILD', 'TRUNK', 'THRUSTERS']; // categories

export default function DragonInfo({dragon}) {
    const [activeSpec, setActiveSpec] = useState('OVERVIEW');
    const [specInfo, setSpecInfo] = useState(null);

    useEffect(() => {
        /**
         * constructs the object by specification categories based on dragon selected
         */
        const contructSpecPayload = () => {
            if(dragon){
            let dragonSpecInfo = {
                'OVERVIEW': {} ,'HEAT SHEILD': {}, 'TRUNK': {}, 'THRUSTERS': {}
            };
            dragonSpecInfo['OVERVIEW']['LAUNCH MASS'] = dragon.launch_payload_mass['kg'] + "kg / " + dragon.launch_payload_mass['lb'] + 'lb';
            dragonSpecInfo['OVERVIEW']['LAUNCH VOL'] = dragon.launch_payload_vol['cubic_meters'] + "m3 / " + dragon.launch_payload_vol['cubic_feet'] + 'ft3'
            dragonSpecInfo['OVERVIEW']['RETURN MASS'] = dragon.return_payload_mass['kg'] + "kg / " + dragon.return_payload_mass['lb'] + 'lb'
            dragonSpecInfo['OVERVIEW']['RETURN VOL'] = dragon.return_payload_vol['cubic_meters'] + "m3 / " + dragon.return_payload_vol['cubic_feet'] + 'ft3'
            dragonSpecInfo['OVERVIEW']['DRY MASS'] = dragon.dry_mass_kg+"kg / " + dragon.dry_mass_lb+"lb";
            dragonSpecInfo['OVERVIEW']['PRESSURISED CAPSULE'] = dragon.pressurized_capsule.payload_volume['cubic_meters'] + "mt3 / " + dragon.pressurized_capsule.payload_volume['cubic_feet'] + 'ft3';
            dragonSpecInfo['OVERVIEW']['DIAMETER'] = dragon.diameter['meters'] + "mts / " + dragon.diameter['feet'] + 'ft';
            dragonSpecInfo['OVERVIEW']['CREW CAPACITY'] = dragon.crew_capacity;
    
            dragonSpecInfo['TRUNK']['VOLUME'] = dragon.trunk.trunk_volume['cubic_meters'] + "m3 / " + dragon.trunk.trunk_volume['cubic_feet'] + 'ft3';
            dragonSpecInfo['TRUNK']['HEIGHT'] = dragon.height_w_trunk['meters'] + "mts / " + dragon.height_w_trunk['feet'] + 'ft'
            
            dragonSpecInfo['HEAT SHEILD']['MATERIAL'] = dragon.heat_shield.material;
            dragonSpecInfo['HEAT SHEILD']['SIZE'] = dragon.heat_shield.size_meters;
            dragonSpecInfo['HEAT SHEILD']['TEMP'] = dragon.heat_shield.temp_degrees+"dgs";
            dragonSpecInfo['HEAT SHEILD']['PARTNER'] = dragon.heat_shield.dev_partner;
    
            dragonSpecInfo['THRUSTERS'] = {};
            dragon.thrusters.forEach((th, idx) => {
    
                dragonSpecInfo['THRUSTERS'][ 'TYPE - '+(idx+1)] = th.type;
                dragonSpecInfo['THRUSTERS'][ 'AMOUNT - '+(idx+1)] = th.amount;
                dragonSpecInfo['THRUSTERS'][ 'PODS - '+(idx+1)] = th.pods;
                dragonSpecInfo['THRUSTERS'][ 'THRUST - '+(idx+1)] = th.thrust['kN'] + 'kn / '+ th.thrust['lbf'];
            })
    
            dragonSpecInfo['images'] = dragon.flickr_images;
    
            setSpecInfo(dragonSpecInfo);
            } else {
                setSpecInfo(null)
            }
        }
        contructSpecPayload();
    }, [dragon])

    /**
     *  renders specification category tabs with active/in-active class status
     */
    const renderSpecList = () => {
        return specifications.map(i => {
            return <div data-testid={i} onClick={() => setActiveSpec(i)} className={(i===activeSpec) ? 'spec-name active' : 'spec-name'}>{i}</div>
        })
    }

    /**
     * renders table info dynamically based on specification type selected from constructed spec info
     */
    const renderSpecTable = () => {
        return Object.keys(specInfo[activeSpec]).map(i => {
            return (
                <div className="info-row" data-testid={i}>
                    <div className="key"><b>{i}</b></div>
                    <div className="value">{specInfo[activeSpec][i]}</div>
                </div>
            )
        })
    }

  return (
      <div className="dragon-info" id="dragon-info-section" data-testid="dragon-info">
          <div className="dragon-info-container">
              <div className="dragon-name">
                  <h1 data-testid="dragon-name" className="name">{dragon ? dragon.name.toUpperCase() : null}</h1>
              </div>
              <div className="specs">
                  <div className="specifications-list">
                      {renderSpecList()}
                  </div>
                  <div className="spec-table">
                      {(specInfo && dragon) ? renderSpecTable() : null}
                  </div>
              </div>
          </div>
      </div>
  );
}

import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import App from '../App'
import LandingPage from '../LandingPage'
import DragonInfo from '../DragonInfo'
import ImageContainer from '../ImageContainer'

const server = setupServer(
    rest.get('https://api.spacexdata.com/v4/dragons', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(
                [{ "heat_shield": { "material": "PICA-X", "size_meters": 3.6, "temp_degrees": 3000, "dev_partner": "NASA" }, "launch_payload_mass": { "kg": 6000, "lb": 13228 }, "launch_payload_vol": { "cubic_meters": 25, "cubic_feet": 883 }, "return_payload_mass": { "kg": 3000, "lb": 6614 }, "return_payload_vol": { "cubic_meters": 11, "cubic_feet": 388 }, "pressurized_capsule": { "payload_volume": { "cubic_meters": 11, "cubic_feet": 388 } }, "trunk": { "trunk_volume": { "cubic_meters": 14, "cubic_feet": 494 }, "cargo": { "solar_array": 2, "unpressurized_cargo": true } }, "height_w_trunk": { "meters": 7.2, "feet": 23.6 }, "diameter": { "meters": 3.7, "feet": 12 }, "first_flight": "2010-12-08", "flickr_images": ["https://i.imgur.com/9fWdwNv.jpg", "https://live.staticflickr.com/8578/16655995541_7817565ea9_k.jpg", "https://farm3.staticflickr.com/2815/32761844973_4b55b27d3c_b.jpg", "https://farm9.staticflickr.com/8618/16649075267_d18cbb4342_b.jpg"], "name": "Dragon 1", "type": "capsule", "active": true, "crew_capacity": 0, "sidewall_angle_deg": 15, "orbit_duration_yr": 2, "dry_mass_kg": 4200, "dry_mass_lb": 9300, "thrusters": [{ "type": "Draco", "amount": 18, "pods": 4, "fuel_1": "nitrogen tetroxide", "fuel_2": "monomethylhydrazine", "isp": 300, "thrust": { "kN": 0.4, "lbf": 90 } }], "wikipedia": "https://en.wikipedia.org/wiki/SpaceX_Dragon", "description": "Dragon is a reusable spacecraft developed by SpaceX, an American private space transportation company based in Hawthorne, California. Dragon is launched into space by the SpaceX Falcon 9 two-stage-to-orbit launch vehicle. The Dragon spacecraft was originally designed for human travel, but so far has only been used to deliver cargo to the International Space Station (ISS).", "id": "5e9d058759b1ff74a7ad5f8f" }, { "heat_shield": { "material": "PICA-X", "size_meters": 3.6, "temp_degrees": 3000, "dev_partner": "NASA" }, "launch_payload_mass": { "kg": 6000, "lb": 13228 }, "launch_payload_vol": { "cubic_meters": 25, "cubic_feet": 883 }, "return_payload_mass": { "kg": 3000, "lb": 6614 }, "return_payload_vol": { "cubic_meters": 11, "cubic_feet": 388 }, "pressurized_capsule": { "payload_volume": { "cubic_meters": 11, "cubic_feet": 388 } }, "trunk": { "trunk_volume": { "cubic_meters": 14, "cubic_feet": 494 }, "cargo": { "solar_array": 2, "unpressurized_cargo": true } }, "height_w_trunk": { "meters": 7.2, "feet": 23.6 }, "diameter": { "meters": 3.7, "feet": 12 }, "first_flight": "2019-03-02", "flickr_images": ["https://farm8.staticflickr.com/7647/16581815487_6d56cb32e1_b.jpg", "https://farm1.staticflickr.com/780/21119686299_c88f63e350_b.jpg", "https://farm9.staticflickr.com/8588/16661791299_a236e2f5dc_b.jpg"], "name": "Dragon 2", "type": "capsule", "active": true, "crew_capacity": 7, "sidewall_angle_deg": 15, "orbit_duration_yr": 2, "dry_mass_kg": 6350, "dry_mass_lb": 14000, "thrusters": [{ "type": "Draco", "amount": 18, "pods": 4, "fuel_1": "nitrogen tetroxide", "fuel_2": "monomethylhydrazine", "isp": 300, "thrust": { "kN": 0.4, "lbf": 90 } }, { "type": "SuperDraco", "amount": 8, "pods": 4, "fuel_1": "dinitrogen tetroxide", "fuel_2": "monomethylhydrazine", "isp": 235, "thrust": { "kN": 71, "lbf": 16000 } }], "wikipedia": "https://en.wikipedia.org/wiki/Dragon_2", "description": "Dragon 2 (also Crew Dragon, Dragon V2, or formerly DragonRider) is the second version of the SpaceX Dragon spacecraft, which will be a human-rated vehicle. It includes a set of four side-mounted thruster pods with two SuperDraco engines each, which can serve as a launch escape system or launch abort system (LAS). In addition, it has much larger windows, new flight computers and avionics, and redesigned solar arrays, and a modified outer mold line from the initial cargo Dragon that has been flying for several years.", "id": "5e9d058859b1ffd8e2ad5f90" }]
            )
        )
    })
)

describe('Should test Landing Component', () => {
    beforeAll(() => {
        server.listen();
        render(<LandingPage />)
    });
    afterEach(() => server.resetHandlers())
    afterAll(() => server.close())

    test('loads and displays list of dragons', () => {
        const appNameElement = screen.getByTestId('app-name');
        expect(appNameElement).toBeInTheDocument();

        const moduleNameElement = screen.getByTestId('module-name');
        expect(moduleNameElement).toBeInTheDocument();

        const moduleText = screen.getByText('DRAGON');
        expect(moduleText).toContainHTML(`<h1 class="name" data-testid="module-name">DRAGON</h1>`);

        expect(screen.getByText('Loading...')).toBeInTheDocument();
    })

    test('loads and displays dragons button list', async () => {
        render(<LandingPage />)
        await waitFor(() => screen.getByTestId('Dragon 1'))

        expect(screen.getByTestId('Dragon 1')).toBeInTheDocument()
    })

    test('shows error message when API call fails', async () => {
        server.use(
            rest.get('https://api.spacexdata.com/v4/dragons', (req, res, ctx) => res(ctx.status(500)).json("INTERNAL SERVER ERROR"))
        )
        render(<LandingPage />)
        await waitFor(() => screen.getByText('Something went wrong while fetching dragons list'))

        expect(screen.getByText('Something went wrong while fetching dragons list')).toBeInTheDocument()
    })
})

describe('Should test DragonInfo Component', () => {
    const dragonData = { "heat_shield": { "material": "PICA-X", "size_meters": 3.6, "temp_degrees": 3000, "dev_partner": "NASA" }, "launch_payload_mass": { "kg": 6000, "lb": 13228 }, "launch_payload_vol": { "cubic_meters": 25, "cubic_feet": 883 }, "return_payload_mass": { "kg": 3000, "lb": 6614 }, "return_payload_vol": { "cubic_meters": 11, "cubic_feet": 388 }, "pressurized_capsule": { "payload_volume": { "cubic_meters": 11, "cubic_feet": 388 } }, "trunk": { "trunk_volume": { "cubic_meters": 14, "cubic_feet": 494 }, "cargo": { "solar_array": 2, "unpressurized_cargo": true } }, "height_w_trunk": { "meters": 7.2, "feet": 23.6 }, "diameter": { "meters": 3.7, "feet": 12 }, "first_flight": "2010-12-08", "flickr_images": ["https://i.imgur.com/9fWdwNv.jpg", "https://live.staticflickr.com/8578/16655995541_7817565ea9_k.jpg", "https://farm3.staticflickr.com/2815/32761844973_4b55b27d3c_b.jpg", "https://farm9.staticflickr.com/8618/16649075267_d18cbb4342_b.jpg"], "name": "Dragon 1", "type": "capsule", "active": true, "crew_capacity": 0, "sidewall_angle_deg": 15, "orbit_duration_yr": 2, "dry_mass_kg": 4200, "dry_mass_lb": 9300, "thrusters": [{ "type": "Draco", "amount": 18, "pods": 4, "fuel_1": "nitrogen tetroxide", "fuel_2": "monomethylhydrazine", "isp": 300, "thrust": { "kN": 0.4, "lbf": 90 } }], "wikipedia": "https://en.wikipedia.org/wiki/SpaceX_Dragon", "description": "Dragon is a reusable spacecraft developed by SpaceX, an American private space transportation company based in Hawthorne, California. Dragon is launched into space by the SpaceX Falcon 9 two-stage-to-orbit launch vehicle. The Dragon spacecraft was originally designed for human travel, but so far has only been used to deliver cargo to the International Space Station (ISS).", "id": "5e9d058759b1ff74a7ad5f8f" };
    beforeAll(() => {
        render(<DragonInfo dragon={dragonData} />)
    });
    test('loads and displays dragon info and tables', () => {
        const dragonName = screen.getByTestId('dragon-name');
        expect(dragonName).toBeInTheDocument();

        const specNameElement = screen.getByTestId('OVERVIEW');
        expect(specNameElement).toBeInTheDocument();

        const overviewRowKeyText = screen.getByTestId('LAUNCH MASS');
        expect(overviewRowKeyText).toBeInTheDocument();
    })
})

describe('Should test Images Component', () => {
    const images = ["https://i.imgur.com/9fWdwNv.jpg", "https://live.staticflickr.com/8578/16655995541_7817565ea9_k.jpg", "https://farm3.staticflickr.com/2815/32761844973_4b55b27d3c_b.jpg", "https://farm9.staticflickr.com/8618/16649075267_d18cbb4342_b.jpg"];
    beforeAll(() => {
        render(<ImageContainer images={images} />)
    });
    test('loads and displays images in the screen', () => {
        const imagesHeading = screen.getByTestId('image-heading');
        expect(imagesHeading).toBeInTheDocument();

        const imageItem = screen.getByTestId('image-1');
        expect(imageItem).toBeInTheDocument();
    })
})

describe('Should test the whole app', () => {
    beforeAll(() => server.listen())
    afterEach(() => server.resetHandlers())
    afterAll(() => server.close())

    test('loads and displays list of dragons', () => {
        render(<App />)
        const appNameElement = screen.getByTestId('app-name');
        expect(appNameElement).toBeInTheDocument();

        const moduleNameElement = screen.getByTestId('module-name');
        expect(moduleNameElement).toBeInTheDocument();

        const moduleText = screen.getByText('DRAGON');
        expect(moduleText).toContainHTML(`<h1 class="name" data-testid="module-name">DRAGON</h1>`);

        expect(screen.getByText('Loading...')).toBeInTheDocument();
    })

    test('loads and displays greeting', async () => {
        render(<App />)

        await waitFor(() => screen.getByTestId('Dragon 1'))

        expect(screen.getByTestId('Dragon 1')).toBeInTheDocument()

        const item = screen.getByTestId('Dragon 1');
        fireEvent.click(item);

        expect(screen.getByTestId('dragon-info')).toBeInTheDocument();

        //OVERVIEW
        let specNameElement = screen.getByTestId('OVERVIEW');
        expect(specNameElement).toBeInTheDocument();
        let rowKeyText = screen.getByTestId('LAUNCH MASS');
        expect(rowKeyText).toBeInTheDocument();

        //HEAT SHEILD
        specNameElement = screen.getByTestId('HEAT SHEILD');
        fireEvent.click(specNameElement);
        rowKeyText = screen.getByTestId('TEMP');
        expect(rowKeyText).toBeInTheDocument();

        //TRUNK
        specNameElement = screen.getByTestId('TRUNK');
        fireEvent.click(specNameElement);
        rowKeyText = screen.getByTestId('VOLUME');
        expect(rowKeyText).toBeInTheDocument();

        //THRUSTERS
        specNameElement = screen.getByTestId('THRUSTERS');
        fireEvent.click(specNameElement);
        rowKeyText = screen.getByTestId('TYPE - 1');
        expect(rowKeyText).toBeInTheDocument();

        const imagesHeading = screen.getByTestId('image-heading');
        expect(imagesHeading).toBeInTheDocument();

        const imageItem = screen.getByTestId('image-1');
        expect(imageItem).toBeInTheDocument();
    })
})
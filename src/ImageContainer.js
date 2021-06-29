// Common Image component to render images
export default function ImageContainer({images}) {
    return (
        <>
            <div>
            <div className="dragon-name">
                  <h1 className="name"  data-testid="image-heading">IMAGES</h1>
              </div>
                <div>
                    <div>{images.map((i, ind) => <img className="images" key={"image-"+(ind+1)} data-testid={"image-"+(ind+1)} src={i} alt="dragon-images"/>)}</div>
                </div>
            </div>
        </>
    )
}
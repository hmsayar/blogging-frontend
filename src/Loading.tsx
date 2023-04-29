
const backgroundStyle = {
    backgroundImage: 'url("/background.svg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

export default function Loading(){
    return(
        <div style={backgroundStyle}>
            <div className="min-h-screen flex items-center justify-center">
            </div>
        </div>
    )
}
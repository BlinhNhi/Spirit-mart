import { PulseLoader } from 'react-spinners'
function LoadingImage() {
    return (
        <div>
            <PulseLoader
                color="#FFA500"
                size={10}
            />
        </div>
    );
}

export default LoadingImage;
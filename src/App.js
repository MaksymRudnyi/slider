import originalImage from './img/img-original.jpg';
import modifiedImage from './img/img-modified.jpg';

import original1 from './img/clean-code1.jpg';
import modified1 from './img/clean-code2.jpg';

import osxDay from './img/osx-day.jpg';
import osxNight from './img/osx-night.jpg';

import Slider from './components/Slider';

const slider1 = {
    delay: 2000,
    original: {
        url: originalImage,
        title: 'Original'
    },
    modified: {
        url: modifiedImage,
        title: 'Modified'
    }
};

const slider2 = {
    original: {
        url: original1,
        title: 'Clean code'
    },
    modified: {
        url: modified1,
        title: 'Bad code'
    }
};

const slider3 = {
    original: {
        url: osxDay,
        title: 'Day'
    },
    modified: {
        url: osxNight,
        title: 'Night'
    }
};

const App = () => {
    
    return (
        <div>
            <h2>Slider #1</h2>
            <Slider {...slider1}/>

            <br/>

            <h2>Slider #2</h2>
            <Slider {...slider2}/>

            <br/>

            <h2>Slider #3</h2>
            <Slider {...slider3}/>
        </div>
    )
}

export default App;
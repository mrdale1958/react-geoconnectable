import { useEffect, useState }  from 'react';



const FauxPhidgetTilty = (props) => {
    const [position, setPosition] = useState(props.sliderPosition);
    const [fauxPhidgetConfig, setFauxPhidgetConfig] = useState(props.configData.fauxPhidgetConfig);
    const [running, setRunning] = useState(false);
    
    
    

   
  
    const handleClick = (e) => { 
      
    }

    const handleKey = (e) => {
        if (typeof e === 'object') {
            let config = fauxPhidgetConfig;
            switch (e.key) {
                case '.':
                    setRunning(! running);
                    config.running = ! config.running;
                    config.position = position;
                break;
                case '+':
                    config.slideIncrement  = config.slideIncrement + 1;
                    break;
                case '*':
                    config.slideIncrement  = config.slideIncrement + 10;

                break;
                case '-':
                    config.slideIncrement  = Math.max(1, config.slideIncrement - 1);

                break;
                case '/':
                    config.slideIncrement  = Math.max(10, config.slideIncrement - 10);

                break;
                case 'ArrowLeft':
                    config.direction = 1;
                break;
                case 'ArrowRight':
                    config.direction = -1;

                break;
                      //   case 1:
            //     log.textContent = 'Middle button clicked.';
            //     break;
            //   case 2:
            //     log.textContent = 'Right button clicked.';
            //     break;
                default:
                console.log('Unknown button code:', e.button);
            }
            setFauxPhidgetConfig (config);
            if (config.running) {
                setTimeout(updatePosition, config.moveTime);
            }
          } 
          
    }

    const updatePosition = () => {
        let config = fauxPhidgetConfig;
        const maxClicks = props.configData.availableClicks;

        let newX = config.position + (config.slideIncrement * config.direction);
        if ( newX < 0) {
            console.log('0000000000000',newX);
            newX = 0;
        } else if (newX>maxClicks) {
            console.log('===============',newX);
            //encoder0.setPosition(maxClicks);
            newX=maxClicks;
        }
        config.position = newX;
        setPosition(newX);
        props.positionCallback(newX);
        if (config.running) {
            setTimeout(updatePosition, config.moveTime);
        }
    }
    const useWindowEvent = (event, callback, dependencies) => {
        useEffect(() => {
          window.addEventListener(event, callback);
          return () => window.removeEventListener(event, callback);
 // eslint-disable-next-line 
       }, [event, callback, ...dependencies = []]);
      };

      useWindowEvent('keydown', handleKey);
   
      useWindowEvent('mouseup', handleClick);
    
    
    return <div>&nbsp;</div>;
  
}

export default FauxPhidgetTilty;


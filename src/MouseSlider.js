import React from 'react';

class MouseSlider extends React.Component {
    constructor() {
        super();
        this.state = {color: "red",
            scrubbing: false,
            offset: 0,
            mousePosition: 0
        };
        this.handleClick = this.handleClick.bind(this);
        this.dragDisplay = this.dragDisplay.bind(this);
        this.startDrag = this.dragDisplay.bind(this);
        this.endDrag = this.dragDisplay.bind(this);
    }
  
    componentDidMount() {
        let sliderHandle = document.getElementById("slider-handle");
        //slider.addEventListener("click", moveDisplay);
        if (sliderHandle) {
            sliderHandle.addEventListener("drag", this.dragDisplay);
            sliderHandle.addEventListener("dragstart", this.dragDisplay);
            sliderHandle.addEventListener("dragend", this.dragDisplay);
            sliderHandle.addEventListener('mousedown', this.startDrag);
            sliderHandle.addEventListener('mouseup', this.endDrag);
            sliderHandle.addEventListener('mousemove', this.dragDisplay);
        }
    }

    startDrag(e){
        let sliderHandle = document.getElementById("slider-handle");
        if (sliderHandle) {
            this.setState(prevState => ({
            scrubbing:  true
        }));

        this.setState(prevState => ({
            offset : [
            sliderHandle.offsetLeft - e.clientX,
            sliderHandle.offsetTop - e.clientY
            ]
        }));
    }
    }       
    endDrag(e){
        let sliderHandle = document.getElementById("slider-handle");
        if (sliderHandle) {
            this.setState(prevState => ({
            scrubbing:  false
        }));
        this.setState(prevState => ({
            offset : [
            sliderHandle.offsetLeft - e.clientX,
            sliderHandle.offsetTop - e.clientY
            ]
        }));
    }
    }   
    
    componentWillUnmount() {
        let sliderHandle = document.getElementById("slider-handle");
        if (sliderHandle) {
            //slider.addEventListener("click", moveDisplay);
        sliderHandle.removeEventListener("drag", this.dragDisplay);
        sliderHandle.removeEventListener("dragstart", this.dragDisplay);
        sliderHandle.removeEventListener("dragend", this.dragDisplay);
        sliderHandle.removeEventListener('mousedown', this.startDrag);  
        sliderHandle.removeEventListener('mouseup', this.endDrag);
        sliderHandle.removeEventListener('mousemove', this.dragDisplay);
    }
}

    handleClick() {
      this.setState(prevState => ({
        isToggleOn: !prevState.isToggleOn
      }));
    }
    
	
	
	mouseMoveDisplay(event) {
        console.log('mouse', event.type, event);
        let sliderHandle = document.getElementById("slider-handle");
		event.preventDefault();
        if (sliderHandle) {
            if (this.state.scrubbing) {
			this.setState(prevState => ({
                mousePosition: {
	
                    x : event.clientX,
                    y : event.clientY
                }
			}));
			let newX = (this.state.mousePosition.x + this.state.offset[0]);
			this.props.slideDisplay(newX);
			sliderHandle.style.left =  newX + 'px';
			//div.style.top  = (mousePosition.y + offset[1]) + 'px';
		}
    }
	} 
    
    dragDisplay(event) {
        console.log('drag', event.type, this.state.scrubbing);
        if (event.type === 'mousedown') {
            console.log (event.type);
            this.setState(prevState => ({
                scrubbing:  true
            }));
        } else if (event.type === 'mousemove' && this.state.scrubbing === true) {
            const rect = event.target.getBoundingClientRect();
                
            let currentX = rect.left;
            currentX += event.movementX;
            let newX = Math.max(0, Math.min(90000, currentX));
            event.target.style.left = String(newX) +'px';
            console.log ('drag', event.movementX,event.target.style.left);
            this.props.positionCallback(newX)
            
        } else if ((event.type === 'mouseup') || (event.type === 'mouseout')) {
            console.log (event.type);
            this.setState(prevState => ({
                scrubbing:  false
            }));
            } 
    }    
    
    render() {
        return (
            <div className="slider" >
                <div id={this.props.id}> 
                    <div id="slider-handle"> &nbsp; </div>
                 </div>
                
           </div>

        );
  }
}

export default MouseSlider;

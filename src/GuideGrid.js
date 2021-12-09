import React from 'react';

class GuideGrid extends React.Component {
  constructor() {
    super();
    this.state = {color: "red", timePosition: 0};
  }
  render() {
    return (
        <div>
        <div className= {"guideline vertical"} style={{left:this.props.configData.leftEdge}}/>
        <div className= {"guideline vertical"} style={{left:this.props.configData.yearTrigger}}/>
        <div className= {"guideline vertical"} style={{left:this.props.configData.labelTrigger}}/>
        <div className= {"guideline vertical"} style={{left:this.props.configData.contentTrigger}}/>
        <div className= {"guideline vertical"} style={{left:this.props.configData.screenWidth - this.props.configData.contentTrigger}}/>
        <div className= {"guideline vertical"} style={{left:this.props.configData.screenWidth - this.props.configData.labelTrigger}}/>
        <div className= {"guideline vertical"} style={{left:this.props.configData.screenWidth - this.props.configData.yearTrigger}}/>
        <div className= {"guideline vertical"} style={{left:this.props.configData.rightEdge}}/>
        <div className= {"guideline horizontal disease_catastrophe_top"} />
        <div className= {"guideline horizontal discovery_invention_top"} />
        <div className= {"guideline horizontal drug_company_history_top"} />
        <div className= {"guideline horizontal legislation_top"} />
        <div className= {"guideline horizontal education_top"} />
        <div className= {"guideline horizontal health_science_history_top"} />
        <div className= {"guideline horizontal world_event_top"} />
            
        &nbsp;
        </div>
    );
  }
}

export default GuideGrid;

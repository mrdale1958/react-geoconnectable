import React from 'react';

class Template extends React.Component {
    constructor() {
        super();
        this.state = {color: "red"};
      }
    render() {
        return (
          <div id="lanes-block">
          <div className="disease_catastrophe disease_catastrophe_top lane"></div>
          <div className="disease_catastrophe disease_catastrophe_top lane-label">Disease/Catastrophe</div>
          <div className="disease_catastrophe disease_catastrophe_top lane-label right-side">Disease/Catastrophe</div>
          <div className="discovery_invention discovery_invention_top lane"></div>
          <div className="discovery_invention discovery_invention_top lane-label">Discovery/Invention</div>
          <div className="discovery_invention discovery_invention_top lane-label right-side">Discovery/Invention</div>
          <div className=" drug_company_history drug_company_history_top lane"></div>
          <div className=" drug_company_history drug_company_history_top lane-label">Drug Company History</div>
          <div className=" drug_company_history drug_company_history_top lane-label right-side">Drug Company History</div>
          <div className="legislation legislation_top lane"></div>
          <div className="legislation legislation_top lane-label">Legislation</div>
          <div className="legislation legislation_top lane-label right-side">Legislation</div>
          <div className="education education_top lane"></div>
          <div className="education education_top lane-label">Education</div>
          <div className="education education_top lane-label right-side">Education</div>
          <div className="health_science_history health_science_history_top lane"></div>
          <div className="health_science_history health_science_history_top lane-label">Health Science History</div>
          <div className="health_science_history health_science_history_top lane-label right-side">Health Science History</div>
          <div className="world_event world_event_top lane"></div>
          <div className="world_event world_event_top lane-label">World Event</div>
          <div className="world_event world_event_top lane-label right-side">World Event</div>
          <div className="century_marks century_marks_top lane"></div>

        </div>
        );
  }
}

export default Template;

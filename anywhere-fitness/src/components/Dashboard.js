import React from "react";
import axiosWithAuth from "./AxiosWithAuth";
import AddClass from "./updateClass";

class DashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classList: [],
      loading: false,
    };
    this.getClassList = this.getClassList.bind(this);
  }

  getClassList() {
    this.setState({ loading: true });

    axiosWithAuth()
      .get("https://anywhere-fitness-ptbw.herokuapp.com/api/classes")
      // .then((res) => res.json())
      .then((res) => {
        setTimeout(() => {
          this.setState({ loading: false, classList: res.data });
        }, 2000);
      });
  }

  render() {
    const { classList, loading } = this.state;

    return (
      <div className="container App">
        <h4 className="d-inline-block">Class List</h4>
        <button
          className="btn btn-info float-right"
          onClick={this.getClassList}
          disabled={loading}
        >
          {loading ? "Loading..." : "Get Class List"}
        </button>
        <div className="clearfix"></div>

        <ul>
          <li>ID</li>
          <li>Location</li>
          <li>Class Name</li>
          <li>Class Type</li>
          <li>Class Description</li>
          <li>Start Time</li>
          <li> Duration</li>
          <li>Intensity</li>
          <li>Registered</li>
          <li>Max Size</li>
          <li>Instructor Name</li>
        </ul>

        {classList.map((res) => (
          <ul>
            <li>{res.id}</li>
            <li>{res.location}</li>
            <li>{res.class_name}</li>
            <li>{res.class_type}</li>
            <li>{res.class_desc}</li>
            <li>{res.start_time}</li>
            <li>{res.duration}</li>
            <li>{res.intensity}</li>
            <li>{res.registered}</li>
            <li>{res.max_size}</li>
            <li>{res.instructor_name}</li>
          </ul>
        ))}
        {classList.length === 0 && (
          <ul>
            <li className="text-center" colSpan="4">
              <b>No data found to display.</b>
            </li>
          </ul>
        )}
        <AddClass />
      </div>
    );
  }
}

export default DashBoard;

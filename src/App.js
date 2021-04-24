import React from "react";
import axios from "axios";
import "./styles.css";
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      tour: [],
      full: false,
      loading: true,
      infoShow: true,
      clickedComment: ""
    };
	this.refreshHandler=this.refreshHandler.bind(this)
	this.removeHandler=this.removeHandler.bind(this)
	this.clickHandler=this.clickHandler.bind(this)
	this.checkinfo=this.checkinfo.bind(this)
  }

  componentDidMount() {
    axios.get("https://course-api.com/react-tours-project").then((res) => {
      console.log(res.data);
      const tour = res.data;
      this.setState({
        tour,
        loading: false
      });
    });
  }

  refreshHandler() {
    window.location.reload();
  };

  removeHandler(id) {
    const leftTours = this.state.tour.filter((x) => {
      return x.id !== id;
    });
    this.setState({
      tour: leftTours
    });
    console.log(id);
  };

  clickHandler(){
    let full = this.state.full;
    this.setState({
      full: !full
    });
  };
  checkInfo(id) {
    let infoShow = this.state.infoShow;
    this.setState({
      infoShow: !infoShow,
      clickedComment: id
    });
  };
  render() {
    if (this.state.loading) {
      return (
        <p style={{ textAlign: "center", fontSize: "48px" }}>Loading...</p>
      );
    }
    return (
      <div className="App">
        {this.state.tour.length > 0 ? (
          <>
            <div className="U">
              {" "}
              <h2 style={{ textTransform: "uppercase" }}>our tours</h2>
            </div>
            {this.state.tour.map((x) => {
              return (
                <div className="card">
                  <img className="card-img-top" src={x.image} alt="h" />
                  <div className="card-body">
                    <h5 className="card-title">
                      {x.name}
                      <span className="price"> {x.price}</span>
                    </h5>
                    <p className="card-text">
                      {this.state.infoShow
                        ? `${x.info}`
                        : `${x.info.substring(0, 200)}`}
                      <button
                        onClick={() => {
                          this.checkInfo(x.id);
                        }}
                      >
                        {this.state.infoShow ? "show less" : "show more"}
                      </button>
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      this.removeHandler(x.id);
                    }}
                    className="button"
                  >
                    Not Interested
                  </button>
                </div>
              );
            })}
          </>
        ) : (
          <>
            <p>no tours left</p>
            <button onClick={this.refreshHandler} style={{ color: "blue" }}>
              refresh
            </button>
          </>
        )}
      </div>
    );
  }
}

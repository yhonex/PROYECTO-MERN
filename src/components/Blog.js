import React,{ Component }  from "react";
import Slider from "./Slider";
import Sidebar from "./Sidebar";
import Articles from "./Articles" ;



class Blog extends Component {

  render() {

    

    return (
      <div className="blog">
        <Slider 
            title="Blog"
            size="slider-small"
            
            
        />
        <div className="center">
          <div id="content">
            {/*listados de articulos que vendran del api rest de node*/}

            <Articles />
            
            
          </div>
          <Sidebar
            blog="true"
          />

        </div>
      </div>
    );
  }
}

export default Blog;

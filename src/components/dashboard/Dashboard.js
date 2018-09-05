import React, { Component } from 'react'
import axios from 'axios'
import RGL, { WidthProvider } from "react-grid-layout";
import Clock from '../widgets/clock/Clock'
import Dictionary from '../widgets/dictionary/Dictionary'
import Note from '../widgets/note/Note'
import Search from '../widgets/search/Search'
import Weather from '../widgets/weather/Weather'
import '../../../node_modules/react-grid-layout/css/styles.css'
const ReactGridLayout = WidthProvider(RGL);



  
  export default class Dashboard extends Component {
    constructor(props) {
      super(props)
      this.state={    
        width: 10,
      height: 3,
      layout: []
      }
      this.onLayoutChange=this.onLayoutChange.bind(this);
    }
    componentDidMount() {
    axios.get('/api/user-data').then(response => {
      console.log('response', response)
      this.props.setUser(response.data);
    })
  }


  login() {
    let { REACT_APP_DOMAIN, REACT_APP_CLIENT_ID } = process.env
    let url = `${window.location.origin}/auth/callback`
    window.location = `https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirct_uri=${url}&response_type=code`
  }


    onLayoutChange(val,i){
      console.log(val)
      this.setState({
        layout: val
      })
    }
  
    map(){
      let arr =[]
      var height = 8;
      var width = this.state.width;
      for(let q =0;q<11;q++){
        arr.push(
          <div onChange={e=>console.log('gridItem')} style={{backgroundColor: 'hotpink'}} className="gridItem" key={q.toString()} data-grid={{i: q.toString(),x: 0, y: 0, w: width, h: height,}}>we are clones
          <button onMouseUp={()=>console.log(this.state.layout[q])}>do the things</button>
          </div>
        )
      }
      return arr;
    }
    render() {
  
   
      return (
        <div >
          <header >

            <h1 className="App-title">Welcome to React</h1>
          </header>

          <div style={{width: '100%', height: '100vh',  overflow: 'scroll'}}>
          <ReactGridLayout  className="layout" cols={30} rowHeight={5} width={800} height={300}
                    layout={this.state.layout}
                    onLayoutChange={this.onLayoutChange}
                    shouldComponentUpdate={()=>console.log('your gay at' )}
          >
  
            {this.map()}
          </ReactGridLayout>
          </div>
        </div>
      );
    }
  }
import React, { Component} from "react";
import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import { Container, Row, } from "react-bootstrap";
import { Button, ButtonGroup, Grid } from '@material-ui/core/';

class App extends Component{
  constructor(props){
      super(props);
      this.state = { error: null,
          isLoaded: false,
          items: [],
          planet: null,
          next: null,
          previous: null
      }
  }
  componentDidMount() {
    this.fetchPlanets("https://swapi.dev/api/people/")
      // Fetch тут
  }
  fetchPlanets(url)
    {fetch(url)
      .then((response) => response.json())
      .then((response) => {
          this.setState({items: response.results});
          console.log (response.results)
          this.setState({isLoaded: true});
          this.setState({next: response.next}) 
          this.setState({previous: response.previous})
            })
              .then((error) => {
              this.setState({false: true});
              this.setState({error});
  })}


  setPlanet(planet){this.setState({planet: planet})}
  
  
  render (){
    return(
      <div >
          <Grid   
          container
          direction="row"
          justify="center"
          alignItems="center"
          > <h1>React SW planet App</h1>
          </Grid>
          <Container>
          <Row>
            <Grid 
            xs={4}
            container
            direction="column"
            justify="space-evenly"
            alignItems="flex-start"
            >
            <h3>Select planet</h3>
            
            {this.state.items.length > 0 && this.state.items.map((item,index) => {
              return <div key={index}>
              <ButtonGroup   color="primary" aria-label="outlined secondary button group">
              <Button className="menu-button" onClick={() => this.setPlanet(item)}>{item.name}</Button>
              </ButtonGroup>
                    </div> })
            }
         <ButtonGroup  color="secondary" aria-label="contained primary button group">
          <Button onClick={() => this.fetchPlanets(this.state.previous)}>previous</Button>
          <Button onClick={() => this.fetchPlanets(this.state.next)}>next</Button>
        </ButtonGroup>
            </Grid>
          
          
          <Grid
              xs={8}
              container
              direction="column"
              justify="space-evenly"
              alignItems="stretch"
          >
          <h3>information</h3>
          {this.state.planet && Object.entries(this.state.planet).map(([key,value]) => {
            if (Array.isArray(value)){
              return <div> {key}:{value.map((link ) => {
                return <div>
                         <a>{link}</a><br/>              
                        </div>
              })}</div> 
            } else {
              return <div> {key}:{value} </div>
            }
          })
          }
          </Grid>
          
        </Row>
        </Container>
      </div>
    );
  
  }
}



export default App;

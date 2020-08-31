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
          previous: null,
          links: null,
          currentElement: null
      }
  }
  componentDidMount() {
    // Fetch тут
    this.fetchRoot()
  }
  fetchRoot() {
    fetch("https://swapi.dev/api/")
      .then((response) => response.json())
      .then((response) => {
         this.setState({links: response});    
      })
      .then((error) => {
        this.setState({false: true});
        this.setState({error});
      })
  }

  fetchElements(url, key) {
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        this.setState({items: response.results});
        console.log (response.results)
        this.setState({isLoaded: true});
        this.setState({next: response.next}) 
        this.setState({previous: response.previous})
        this.setState({currentElement: key})
      })
      .then((error) => {
        this.setState({false: true});
        this.setState({error});
      })
  }

  setPlanet(planet) {
    this.setState({planet: planet})
  }
  
  render (){
    return(
      <div>
        <Grid   
          container
          direction="row"
          justify="center"
          alignItems="center"
        > 
          <h1>React SW App</h1>
        </Grid>
        
        <div>
        <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        >
          <ButtonGroup size="large" color="primary" aria-label="large outlined primary button group">
            {this.state.links && Object.entries(this.state.links).map(([key,value]) => {
              return <Button 
                        onClick={() => this.fetchElements(value, key)}>
                      {key}
                      </Button>
            })}
          </ButtonGroup>
          </Grid>
        </div>

        <Container>
          <Row>
            {this.state.currentElement && 
              <Grid 
                xs={3}
                container
                direction="column"
              >
                <h3>Select {this.state.currentElement}</h3>
                <ButtonGroup  
                  orientation="vertical"
                  color="primary"
                  aria-label="vertical outlined primary button group"                  
                >
                  {this.state.items.length > 0 && this.state.items.map((item,index) => {
                     return <div key={index}>
                        <Button onClick={() => this.setPlanet(item)}>
                            {item.name || item.title}
                        </Button>
                    </div> })
                   }
                </ButtonGroup>
                <div>
                  <ButtonGroup  color="secondary" aria-label="contained primary button group">
                    <Button 
                      onClick={() => this.fetchElements(this.state.previous)}>
                      previous
                    </Button>
                    <Button 
                      onClick={() => this.fetchElements(this.state.next)}>
                      next
                    </Button>
                  </ButtonGroup>
                </div>
              </Grid>
            }  

            <Grid
              xs={9}
              container
              direction="column"
              justify="space-evenly"
              alignItems="stretch"
            >
              {this.state.planet && <h3>information</h3>}
              {this.state.planet && Object.entries(this.state.planet).map(([key,value]) => {
                if (Array.isArray(value)){
                  return <div> {key}:{value.map((link ) => {
                    return <div>
                            <a href={link}>{link}</a>
                            <br/>              
                           </div>
                    })}
                  </div> 
                } else {
                  return <div>{key}:{value}</div>
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

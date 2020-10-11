import React from 'react';
import './App.css';
import Pickem from './Pickem.js';

const teams = [
  {
      shortName: "G2",
      longName: "G2 Esports",
      players: [
          "Wunder", "Jankos", "Caps", "Perkz", "MikyX"
      ], 
      seed: "1"
  },
  {
      shortName: "GenG",
      longName: "Generation Gaming",
      players: [
          "Rascal", "Clid", "Bdd", "Ruler", "Life"
      ], 
      seed: "2"
  },
  {
      shortName: "SN", // TL will totally make it out of groups prove me wrong -.-
      longName: "Suning",
      players: [
          "Bin", "SofM", "Angel", "huanfeng", "SwordArt"
      ], 
      seed: "3"
  },
  {
      shortName: "DWG",
      longName: "Damwon Gaming",
      players: [
          "Nuguri", "Canyon", "Showmaker", "Ghost", "Beryl"
      ], 
      seed: "4"
  },
  {
      shortName: "TES",
      longName: "TOP Esports",
      players: [
          "369", "Karsa", "knight", "JackeyLove", "yuyanjia"
      ], 
      seed: "5"
  },
  {
      shortName: "FNC",
      longName: "Fnatic",
      players: [
          "Bwipo", "Selfmade", "Nemesis", "Rekkles", "Hylissang"
      ], 
      seed: "6"
  },
  {
      shortName: "JDG",
      longName: "Jingdong Gaming",
      players: [
          "Zoom", "Kanavi", "Yagao", "LokeN", "LvMao"
      ], 
      seed: "7"
  },
  {
      shortName: "DRX",
      longName: "DragonX",
      players: [
          "Doran", "Pyosik", "Chovy", "Deft", "Keria"
      ], 
      seed: "8"
  }
  
];

//indicates for each match number what position they are playing for
let matches = [
  {
      resultPlace:"semi1",
      player1: "seed1",
      player2: "seed2"
  },
  {
      resultPlace:"semi2",
      player1: "seed3",
      player2: "seed4"
  },
  {
      resultPlace:"semi3",
      player1: "seed5",
      player2: "seed6"
  },
  {
      resultPlace:"semi4",
      player1: "seed7",
      player2: "seed8"
  },
  {
      resultPlace:"final1",
      player1: "semi1",
      player2: "semi2"
  },
  {
      resultPlace:"final2",
      player1: "semi3",
      player2: "semi4"
  },
  {
      resultPlace:"winner",
      player1: "final1",
      player2: "final2"
  }
]


// we could place this Todo component in a separate file, but it's
// small enough to alternatively just include it in our App.js file.



// main component
class App extends React.Component {
  constructor( props ) {
    super( props )
    // initialize our state
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    this.state = { pickems:null, username : urlParams.get('username'), hasPickems:false, leftPick:"Team 1", rightPick:"Team 2", matchNum:0}
   
    let newUser = urlParams.get('newUser');

    if (newUser === "true"){
        alert("An account with that username was not found so one was created")
    }
    else {
        this.fetchAndUpdatePickems();
    }
    // do something to initilize the state (either to empty or the gathered data)
    
    this.init()
  }

  getTeamBySeed(seed){
    return teams[seed-1]
  } 

  getTeamByPlace(place){
      return this.state.pickems[place];
  }

  makePick(team, matchNum){
      let pickemCopy = JSON.parse(JSON.stringify(this.state.pickems))
      pickemCopy[matches[matchNum].resultPlace] = team; 
      this.setState({
        pickems:pickemCopy
      })
      if (matchNum < 6) {
        this.setState({matchNum:matchNum+1})
        this.initPicks(matchNum+1);
      }
      else {
          this.sendPickems()
          this.setState({hasPickems : true})
      }
  }

  initPicks(matchNum){ 
      let teamL = this.getTeamByPlace(matches[matchNum].player1);
      let teamR = this.getTeamByPlace(matches[matchNum].player2);

      this.setState({ leftPick  : teamL.shortName,
                      rightPick : teamR.shortName  })
        
  }

  sendPickems(){
    fetch('/add', {
      method:'POST',
      body:JSON.stringify({
          username: this.state.username,
          pickdata: this.state.pickems
      }),
      headers : {
          "Content-Type":"application/json"
      }
    }).then( response => response.json())
        .then( json => {

        })
  }

  fetchAndUpdatePickems(){
     let json = fetch('/db', {
        method:'POST',
        body:JSON.stringify({
            username: this.state.username
        }),
        headers : {
            "Content-Type":"application/json"
        }
      }).then( response => response.json())
          .then( json => {
              // if the pickems in the server is empty then we want to have 
              // an empty default pickems displayed
              console.log("here 1")
              return json
          })
    console.log("here 2")
    if (json.pickem) {
      this.setState({hasPickems:true, pickems:json.pickem})
        
    }   
    else {
      this.setState({hasPickens:false, 
        pickems: {
          "seed1": this.getTeamBySeed(1),
          "seed2": this.getTeamBySeed(2),
          "seed3": this.getTeamBySeed(3),
          "seed4": this.getTeamBySeed(4),
          "seed5": this.getTeamBySeed(5),
          "seed6": this.getTeamBySeed(6),
          "seed7": this.getTeamBySeed(7),
          "seed8": this.getTeamBySeed(8),
        }
      })
    }
  }

  modifyPicks(){
    this.setState({pickems : {
        "seed1": this.getTeamBySeed(1),
        "seed2": this.getTeamBySeed(2),
        "seed3": this.getTeamBySeed(3),
        "seed4": this.getTeamBySeed(4),
        "seed5": this.getTeamBySeed(5),
        "seed6": this.getTeamBySeed(6),
        "seed7": this.getTeamBySeed(7),
        "seed8": this.getTeamBySeed(8),
      },
      hasPickems:false
    })
    this.init();
  }

  async deletePicks(){
    this.setState({pickems : {
        "seed1": this.getTeamBySeed(1),
        "seed2": this.getTeamBySeed(2),
        "seed3": this.getTeamBySeed(3),
        "seed4": this.getTeamBySeed(4),
        "seed5": this.getTeamBySeed(5),
        "seed6": this.getTeamBySeed(6),
        "seed7": this.getTeamBySeed(7),
        "seed8": this.getTeamBySeed(8),
      },
      hasPickems:false
    })
    return fetch('/delete', {
        method:'POST',
        body:JSON.stringify({
            username: this.state.username,
            pickdata: this.state.pickems
        }),
        headers : {
            "Content-Type":"application/json"
        }
    }).then( response => response.json())
        .then( json => {
            
            this.init();
        })
  }


  init(){
    if (!this.state.hasPickems) {
        this.setState({matchNum:0})
        this.initPicks(0)
    }
  }
  

  // render component HTML using JSX 
  render() {
    let footer;

    if (this.state.hasPickems){
      // alt functions footer
      footer = <div class = "container">
                    <button id = "modify">Update My Pickems</button>
                    &nbsp;
                    <button id = "delete">Delete My Pickems</button>
                </div>
      footer.getElementById("modify").onclick = function(){
        this.modifyPicks();
      }
      footer.getElementById("delete").onclick = async function(){
        this.deletePicks();
      }
    }
    else {
      // picker footer
      footer = <div class = "container">
                  <p>Who will win?</p>
                  <button id = "team1">Test1</button>
                  <span>vs.</span>
                  <button id = "team2">Test2</button>
                </div>

      footer.getElementById("team1").onclick = function(){
          this.makePick(this.state.leftPick, this.state.matchNum);
      }
      footer.getElementById("team2").onclick = function(){
          this.makePick(this.state.rightPick, this.state.matchNum);
      }
    }

    return (
      <div className="App">
        <Pickem data = {this.state.pickems} />
        {footer}
      </div>
    )
  }
}

export default App;

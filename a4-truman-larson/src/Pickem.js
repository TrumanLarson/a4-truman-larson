import React from 'react'


class Pickem extends React.Component {
    // our .render() method creates a block of HTML using the .jsx format
    render() {
      let table = <table class = "container">
                    <tr>
                        <td id = "seed1" class = "team">team 1</td>
                        <td></td><td></td><td></td><td></td><td></td>
                        <td id = "seed5" class = "team">team 5</td>
                    </tr>
                
                    <tr>
                        <td></td>
                        <td id = "semi1" class = "team">team 1</td>
                        <td></td><td></td><td></td>
                        <td id = "semi3" class = "team">team 5</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td id = "seed2" class = "team">team 2</td>
                        <td></td><td></td><td></td><td></td><td></td>
                        <td id = "seed6" class = "team">team6</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td id = "final1" class = "team">team 1</td>
                        <td></td>
                        <td id = "final2" class = "team">team 5</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td id = "seed3" class = "team">team 3</td>
                        <td></td><td></td><td></td><td></td><td></td>
                        <td id = "seed7" class = "team">team 7</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td id = "semi2" class = "team">team 3</td>
                        <td></td>
                        <td id = "winner" class = "team">team 1</td>
                        <td></td>
                        <td id = "semi4" class = "team">team 7</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td id = "seed4" class = "team">team 4</td>
                        <td></td><td></td><td></td><td></td><td></td>
                        <td id = "seed8" class = "team">team 8</td>
                    </tr>
                    </table>
  
  
      let cell = null;
      for (let i = 1; i < 5; i++){
          if (i<3){
              cell = table.getElementById("final"+i);
              cell.innerHTML = "Final";
          }
          cell = table.getElementById("semi"+i);
          cell.innerHTML = "Semis";
      }
      cell = table.getElementById("winner");
      cell.innerHTML = "Winner"
      Object.keys(this.props.data).forEach(function(key) {
          cell = table.getElementById(key);
          cell.innerHTML = this.props.data[key].shortName;
      })
      return table
    }
    
  }

  export default Pickem;
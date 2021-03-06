import React, { Component } from "react";
import { GridList, GridTile } from "material-ui/GridList";
import { BrowserRouter as Router,Route,Link,Redirect} from "react-router-dom";
import axios from "axios";
import {Card, CardActions, CardHeader,CardMedia, CardTitle,CardText} from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";
import Divider from "material-ui/Divider";
import Resource from "../models/resource";

const styles = {
  root: {
    display: "flex",
    flexWrap: "wrap",
    // justifyContent: 'space-around',
  },
  gridList: {
    width: 1000,
    height: 800,
    overflowY: "auto"
  },
  card: {
    padding:5,  
  },
};

class PendingContracts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contracts: []
    };
  }

  componentDidMount() {
    Resource("patients", this.props.userId)
      .getContracts()
      .then(response => {
        console.log(response);
        let pendingContracts = [];
        response.forEach(contract => {
          if (contract.contractStatus === "pending") {
            pendingContracts.push(contract);
          }
        });
        this.setState(...this.state, { contracts: pendingContracts });
      })

      .catch(e => console.log(e));
  }

  render() {
    return (
      <div className="pending-contracts-container">
        <h2 className="page-headers"> Pending Prescriptions</h2>
        <div style={styles.root}>
          <GridList
            cols={4}
            cellHeight={380}
            padding={9}
            style={styles.gridList}
          >
            {this.state.contracts.map(contract => (
              <div className="pending-contracts-card" key={contract.cId}>
                <Card className="Card-1">
                  <CardMedia>
                    <img
                      src={`/docs/prescription.jpg`}
                      alt=""
                      className="pending-contract-image"
                    />
                  </CardMedia>
                  <CardTitle title={contract.generic_name} style={styles.card}/>
                  <CardText style={styles.card}>
                    {contract.description}
                    <p><strong>Number of doses: </strong>{contract.numberOfDoses}</p>
                    <p><strong>Dosage:</strong> {contract.dosage}mg</p>
                    <p><strong>Frequency:</strong> {contract.frequencyOfDose} times a day</p>
                    <Divider />
                  </CardText>

                  <CardActions>
                    <Link
                      to={{ pathname: `/patient/pending/bids/${contract.cId}` }}
                    >
                      <RaisedButton label="View Bids" primary={true} />
                    </Link>
                  </CardActions>
                </Card>
              </div>
            ))}
          </GridList>
        </div>
      </div>
    );
  }
}

export default PendingContracts;
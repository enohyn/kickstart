  import React,{ Component } from 'react';
  import { Card , Button } from 'semantic-ui-react';
  import factory from '../ethereum/factory';
  import Layout from '../components/Layout';
  import {Link} from '../routes';
  import Web3 from 'web3';
  
  class CampaignIndex extends Component {
    
    static async getInitialProps(){
      
      const campaigns = await factory.methods.getDeployedCampaigns().call();
     
      return {
        campaignAddress:campaigns[0],
        campName:campaigns[1]
    };  
  }

    renderCampaigns(){
      console.log(this.props.campName);

      const items= this.props.campaignAddress.map((address, index) =>{
        return{
          header: Web3.utils.hexToAscii(this.props.campName[index]),
          meta: `Campaign Address: ${address}`,
          description: (
            <Link route={`/campaigns/${address}`}>
            <a>View Campaign </a>
            </Link>
          ),
          fluid: true
        };
      });
      return <Card.Group items={items}/>;
    }

    render(){
      return (

      <Layout>
      <div>
      <h3>Open Campaigns</h3>

      <Link route="/campaigns/new">
        <a>
        <Button
          floated="right"
          content= "Create Campaign"
          icon="add circle"
          primary
        />
        </a>
        </Link>

      {this.renderCampaigns()}


      </div>
      </Layout>
  );
    }
  }

  export default CampaignIndex;

import React,{Component} from 'react';
import{Card,Grid,Button} from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import {Link} from '../../routes';

class CampaignShow extends Component{

  
  static async getInitialProps(props){
    const campaign=Campaign(props.query.address);
    

    const summary =await campaign.methods.getSummary().call();
    
    

    return{ 
      address: props.query.address,
      name: summary[0],
      minimumContribution : summary[1],
      balance: summary[2],
      requestsCount: summary[3],
      approversCount: summary[4],
      manager: summary[5]
     

    };
      
  }

  renderCards(){
    
   
    const{
      balance,
      manager,
      minimumContribution,
      requestsCount,
      approversCount,
      name
      //campaignName
    }= this.props;

    const items=[
      {
        header: manager,
        meta: 'Address of Manager',
        description: 'The manager created this Campaign and can create requests to withdraw money',
        style:{overflowWrap :'break-word'}
      },
      {
        header: name,
        meta: 'Campaign Name',
        description: 'Name of this Campaign',
        style:{overflowWrap :'break-word'}
      },
      {
        header:minimumContribution,
        meta:'Minimum Contribution (wei)',
        description:'Minimum Amount of Wei to Contribute and become a project Approver'
      },
      {
        header:requestsCount,
        meta:'Number of Requests',
        description:'A request tries to withdraw money from the Campaign'
      },
      {
        header:approversCount,
        meta:'Number of Approvers',
        description:'Number of people who have already donated to this campaign'
      },
      {
        header: web3.utils.fromWei(balance,'ether'),
        meta:'Campaign Balance (ether)',
        description:'This balance is how much money this campaign has left to spend'
      }
      // {
      //   header:campaignName,
      //   meta:'Campaign Name',
      //   description:'This is the Name of the campaign'
      // }


    ];
    return <Card.Group items={items}/>;

  }

  render(){
  return (
    <Layout>
      <h3>Campaign Details</h3>

      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>
            {this.renderCards()}
          </Grid.Column>
          <Grid.Column width={6}>
            <ContributeForm address={this.props.address}/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
          <Link route={`/campaigns/${this.props.address}/requests`}>
            <a>
              <Button primary> View Requests</Button>
            </a>
          </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
    );
  }

}

export default CampaignShow;

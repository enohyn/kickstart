import React,{Component} from 'react';
import {Button,Table} from 'semantic-ui-react';
import{Link} from '../../../routes';
import Layout from '../../../components/Layout';
import Campaign from '../../../ethereum/campaign';
import RequestRow from '../../../components/RequestRow';

class RequestIndex extends Component {

  static async getInitialProps(props){
    const{address}= props.query;
    const campaign=Campaign(address);
    const requestCount=await campaign.methods.getRequestCount().call();
    const approverCount=await campaign.methods.approverCount().call();
    const requests=await Promise.all(
      Array(parseInt(requestCount)).fill().map((element,index)=>{
        return campaign.methods.requests(index).call();
      })
    );

    return{address,requests,requestCount,approverCount};

  }
  renderRows(){
    return this.props.requests.map((request,index)=>{
      return(<RequestRow
        key={index}
        id={index}
        request={request}
        address={this.props.address}
        approverCount={this.props.approverCount}
      />
    );
    });
  }

  render() {
    const{Header,Row,HeaderCell,Body}=Table;

    return(
      <Layout>
        <h3>Request List</h3>
        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <a>
          <Button primary floated="right" style={{marginBottom: 10}}>Add Request</Button>
          </a>
        </Link>
        <Table>
          <Header>
            <Row>
              <HeaderCell>Id</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
              <HeaderCell>Recipient</HeaderCell>
              <HeaderCell>Approval Count</HeaderCell>
              <HeaderCell>Approve</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>

            </Row>
          </Header>
          <Body>{this.renderRows()}</Body>
        </Table>
        <div><h3>Found {this.props.requestCount} requests.</h3></div>
      </Layout>
    );

  }
}
export default RequestIndex;

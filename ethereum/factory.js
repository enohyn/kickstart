import web3 from './web3';
import CampaignFactory from './build/:CampaignFactory.json';

const instance = new web3.eth.Contract(

  JSON.parse(CampaignFactory.interface),
  '0x337bf52B56a2b7Dd92930676A8ed756D546d7996'
);
export default instance;

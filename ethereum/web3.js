import Web3 from 'web3';

let web3;

if(typeof window !=='undefined' && typeof window.web3 !=='undefined'){
  web3= new Web3(window.web3.currentProvider);
}
else{
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/v3/1ae5a53923d64dabacae3d6b9252c6c5'
  );
  web3 = new Web3(provider);

}
export default web3;

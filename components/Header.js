  import React from 'react';
  import {Menu} from 'semantic-ui-react';
  import {Link} from '../routes';

  export default ()=>{
    return(
      <Menu style={{marginTop: '10px'}}>
        <Link route="/" >

          <a className="item">
            <h3>Crowd Funding</h3>
          </a>
        </Link>

        <Menu.Menu position="right">

        <Link route="/" >
          <a className="item">
            <h3>Campaigns</h3>
          </a>
        </Link>

        <Link route="/campaigns/new">
          <a className="item">
            <h3>+</h3>
          </a>
        </Link>

        </Menu.Menu>

      </Menu>

    );

  };

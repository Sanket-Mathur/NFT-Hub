import React from 'react';
import {Container} from 'reactstrap'
import "../assets/css/blk-design-system-react.css"

function PageHeader() {
	return (
		 <div className="page-header header-filter">
      <div className="squares square1" />
      <div className="squares square2" />
      <div className="squares square3" />
      <div className="squares square4" />
      <div className="squares square5" />
      <div className="squares square6" />
      <div className="squares square7" />
      <Container>
        <div className="content-center brand">
          <h1 className="h1-seo">NFT Hub</h1>
          <h3 className="d-none d-sm-block">
            Discover, collect, and sell extraordinary NFTs
NFT Hub  is the greatest NFT marketplace
          </h3>
        </div>
      </Container>
    </div>
	);
}

export default PageHeader;

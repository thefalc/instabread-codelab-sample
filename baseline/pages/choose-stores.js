import React, { Component } from 'react';
import Layout, { getBearerToken } from '../components/Layout';
import LoadingButton from '../components/LoadingButton';
import Skyflow from 'skyflow-js';

class ChooseStoresPage extends Component {
  constructor() {
    super();

    this.state = { }

    this.storeChangeHandler = this.storeChangeHandler.bind(this);
    this.chooseStoresHandler = this.chooseStoresHandler.bind(this);
    
    this.initStores();
    this.initShopperSkyflowId();
  }

  storeChangeHandler(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async initStores() {
    const response = await fetch('/api/list-stores', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'GET'
    });

    this.storeRecords = await response.json();
  }

  async initShopperSkyflowId() {
    const response = await fetch('/api/get-skyflow-id', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'GET'
    });

    const payload = await response.json();
    this.skyflowId = payload.skyflowId;
  }

  async chooseStoresHandler(event) {
    event.preventDefault();

    let storeMapping = [];
    let keys = Object.keys(this.state);

    // Maps selected stores to the list of stores and associates the
    // current shopper's Skyflow ID with the store entry.
    for(let i = 0; i < keys.length; i++) {
      let selectedStore = this.storeRecords.stores[keys[i] - 1];

      selectedStore.shoppers_skyflow_id = this.skyflowId;

      storeMapping.push({
        fields: selectedStore,
        table: 'shoppers_stores'
      });
    }

    alert('Functionality doesn\'t exist yet.');
  }

  render() {	
    return (
      <Layout title="instabread Shopper Requirements">
        <div>
          <div className="row justify-content-md-center">
            <div className="col-12 col align-self-center">
              <div style={{ margin: 20 }}>
                <h2 style={{ fontSize: 35 }}>Choose the stores you wish to shop at...</h2>
                <div className="mt-5 row">
                  <div className="col-1">
                    <input type="checkbox" name="1" value="Safeway" onChange={this.storeChangeHandler} />
                  </div>
                  <div className="col-8">
                    <p className="fw-bold">Safeway</p>
                    <p className="fw-light text-muted" style={{ fontSize: 14 }}>1343 Taravel Street<br />San Francisco, CA 94113</p>
                  </div>
                  <div className="col-3">
                    <img src="/static/images/safeway.png" className="img-fluid rounded-circle" />
                  </div>
                </div>

                <div className="mt-2 row">
                  <div className="col-1">
                    <input type="checkbox"  name="2" value="Lucky's" onChange={this.storeChangeHandler} />
                  </div>
                  <div className="col-8">
                    <p className="fw-bold">Lucky's Supermarket</p>
                    <p className="fw-light text-muted" style={{ fontSize: 14 }}>4502 Sloat Avenue<br />San Francisco, CA 94111</p>
                  </div>
                  <div className="col-3">
                    <img src="/static/images/luckys-logo.jpeg" className="img-fluid rounded-circle" />
                  </div>
                </div>

                <div className="mt-2 row">
                  <div className="col-1">
                    <input type="checkbox"  name="3" value="Wholefoods" onChange={this.storeChangeHandler} />
                  </div>
                  <div className="col-8">
                    <p className="fw-bold">Wholefoods</p>
                    <p className="fw-light text-muted" style={{ fontSize: 14 }}>457 Water Street<br />San Francisco, CA 94116</p>
                  </div>
                  <div className="col-3">
                    <img src="/static/images/whole-foods.png" className="img-fluid rounded-circle" />
                  </div>
                </div>

                <div className="mt-2 row">
                  <div className="col-1">
                    <input type="checkbox" name="4" value="Trader Joe's" onChange={this.storeChangeHandler} />
                  </div>
                  <div className="col-8">
                    <p className="fw-bold">Trader Joes</p>
                    <p className="fw-light text-muted" style={{ fontSize: 14 }}>96523 John Daly<br />San Francisco, CA 94119</p>
                  </div>
                  <div className="col-3">
                    <img src="/static/images/trader-joes.jpeg" className="img-fluid rounded-circle" />
                  </div>
                </div>

                <div className="mt-5">
                  <LoadingButton submitHandler={this.chooseStoresHandler} loadingText="Saving preferences..." defaultText="Continue" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default function Index() {
  return (
    <Layout>
      <ChooseStoresPage />
    </Layout>
  );
}

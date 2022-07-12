import Layout from '../components/Layout';
import LoadingButton from '../components/LoadingButton';
import React, { Component } from 'react';

class CashoutPage extends Component {
  constructor() {
    super();

    this.cashOutHandler = this.cashOutHandler.bind(this);
  }

  async cashOutHandler(event) {
    event.preventDefault();

    const res = await fetch('/api/cashout', {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }
    );

    const result = await res.json();
    if(result.ok === true) {
      window.location.href = '/execute-cashout';
    }
  }

  render() {	
    return (
      <Layout title="instabread cashout">
        <div>
          <h1 className="text-center mb-5 mt-3 fw-bold" style={{ fontSize: 20 }}>Instant Cashout</h1>

          <div className="text-center">
            <p className="fw-bold" style={{ fontSize: 30, marginBottom: 0 }}>$64.00</p>
          </div>

          <div className="row justify-content-md-center mt-4" style={{ margin: 0, width: "100%", }}>
            <div style={{ paddingLeft: 10, paddingRight: 10 }}>
              <hr style={{ color: "#ccc", marginBottom: 0 }} />
              </div>

            <div className="row mt-4 gx-2">
              <div className="col-8">
                <p className="fw-bold" style={{ fontSize: 16, marginBottom: 0, marginLeft: 5 }}>Delivery earnings</p>
              </div>
              <div className="col-4 text-end">
                <p style={{ fontSize: 16, marginBottom: 0 }}>$48.00</p>
              </div>
              <div className="col-8">
                <p className="fw-light text-muted" style={{ fontSize: 14, marginBottom: 0, marginLeft: 5 }}>Delivery pay</p>
              </div>
              <div className="col-4 text-end">
                <p className="fw-light text-muted" style={{ fontSize: 14, marginBottom: 0 }}>$48.00</p>
              </div>
            </div>

            <div className="row mt-4 gx-2">
              <div className="col-8">
                <p className="fw-bold" style={{ fontSize: 16, marginBottom: 0, marginLeft: 5 }}>Tips</p>
              </div>
              <div className="col-4 text-end">
                <p style={{ fontSize: 16, marginBottom: 0 }}>$16.00</p>
              </div>
              <div className="col-8">
                <p className="fw-light text-muted" style={{ fontSize: 14, marginBottom: 0, marginLeft: 5 }}>Final tips</p>
              </div>
              <div className="col-4 text-end">
                <p className="fw-light text-muted" style={{ fontSize: 14, marginBottom: 0 }}>$14.00</p>
              </div>
              <div className="col-8">
                <p className="fw-light text-muted" style={{ fontSize: 14, marginBottom: 0, marginLeft: 5 }}>Pending tips</p>
              </div>
              <div className="col-4 text-end">
                <p className="fw-light text-muted" style={{ fontSize: 14, marginBottom: 0 }}>$2.00</p>
              </div>
            </div>

            <div className="row mt-4 gx-2">
              <div className="col-8">
                <p className="fw-bold" style={{ fontSize: 16, marginBottom: 0 }}>Total</p>
              </div>
              <div className="col-4 text-end">
                <p className="fw-bold" style={{ fontSize: 16, marginBottom: 0 }}>$64.00</p>
              </div>
            </div>
          </div>

          <div className="row justify-content-md-center position-absolute bottom-0 mb-4" style={{ margin: 0, width: "100%", }}>
            <div style={{ paddingLeft: 10, paddingRight: 10 }}>
              <hr style={{ color: "#ccc", marginBottom: 0 }} />
            </div>

            <div className="mt-3">
              <LoadingButton submitHandler={this.cashOutHandler} iconText='<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffffff" class="bi bi-lightning" viewBox="0 0 16 16"><path d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641l2.5-8.5zM6.374 1 4.168 8.5H7.5a.5.5 0 0 1 .478.647L6.78 13.04 11.478 7H8a.5.5 0 0 1-.474-.658L9.306 1H6.374z"></path></svg>' loadingText="Cashing out..." defaultText="Cashout $64.00" />
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
      <CashoutPage />
    </Layout>
  );
}

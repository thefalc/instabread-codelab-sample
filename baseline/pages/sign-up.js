import Layout, { getBearerToken } from '../components/Layout';
import React, { Component } from 'react';
import Link from 'next/link'
import LoadingButton from '../components/LoadingButton';
import Skyflow from 'skyflow-js';

class SignUpForm extends Component {
  constructor() {
    super();

    this.state = {
      fname: '',
      lname: '',
      email: '',
      zipcode: '',
      phone: ''
    }

    this.fnameChangeHandler = this.fnameChangeHandler.bind(this);
    this.lnameChangeHandler = this.lnameChangeHandler.bind(this);
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.zipcodeChangeHandler = this.zipcodeChangeHandler.bind(this);
    this.phoneChangeHandler = this.phoneChangeHandler.bind(this);
    
    this.signUpHandler = this.signUpHandler.bind(this);
  }

  fnameChangeHandler(event) {
    this.setState({fname: event.target.value});
  }

  lnameChangeHandler(event) {
    this.setState({lname: event.target.value});
  }

  emailChangeHandler(event) {
    this.setState({email: event.target.value});
  }

  zipcodeChangeHandler(event) {
    this.setState({zipcode: event.target.value});
  }

  phoneChangeHandler(event) {
    this.setState({phone: event.target.value});
  }

  async signUpHandler(event) {
    event.preventDefault();

    alert('Functionality doesn\'t exist yet.');
  }

  render() {	
    return (
      <Layout title="instabread Shopper Sign Up">
        <div>
          <div className="row justify-content-md-center">
            <div className="col-12 col align-self-center">
              <div style={{ margin: 20 }}>
                <h2 style={{ fontSize: 35 }}>Sign up</h2>
                <form method="POST" onSubmit={this.loginHandler}>
                  <div className="mb-3 mt-5">
                    <input placeholder="First name" onChange={this.fnameChangeHandler} type="text" name="fname" className="form-control" id="inputFname" />
                  </div>
                  <div className="mb-3">
                    <input placeholder="Last name" onChange={this.lnameChangeHandler} type="text" name="lname" className="form-control" id="inputLname" />
                  </div>
                  <div className="mb-3">
                    <input placeholder="Email" onChange={this.emailChangeHandler} type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                  </div>
                  <div className="mb-3">
                    <input placeholder="ZIP code" onChange={this.zipcodeChangeHandler} type="text" name="zipcode" className="form-control" id="inputZipcode" />
                  </div>
                  <div className="mb-3">
                    <input placeholder="Phone number" onChange={this.phoneChangeHandler} type="text" name="phone" className="form-control" id="inputPhone" />
                  </div>
        
                  <div className="mt-3">
                    <Link href="javascript:alert('Not implemented')">
                      <a style={{ width: "100%", backgroundColor: "#eee" }} className="btn btn-light">Already a shopper? Log in</a>
                    </Link>
                  </div>

                  <div className="mt-2">
                    <LoadingButton submitHandler={this.signUpHandler} loadingText="Creating account..." defaultText="Create account" />
                  </div>
                </form>
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
      <SignUpForm />
    </Layout>
  );
}

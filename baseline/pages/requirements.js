import Link from 'next/link'
import Layout from '../components/Layout';

export default function Index() {
  return (
    <Layout title="instabread Shopper Requirements">
      <div>
        <div className="row justify-content-md-center">
          <div className="col-12 col align-self-center">
            <div style={{ margin: 20 }}>
              <h2 style={{ fontSize: 35 }}>Shoppers must be...</h2>
              <div className="mt-5">
                <p style={{ fontSize: 24, color: "#999" }}>18+ years of age</p>
                <hr />
              </div>

              <div className="mt-2">
                <p style={{ fontSize: 24, color: "#999" }}>Able to lift 40 lbs.</p>
                <hr />
              </div>

              <div className="mt-2">
                <p style={{ fontSize: 24, color: "#999" }}>Eligible to work in the United States</p>
                <hr />
              </div>

              <div className="mt-2">
                <p style={{ fontSize: 24, color: "#999" }}>Love bread!</p>
                <hr />
              </div>
    
              <div className="mt-3">
                <Link href="javascript:alert('Not implemented')">
                  <a style={{ width: "100%", backgroundColor: "#eee" }} className="btn btn-light">I don't meet the requirements</a>
                </Link>
              </div>

              <div className="mt-2">
                <Link href="/choose-stores">
                  <a style={{ width: "100%" }} className="btn btn-success">I meet the requirements</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

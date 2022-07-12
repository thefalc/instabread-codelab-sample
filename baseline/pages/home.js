import Layout from '../components/Layout';
import Link from 'next/link'

export default function Index() {
  return (
    <Layout>
      <Layout title="instabread home">
        <div>
          <h1 className="text-center mb-5 mt-3 fw-bold" style={{ fontSize: 20 }}>Earnings</h1>

          <div className="text-center">
            <p className="text-muted" style={{ marginBottom: 0 }}>Current balance</p>
            <p className="fw-bold" style={{ fontSize: 30, marginBottom: 0 }}>$64.00</p>
            <div className="mt-1">
              <Link href="/cashout">
                <a className="btn btn-success"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffffff" className="bi bi-lightning" viewBox="0 0 16 16">
                  <path d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641l2.5-8.5zM6.374 1 4.168 8.5H7.5a.5.5 0 0 1 .478.647L6.78 13.04 11.478 7H8a.5.5 0 0 1-.474-.658L9.306 1H6.374z"></path>
                </svg> Cashout $64.00</a>
              </Link>
            </div>
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
                <p className="fw-bold" style={{ fontSize: 16, marginBottom: 0, marginLeft: 5 }}>Total</p>
              </div>
              <div className="col-4 text-end">
                <p className="fw-bold" style={{ fontSize: 16, marginBottom: 0 }}>$64.00</p>
              </div>
            </div>
          </div>
          
          <div className="row justify-content-md-center mt-4" style={{ backgroundColor: "#F8F8F8", margin: 0, width: "100%", }}>
            <p className="text-muted" style={{ margin: 0, padding: 10 }}>Transaction history</p>
          </div>

          <div className="row justify-content-md-center mt-1 gx-0" style={{ margin: 0, width: "100%", }}>
            <div className="row gx-2">
              <div className="col-8">
                <p className="fw-bold" style={{ fontSize: 16, marginBottom: 0, marginLeft: 5, paddingTop: 5, paddingBottom: 5 }}>No history yet</p>
              </div>
            </div>
          </div>

          <div className="row justify-content-md-center mt-1" style={{ backgroundColor: "#F8F8F8", margin: 0, width: "100%", }}>
            <p className="text-muted" style={{ margin: 0, padding: 10 }}>Weekly earnings</p>
          </div>

          <div className="row justify-content-md-center mt-1 gx-0" style={{ margin: 0, width: "100%", }}>
            <div className="row gx-2">
              <div className="col-8">
                <p className="fw-bold" style={{ fontSize: 16, marginBottom: 0, marginLeft: 5, paddingTop: 5, paddingBottom: 5  }}>Current week</p>
              </div>
              <div className="col-4 text-end">
                <p className="text-muted" style={{ fontSize: 16, marginBottom: 0, paddingTop: 5, paddingBottom: 5 }}>$48.00 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"></path>
                </svg></p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </Layout>
  );
}

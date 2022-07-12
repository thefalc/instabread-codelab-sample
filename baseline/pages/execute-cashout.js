import Layout from '../components/Layout';
import Link from 'next/link'

export default function Index() {
  return (
    <Layout>
      <Layout title="instabread home">
        <div>
          
          <div className="row justify-content-md-center mt-4" style={{ margin: 0, width: "100%", }}>
            <div className="position-absolute top-50 start-50 translate-middle text-center justify-content-md-center">
              <svg style={{ color: "#0AAD0A" }} xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-check-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"></path>
              </svg>

              <p style={{ fontSize: 16, marginLeft: 40, marginRight: 40 }} className="text-muted mt-2 fw-light">Transferring $64.00 to your bank account</p>
            </div>
          </div>

          <div className="row justify-content-md-center position-absolute bottom-0 mb-4" style={{ margin: 0, width: "100%", }}>
            <div style={{ paddingLeft: 10, paddingRight: 10 }}>
              <hr style={{ color: "#ccc", marginBottom: 0 }} />
            </div>

            <div className="mt-3 text-center fw-bold">
              <Link href="/home">
                <a style={{ color: "#0AAD0A", textDecoration: "none" }}>Done</a>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    </Layout>
  );
}

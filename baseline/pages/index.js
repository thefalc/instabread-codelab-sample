import Link from 'next/link'
import Layout from '../components/Layout';

export default function Index() {
  return (
    <Layout title="instabread Shopper">
      <div className="bg-image"
          style={{ backgroundImage: "url('/static/images/bread.png')",
          height: "100vh", backgroundSize: "cover" }}>
        <h1 className="title text-center" style={{ paddingTop: 40 }}>instabread</h1>
        <div className="row justify-content-md-center position-absolute bottom-0" style={{ padding: 0, margin: 0, width: "100%" }}>
          <div className="col-12 col align-self-center" style={{ padding: 0 }}>
            <div className="" style={{ padding: 20, paddingBottom: 100 }}>
              <h2 style={{ fontSize: 35, color: "#fff" }}>Get paid to shop and deliver bread</h2>
              <div className="mt-3">
                <Link href="/sign-up">
                  <a style={{ width: "100%", backgroundColor: "#eee" }} className="btn btn-light">Sign up</a>
                </Link>  
              </div>
              <div className="mt-2">
                <Link href="javascript:alert('Not implemented')">
                  <a style={{ width: "100%" }} className="btn btn-success">Log in</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

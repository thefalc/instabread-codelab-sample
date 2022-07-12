import Layout from '../components/Layout';
import Link from 'next/link'

export default function Index() {
  return (
    <Layout>
      <Layout title="instabread Congratulations!">
        <div className="bg-image"
            style={{ backgroundImage: "url('/static/images/bread.png')",
            height: "100vh", backgroundSize: "cover" }}>
          <h1 className="title text-center">instabread</h1>
          <div className="row justify-content-md-center position-absolute bottom-0" style={{ padding: 0, margin: 0, width: "100%" }}>
            <div className="col-12 col align-self-center">
              <div  style={{ padding: 20, paddingBottom: 80 }}>
                <h2 className="text-center" style={{ fontSize: 35,  marginTop: 10 }}>Congratulations!</h2>
                <h3 className="text-center">You are ready to shop</h3>

                <div className="mt-4">
                  <Link href="/home">
                    <a style={{ width: "100%" }} className="btn btn-success">Continue to my home screen</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </Layout>
  );
}

import Link from 'next/link';
import Layout from '../components/Layout';

export default function Index() {
  return (
    <Layout title="instabread Shopper">
      <div style={{ marginTop: 100}}> 
        <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval="10000">
              <img src="/static/images/1.png" className="d-block text-center" alt="..." />
              <div className="carousel-caption d-md-block">
                <h5>How instabread works</h5>
                <p>Instabread connects shoppers with customers that need bread.</p>
              </div>
            </div>
            <div className="carousel-item" data-bs-interval="2000">
              <img src="/static/images/2.png" className="d-block" alt="..." />
              <div className="carousel-caption d-md-block">
                <h5>Get paid to shop</h5>
                <p>Shoppers use the app to find bread, and then submit an order for the requested items.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src="/static/images/3.png" className="d-block" alt="..." />
              <div className="carousel-caption d-md-block">
                <h5>Check out, then head out</h5>
                <p>As a shopper, you'll receive a bread order request, shop for the items and deliver it to the customer.</p>
              </div>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>    

        <div className="mt-2" style={{ paddingLeft: 10, paddingRight: 10}}>
          <Link href="/requirements">
            <a style={{ width: "100%" }} className="btn btn-success">Continue</a>
          </Link>
        </div>
      </div>
    </Layout>
  );
}

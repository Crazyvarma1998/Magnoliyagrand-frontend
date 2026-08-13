import { imageDimensions } from "../image-data";

export default function RoomsSuitesExperience({ hotels, benefits }) {
  if (!hotels?.length) return null;

  return (
    <>
      <section className="rooms-stays" aria-labelledby="rooms-stays-title">
        <header className="rooms-stays__header rooms-reveal">
          <p className="section-kicker">Everything your guests need, close at hand</p>
          <h2 id="rooms-stays-title">Two trusted stays.<br /><em>One seamless destination.</em></h2>
          <p>Give every guest the ease of staying moments from the celebration, whether they prefer the directly connected Hilton Garden Inn or the additional flexibility of Courtyard by Marriott.</p>
        </header>

        <div className="rooms-stays__list">
          {hotels.map((hotel, hotelIndex) => (
            <article className={`hotel-stay rooms-reveal${hotelIndex % 2 ? " hotel-stay--reverse" : ""}`} key={hotel.brand}>
              <div className="hotel-stay__gallery">
                <figure className="hotel-stay__main-image">
                  <img {...imageDimensions(hotel.images[0])} src={hotel.images[0]} alt={`${hotel.brand} guest room near Magnoliya Grand`} loading="lazy" decoding="async" />
                </figure>
                <figure className="hotel-stay__detail-image">
                  <img {...imageDimensions(hotel.images[1])} src={hotel.images[1]} alt={`${hotel.brand} room and suite accommodations`} loading="lazy" decoding="async" />
                </figure>
                <figure className="hotel-stay__accent-image">
                  <img {...imageDimensions(hotel.images[2])} src={hotel.images[2]} alt={`${hotel.brand} accommodations in Manassas, Virginia`} loading="lazy" decoding="async" />
                </figure>
                {hotel.eyebrow && <span className="hotel-stay__proximity">{hotel.eyebrow}</span>}
              </div>

              <div className="hotel-stay__copy">
                {hotel.eyebrow && <p className="section-kicker">{hotel.eyebrow}</p>}
                <h2 className="hotel-stay__brand">{hotel.brand}</h2>
                <h3>{hotel.title}</h3>
                <p>{hotel.description}</p>
                {hotel.features?.length > 0 && (
                  <ul>
                    {hotel.features.map((feature) => <li key={feature}>{feature}</li>)}
                  </ul>
                )}
                <a className="hotel-stay__link" href={hotel.link} target="_blank" rel="noreferrer">{hotel.linkLabel} <span aria-hidden="true">↗</span></a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {benefits?.length > 0 && (
        <section className="stay-benefits" aria-labelledby="stay-benefits-title">
          <header className="stay-benefits__header rooms-reveal">
            <p className="section-kicker">Designed for destination gatherings</p>
            <h2 id="stay-benefits-title">One occasion.<br /><em>Every comfort nearby.</em></h2>
          </header>
          <div className="stay-benefits__grid">
            {benefits.map((benefit) => (
              <article className="stay-benefit rooms-reveal" key={benefit.title}>
                <span aria-hidden="true" />
                <h3>{benefit.title}</h3>
                <p>{benefit.body}</p>
              </article>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

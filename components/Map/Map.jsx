import Map, { Marker, Popup } from 'react-map-gl';
import Image from 'next/image';
import { useState } from 'react';
import { Container } from '../Layout';
import styles from './Map.module.scss';

const MapComponent = () => {
  const [showMapPopup, setMapPopupState] = useState(false);

  const mapHandler = () => {
    showMapPopup === true ? setMapPopupState(false) : setMapPopupState(true);
  };
  const MAPBOX_TOKEN =
    process.env.NEXT_PUBLIC_MAPBOX_TOKEN ||
    'pk.eyJ1IjoiZmxhdGhlYWQiLCJhIjoiY2xhd3N1YnEzMDBsdTNxbGtzMzQ0eWhuNiJ9.f9RNXZYQ-fDNhyDbVNzO-w';

  return (
    <Container fullwidth className={styles.mapBox}>
      <Map
        initialViewState={{
          latitude: 54.19124657041915,
          longitude: 37.58919450004085,
          zoom: 15,
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle='mapbox://styles/mapbox/streets-v12'
        mapboxAccessToken={MAPBOX_TOKEN}
        onClick={mapHandler}
      >
        <Marker longitude={37.58919450004085} latitude={54.19124657041915}>
          <Image
            src={'/marker.png'}
            alt=''
            height={40}
            width={40}
            quality={60}
            loading='lazy'
          />
        </Marker>
        {showMapPopup && (
          <Popup
            longitude={37.58919450004085}
            latitude={54.19124657041915}
            anchor='center'
            onClose={() => setMapPopupState(false)}
          >
            <b>{process.env.NEXT_PUBLIC_SITE_NAME}</b>
            <br />
            <p>г.Тула, ул.Демонстрации, д.38В</p>
            <a
              href='https://yandex.ru/maps/15/tula/?ll=37.589194%2C54.191247&mode=routes&rtext=~54.191247%2C37.589195&rtt=auto&ruri=~ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgoxNjkwNTc5NjI3EkHQoNC%2B0YHRgdC40Y8sINCi0YPQu9CwLCDRg9C70LjRhtCwINCU0LXQvNC%2B0L3RgdGC0YDQsNGG0LjQuCwgMzjQkiIKDVZbFkIV18NYQg%3D%3D&z=16.57'
              target='_blank'
              rel='noreferrer'
            >
              Построить маршрут
            </a>
          </Popup>
        )}
      </Map>
    </Container>
  );
};

export default MapComponent;

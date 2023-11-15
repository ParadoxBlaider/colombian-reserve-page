import { Carousel } from 'antd';
import React from 'react';
import { Banners } from '../../services/booking/types';

interface BannerSectionProps {
  banners: Banners[]
}

const BannerSection: React.FC<BannerSectionProps> = ({ banners }) => {

  return (
    <div className='container-bookings___carousel_banners'>
      <Carousel autoplay>
        {
          banners.map((banner, index) => (
            <div key={index} className='h-[400px]'>
              <img className='w-full -translate-y-[30%]' src={banner.url} alt={`Banner ${index + 1}`} />
            </div>
          ))
        }
      </Carousel>
    </div>

  )
}

export default BannerSection
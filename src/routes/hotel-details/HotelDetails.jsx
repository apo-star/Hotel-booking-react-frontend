import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { networkAdapter } from '../../services/NetworkAdapter';
import GlobalNavbar from '../../components/gloabal-navbar/GlobalNavbar';
import HotelDetailsViewCard from './components/hotel-details-view-card/HotelDetailsViewCard';
import HotelDetailsViewCardSkeleton from './components/hotel-details-view-card-skeleton/HotelDetailsViewCardSkeleton';

const HotelDetails = () => {
  const { hotelId } = useParams();
  const [hotelDetails, setHotelDetails] = useState({
    isLoading: true,
    data: {},
  });

  useEffect(() => {
    const fetchHotelDetails = async () => {
      const response = await networkAdapter.get(`/api/hotel/${hotelId}`);
      console.log('response', response);
      setHotelDetails({
        isLoading: false,
        data: response.data,
      });
    };

    fetchHotelDetails();
  }, [hotelId]);

  return (
    <>
      <GlobalNavbar />
      {hotelDetails.isLoading ? (
        <HotelDetailsViewCardSkeleton />
      ) : (
        <HotelDetailsViewCard hotelDetails={hotelDetails.data} />
      )}
    </>
  );
};

export default HotelDetails;
import React, { useState, useEffect, useRef } from 'react';
import Tabs from 'components/ux/tabs/Tabs';
import TabPanel from 'components/ux/tab-panel/TabPanel';
import {
  faAddressCard,
  faHotel,
  faCreditCard,
} from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from 'contexts/AuthContext';
import { networkAdapter } from 'services/NetworkAdapter';
import { useContext } from 'react';
import PaymentMethodsPanel from './components/PaymentsMethodsPanel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import useOutsideClickHandler from 'hooks/useOutsideClickHandler';
import { useNavigate } from 'react-router-dom';
import BookingPanel from './components/BookingPanel';
import ProfileDetailsPanel from './components/ProfileDetailsPanel';

/**
 * UserProfile
 * Renders the user profile page with tabs for personal details, bookings, and payment methods.
 * @returns {JSX.Element} - The UserProfile component
 * */
const UserProfile = () => {
  const { userDetails } = useContext(AuthContext);
  const [paymentMethods, setPaymentMethods] = useState(mockPaymentMethods);
  const [isTabsVisible, setIsTabsVisible] = useState(false);

  // Fetch user bookings data
  const [userBookingsData, setUserBookingsData] = useState({
    isLoading: true,
    data: [],
    errors: [],
  });

  const wrapperRef = useRef();
  const buttonRef = useRef();

  const navigate = useNavigate();

  useOutsideClickHandler(wrapperRef, (event) => {
    if (!buttonRef.current.contains(event.target)) {
      setIsTabsVisible(false);
    }
  });

  // effect to set initial state of user details
  useEffect(() => {
    if (!userDetails) {
      navigate('/login');
    }
  }, [navigate, userDetails]);

  // effect to set initial state of user bookings data
  useEffect(() => {
    const getInitialData = async () => {
      const userBookingsDataResponse = await networkAdapter.get(
        '/api/users/bookings'
      );
      if (userBookingsDataResponse && userBookingsDataResponse.data) {
        setUserBookingsData({
          isLoading: false,
          data: userBookingsDataResponse.data.elements,
          errors: userBookingsDataResponse.errors,
        });
      }
    };
    getInitialData();
  }, []);

  const onTabsMenuButtonAction = () => {
    setIsTabsVisible(!isTabsVisible);
  };

  return (
    <>
      <div className="container mx-auto p-4 my-10 min-h-[530px]">
        <div className="mx-4">
          <button
            ref={buttonRef}
            onClick={onTabsMenuButtonAction}
            className="block md:hidden items-center px-4 py-1.5 border border-gray-300 font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FontAwesomeIcon
              icon={isTabsVisible ? faXmark : faBars}
              size="lg"
            />
          </button>
        </div>
        <Tabs isTabsVisible={isTabsVisible} wrapperRef={wrapperRef}>
          <TabPanel label="Personal Details" icon={faAddressCard}>
            <ProfileDetailsPanel userDetails={userDetails} />
          </TabPanel>
          <TabPanel label="Bookings" icon={faHotel}>
            <BookingPanel bookings={userBookingsData.data} />
          </TabPanel>
          <TabPanel label="Payment details" icon={faCreditCard}>
            <PaymentMethodsPanel
              paymentMethods={paymentMethods}
              setPaymentMethods={setPaymentMethods}
            />
          </TabPanel>
        </Tabs>
      </div>
    </>
  );
};

const mockPaymentMethods = [
  {
    cardType: 'Visa',
    cardNumber: '**** **** **** 1234',
    expiryDate: '08/26',
  },
  {
    cardType: 'MasterCard',
    cardNumber: '**** **** **** 5678',
    expiryDate: '07/24',
  },
  {
    cardType: 'American Express',
    cardNumber: '**** **** **** 9012',
    expiryDate: '05/25',
  },
];

export default UserProfile;

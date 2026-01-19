import Flipkart from './flipkart.png' 
import Amazon from './amazon.png'
import Myntra from './Myntra.png'

const comparisonData = [
  {
    vendor: 'Flipkart',
    logoUrl: Flipkart, 
    price: '₹27,990',
    rating: 4.7,
    coupon: 'Extra ₹500 off with Plus',
    couponTag: 'PLUSDEAL',
    buttonStyle: 'orange'
  },
  {
    vendor: 'Amazon',
    logoUrl: Amazon,
    price: '₹28,499',
    rating: 4.6,
    coupon: null,
    couponTag: null,
    buttonStyle: 'orange'
  },
  {
    vendor: 'Myntra',
    logoUrl: Myntra,
    price: '₹29,150',
    rating: 4.9,
    coupon: 'Flat 10% off (Max ₹1000)',
    couponTag: 'MYNTRA10',
    buttonStyle: 'pink'
  }
];

export default comparisonData;

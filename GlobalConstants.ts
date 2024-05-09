const base = 'https://api-car-history-nu.vercel.app/';
// const base = 'http://localhost:3100/';
export const endpoints = {
  mileage: {
    recents: base+'mileage/recents',
    status: base + 'mileage/status',
    checkin: base + 'mileage/checkin',
    checkout: base + 'mileage/checkout',
    all: base + 'mileage/all',
    find: base + 'mileage/find',
  },
  gasInfo: {
    all: base + 'mileage/gasInfo',
    specific: base + 'mileage/gasInfo/specific',
  }
};


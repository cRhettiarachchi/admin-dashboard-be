const allRoles = {
  user: ['manageUser', 'getUser', 'ownPayments'],
  admin: [
    'getUsers',
    'manageUsers',
    'getProperties',
    'manageProperties',
    'manageUser',
    'managePayments',
    'getPayments',
    'getUser',
    'ownPayments',
  ],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));
const propertyTypes = ['Flat', 'HMO', 'Cottage', 'House', 'Rooms'];
const paymentType = ['cash', 'bank', 'card'];

module.exports = {
  roles,
  roleRights,
  propertyTypes,
  paymentType,
};

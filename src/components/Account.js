import React, { useState, useEffect } from 'react';
import '../styles/Account.css';

const Account = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // In a real application, you would fetch this data from your API
    // This is just a mock-up for demonstration purposes
    const mockUser = {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'manager', // This could be 'admin', 'manager', 'customer', or 'person'
      lastLogin: '2023-10-20T10:30:00Z',
      // Add more fields as needed
    };
    setUser(mockUser);
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  const renderAdminInfo = () => (
    <div>
      <h3>Admin Controls</h3>
      <ul>
        <li>Manage Users</li>
        <li>System Settings</li>
        <li>View All Analytics</li>
      </ul>
    </div>
  );

  const renderManagerInfo = () => (
    <div>
      <h3>Manager Tools</h3>
      <ul>
        <li>Team Management</li>
        <li>Reports Overview</li>
      </ul>
    </div>
  );

  const renderCustomerInfo = () => (
    <div>
      <h3>Customer Dashboard</h3>
      <ul>
        <li>Your Subscriptions</li>
        <li>Billing Information</li>
      </ul>
    </div>
  );

  const renderPersonInfo = () => (
    <div>
      <h3>Personal Dashboard</h3>
      <ul>
        <li>Your Activity</li>
        <li>Notifications</li>
      </ul>
    </div>
  );

  return (
    <div className="account-container">
      <h2>Account Information</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <p><strong>Last Login:</strong> {new Date(user.lastLogin).toLocaleString()}</p>
      
      {user.role === 'admin' && renderAdminInfo()}
      {user.role === 'manager' && renderManagerInfo()}
      {user.role === 'customer' && renderCustomerInfo()}
      {user.role === 'person' && renderPersonInfo()}

      <button className="edit-profile-btn">Edit Profile</button>
      <button className="change-password-btn">Change Password</button>
    </div>
  );
};

export default Account;

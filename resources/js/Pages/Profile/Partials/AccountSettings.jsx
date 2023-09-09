// AccountSettings.jsx
import React from 'react';

import DeleteUserForm from './DeleteUserForm';
import UpdatePasswordForm from './UpdatePasswordForm';

function AccountSettings() {
  return (
    <div>
      <h2>Account Settings Content</h2>
      <UpdatePasswordForm />
      <DeleteUserForm />
    </div>
  );
}

export default AccountSettings;

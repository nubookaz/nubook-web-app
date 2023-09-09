// ProfileSettings.jsx
import React from 'react';

import UpdateProfileInformationForm from './UpdateProfileInformationForm';

function ProfileSettings({ mustVerifyEmail, status }) {
  return (
    <div>
      <h3>Profile Settings</h3>
      <UpdateProfileInformationForm
            mustVerifyEmail={mustVerifyEmail}
            status={status}
            className="max-w-xl"
        />
    </div>
  );
}

export default ProfileSettings;

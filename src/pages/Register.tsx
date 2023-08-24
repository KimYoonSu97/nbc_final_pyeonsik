import React, { useState } from 'react';
import SignUpForm from 'src/components/register/SignUpForm';
import ProfileSetForm from 'src/components/register/ProfileSetForm';

// 회원가입

const Register = () => {
  const [nextStep, setNextStep] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  return (
    <>
      {nextStep ? (
        <ProfileSetForm userEmail={userEmail} />
      ) : (
        <SignUpForm setNextStep={setNextStep} setUserEmail={setUserEmail} />
      )}
    </>
  );
};
export default Register;

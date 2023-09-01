import React, { useState } from 'react';
import ProfileSetForm from 'src/components/register/ProfileSetForm';
import SignUpForm from 'src/components/register/SignUpForm';

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

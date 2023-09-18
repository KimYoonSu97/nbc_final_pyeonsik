import { useAtom } from 'jotai';
import React, { useState } from 'react';
import ProfileSetForm from 'src/components/register/ProfileSetForm';
import SignUpForm from 'src/components/register/SignUpForm';
import { userSettingEmail, userSignUp } from 'src/globalState/jotai';

const Register = () => {
  const [nextStep, setNextStep] = useAtom(userSignUp);
  const [userEmail, setUserEmail] = useAtom(userSettingEmail);

  return <>{nextStep ? <ProfileSetForm /> : <SignUpForm setNextStep={setNextStep} setUserEmail={setUserEmail} />}</>;
};

export default Register;

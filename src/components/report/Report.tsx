import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useAtom } from 'jotai';
import { stepAtom } from 'src/globalState/jotai';
import ReportStep1 from './ReportStep1';
import ReportStep2 from './ReportStep2';
import ReportStep3 from './ReportStep3';
import ReportStep4 from './ReportStep4';


const Report = () => {
  const [step,] = useAtom(stepAtom);

  return (
    <ReportWrap>
      {step === 1 && <ReportStep1 />}
      {step === 2 && <ReportStep2 />}
      {step === 3 && <ReportStep3 />}
      {step === 4 && <ReportStep4 />}
    </ReportWrap>
  );
};

export default Report;

const ReportWrap = styled.div`
  margin-top: 70px;
`;

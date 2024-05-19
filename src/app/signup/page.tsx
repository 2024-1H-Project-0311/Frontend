/* eslint-disable quotes */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable lines-around-directive */
/* eslint-disable no-alert */
'use client';

import { Montserrat } from 'next/font/google';
import React, { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { signupUserInfo } from '@/api/user.ts';

const mont = Montserrat({ subsets: ['latin'], weight: ['400'] });

function Page() {
  const today = dayjs();
  const [selectedRadio, setSelectedRadio] = useState<string>('radio-1');
  const [birthDate, setBirthDate] = useState<Dayjs | null>(today);
  const [name, setName] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [fadeOut, setFadeOut] = useState(false);

  // const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSelectedTheme(event.target.value);
  // };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRadio(event.target.value);
  };

  const handleSubmit = async () => {
    // 유효성 검사: 이름과 지역이 모두 입력되었는지 확인
    if (!name.trim() || !location.trim()) {
      // alert('이름과 지역을 설정해주세요!');
      setShowAlert(true);
      setErrorMessage('이름과 지역을 설정해주세요!');
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          setShowAlert(false);
          setFadeOut(false);
        }, 1000); // fadeOut 애니메이션 시간과 일치시킵니다.
      }, 3000);
      return;
    }

    // location의 형식이 '시'와 '구'로 이루어진지 검사
    const locationRegex = /^[가-힣]+시 [가-힣]+구$/;
    if (!locationRegex.test(location.trim())) {
      // alert('지역을 "~~시 ~~구" 형식으로 입력해주세요!');
      setShowAlert(true);
      setErrorMessage(`지역을 '~~시 ~~구' 형식으로 입력해주세요!`);
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          setShowAlert(false);
          setFadeOut(false);
        }, 1000); // fadeOut 애니메이션 시간과 일치시킵니다.
      }, 3000);
      return; // 지역 형식이 맞지 않으면 함수 종료
    }

    const gender = selectedRadio === 'radio-1' ? 'M' : 'F';
    const formattedBirthDate = birthDate ? birthDate.format('YYYY-MM-DD') : '';

    await signupUserInfo(name, formattedBirthDate, gender, location);
  };

  return (
    <div className="flex flex-col items-center">
      <div>
        <h1 className="mb-14 mt-20 flex flex-row text-3xl font-light">
          <p className={`text-center text-3xl ${mont.className}`}>MOITDA</p>에
          오신 것을 환영합니다!
        </h1>
      </div>
      <div className="ml-1">
        <div className="text-[#505050]">성별</div>
        <div className="mb-4 flex flex-row items-center">
          {/* 첫 번째 라디오 버튼 */}
          <p className="mr-1">남</p>
          <input
            type="radio"
            name="radio-1"
            style={{ width: '18px', height: '18px' }}
            className="radio mr-2"
            value="radio-1"
            checked={selectedRadio === 'radio-1'}
            onChange={handleRadioChange}
          />
          {/* 두 번째 라디오 버튼 */}
          <p className="mr-1">여</p>
          <input
            type="radio"
            name="radio-1"
            style={{ width: '18px', height: '18px' }}
            className="radio"
            value="radio-2"
            checked={selectedRadio === 'radio-2'}
            onChange={handleRadioChange}
          />
        </div>
        <div className="mb-1 mt-2 text-[#505050]">생년월일</div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            className="mb-4 flex w-80"
            label=""
            value={birthDate}
            onChange={(date) => setBirthDate(date)}
          />
        </LocalizationProvider>
        <div className="mb-1 text-[#505050]">이름</div>
        <input
          type="text"
          className="input mb-4 h-10 w-80 border border-b border-black"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <div className="mb-1 text-[#505050]">지역</div>
        <input
          type="text"
          className="input mb-4 h-10 w-80 border border-b border-black"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
        />
        {/* <div className="dropdown dropdown-end dropdown-bottom">
          <div tabIndex={0} role="button" className="btn">
            {selectedTheme}
            <svg
              className="inline-block h-2 w-2 fill-current opacity-60"
              viewBox="0 0 2048 2048"
            >
              <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-10 w-52 rounded-box bg-base-200 p-2 shadow-2xl"
          >
            {cityList.map((district, index) => (
              <li key={`${index}`}>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="theme-controller btn btn-ghost btn-sm btn-block justify-start"
                  aria-label={`${district}`}
                  value={`${district}`}
                  onChange={handleThemeChange}
                />
              </li>
            ))}
          </ul>
        </div> */}
      </div>
      <button
        onClick={handleSubmit}
        className="border-40 mt-16 h-14 w-72 rounded-md border border-[#1A1A1A] bg-[#1A1A1A] font-extralight text-white"
      >
        기본 회원정보 저장
      </button>
      {showAlert && (
        <div
          role="alert"
          className={`alert-gray alert fixed top-0 mt-4 w-2/3 bg-[#ff6262] text-black ${fadeOut ? 'alert-fade-out' : ''}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
}

export default Page;

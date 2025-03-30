// import { useEffect, useState, useRef } from "react";

// Clé publique
import { useState, useEffect, useRef } from 'react';

export const RECAPTCHA_PUBLIC_KEY = "6Le0SuYqAAAAAHfMcbGHjP1Ggqpsa_ynGieVDhqL"
// import { RECAPTCHA_PUBLIC_KEY } from '../../utils/recaptcha';

const useRecaptcha = () => {
  const refRecaptcha = useRef(null);
  const [recaptchaToken, setRecaptchaToken] = useState(null);

  const handleRecaptcha = (value) => {
    setRecaptchaToken(value);
  };

  const resetRecaptcha = () => {
    setRecaptchaToken(null);
    if (refRecaptcha.current) {
      refRecaptcha.current.reset();
    }
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_PUBLIC_KEY}`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return {
    refRecaptcha,
    recaptchaToken,
    handleRecaptcha,
    resetRecaptcha,
  };
};

export default useRecaptcha;



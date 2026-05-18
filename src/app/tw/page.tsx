"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function TaiwanTeaserPage() {
  const regSectionRef = useRef<HTMLDivElement>(null);
  const guideNameRef = useRef<HTMLInputElement>(null);
  const travelerNameRef = useRef<HTMLInputElement>(null);

  const [guideCount, setGuideCount] = useState(0);
  const [travelerCount, setTravelerCount] = useState(0);

  // ガイド用ステート
  const [gName, setGName] = useState('');
  const [gEmail, setGEmail] = useState('');
  const [gCat, setGCat] = useState('');
  const [gAgree, setGAgree] = useState(false);
  const [isGuideSubmitted, setIsGuideSubmitted] = useState(false);
  const [isSubmittingGuide, setIsSubmittingGuide] = useState(false);

  // 旅行者用ステート
  const [tName, setTName] = useState('');
  const [tEmail, setTEmail] = useState('');
  const [tInterest, setTInterest] = useState('');
  const [tAgree, setTAgree] = useState(false);
  const [isTravelerSubmitted, setIsTravelerSubmitted] = useState(false);
  const [isSubmittingTraveler, setIsSubmittingTraveler] = useState(false);

  useEffect(() => {
    const fetchStatsAndAnimate = async () => {
      let targetGuides = 0;
      let targetTravelers = 0;

      try {
        const response = await fetch('/api/stats');
        const data = await response.json();
        if (data.success) {
          targetGuides = data.guideCount;
          targetTravelers = data.travelerCount;
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }

      const animateCounter = (setCount: React.Dispatch<React.SetStateAction<number>>, end: number, duration: number) => {
        let start = 0;
        if (end === 0) {
          setCount(0);
          return;
        }
        const step = end / (duration / 16);
        const timer = setInterval(() => {
          start += step;
          if (start >= end) {
            setCount(end);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);
      };

      animateCounter(setGuideCount, targetGuides, 1200);
      animateCounter(setTravelerCount, targetTravelers, 1200);
    };

    fetchStatsAndAnimate();
  }, []);

  const scrollToReg = (type?: 'guide' | 'traveler') => {
    regSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (type === 'guide') {
      setTimeout(() => guideNameRef.current?.focus(), 600);
    } else if (type === 'traveler') {
      setTimeout(() => travelerNameRef.current?.focus(), 600);
    }
  };

  const submitGuideForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gName || !gEmail) {
      alert('請輸入您的姓名與電子郵件地址。');
      return;
    }
    if (!gAgree) {
      alert('您必須同意使用條款與隱私權政策。');
      return;
    }
    setIsSubmittingGuide(true);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'ガイド登録', name: gName, email: gEmail, category: gCat }),
      });
      
      const data = await response.json();
      
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Network response was not ok');
      }

      setIsGuideSubmitted(true);
      setGuideCount(prev => prev + 1);
    } catch (error: any) {
      console.error(error);
      alert(`通訊發生錯誤: ${error.message}`);
    } finally {
      setIsSubmittingGuide(false);
    }
  };

  const submitTravelerForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tName || !tEmail) {
      alert('Please enter your name and email.');
      return;
    }
    if (!tAgree) {
      alert('You must agree to the Terms and Privacy Policy.');
      return;
    }
    setIsSubmittingTraveler(true);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: '旅行者登録', name: tName, email: tEmail, category: tInterest }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Network response was not ok');
      }

      setIsTravelerSubmitted(true);
      setTravelerCount(prev => prev + 1);
    } catch (error: any) {
      console.error(error);
      alert(`通訊發生錯誤: ${error.message}`);
    } finally {
      setIsSubmittingTraveler(false);
    }
  };

  const [activeTab, setActiveTab] = useState<'tourist' | 'guide'>('tourist');
  const switchTab = (type: 'tourist' | 'guide') => {
    setActiveTab(type);
  };

  return (
    <>
      <style jsx global>{`
        body { font-family: 'Sora', 'Noto Sans TC', sans-serif; background: var(--bg); color: var(--text); min-height: 100vh; overflow-x: hidden; }
        :root { --coral: #F97B5A; --coral-light: #FFF0EC; --coral-mid: #FFDED5; --blue: #4B9EFF; --blue-light: #EBF4FF; --purple: #8B6FFF; --purple-light: #F0ECFF; --green: #22C97A; --green-light: #EDFBF3; --text: #1A1A2E; --text2: #5A5A7A; --text3: #9898B0; --bg: #FAFAF9; --white: #FFFFFF; --border: #EAEAF0; --radius: 16px; --radius-sm: 10px; }
        nav { background: var(--white); border-bottom: 1px solid var(--border); padding: 0 2rem; display: flex; align-items: center; justify-content: space-between; height: 64px; position: sticky; top: 0; z-index: 100; }
        .logo { display: flex; align-items: center; gap: 10px; }
        .logo-bubbles { position: relative; width: 36px; height: 36px; flex-shrink: 0; }
        .b1 { position: absolute; width: 22px; height: 22px; background: linear-gradient(135deg, #FF7E6B, #FF9B8A); border-radius: 50%; top: 2px; left: 0; opacity: 0.9; }
        .b2 { position: absolute; width: 20px; height: 20px; background: linear-gradient(135deg, #6EC6FF, #94D8FF); border-radius: 50%; top: 0; left: 12px; opacity: 0.85; }
        .b3 { position: absolute; width: 16px; height: 16px; background: linear-gradient(135deg, #B085FF, #C9A8FF); border-radius: 50%; top: 10px; left: 6px; opacity: 0.9; }
        .b4 { position: absolute; width: 8px; height: 8px; background: linear-gradient(135deg, #6EC6FF, #94D8FF); border-radius: 50%; top: 24px; left: 14px; opacity: 0.8; }
        .b5 { position: absolute; width: 7px; height: 7px; background: linear-gradient(135deg, #FF7E6B, #FF9B8A); border-radius: 50%; top: 4px; left: 28px; opacity: 0.75; }
        .logo-text { font-size: 22px; font-weight: 800; letter-spacing: -0.5px; color: var(--text); }
        .nav-right { display: flex; align-items: center; gap: 12px; }
        .launch-pill { background: var(--green-light); color: #0E8A50; font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 100px; letter-spacing: 0.4px; display: flex; align-items: center; gap: 5px; }
        .launch-dot { width: 6px; height: 6px; background: var(--green); border-radius: 50%; animation: pulse 2s infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(0.85); } }
        .nav-btn { background: var(--text); color: #fff; border: none; padding: 8px 20px; border-radius: 100px; font-size: 13px; font-weight: 600; cursor: pointer; font-family: inherit; transition: opacity .2s; }
        .nav-btn:hover { opacity: 0.85; }
        .banner { background: var(--text); color: #fff; text-align: center; padding: 10px 2rem; font-size: 12px; font-weight: 500; letter-spacing: 0.3px; }
        .banner span { color: #FF9B8A; font-weight: 700; }
        .hero { padding: 72px 2rem 60px; text-align: center; background: var(--white); }
        .hero-tag { display: inline-flex; align-items: center; gap: 6px; background: var(--coral-light); color: #C04A2A; font-size: 12px; font-weight: 600; padding: 5px 14px; border-radius: 100px; margin-bottom: 28px; letter-spacing: 0.3px; }
        .hero h1 { font-size: clamp(34px, 6vw, 58px); font-weight: 800; line-height: 1.1; letter-spacing: -1.5px; color: var(--text); max-width: 700px; margin: 0 auto 20px; }
        .hero h1 .accent { background: linear-gradient(135deg, #FF7E6B, #B085FF); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .hero-sub { font-size: 16px; color: var(--text2); max-width: 500px; margin: 0 auto 10px; line-height: 1.8; font-family: 'Noto Sans TC', sans-serif; }
        .hero-launch { font-size: 13px; color: var(--text3); margin-bottom: 44px; font-weight: 500; }
        .hero-launch strong { color: var(--green); font-weight: 700; }
        .hero-ctas { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
        .btn-dark { background: var(--text); color: #fff; border: none; padding: 13px 26px; border-radius: 100px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: inherit; transition: opacity .2s, transform .2s; }
        .btn-dark:hover { opacity: 0.88; transform: translateY(-1px); }
        .btn-outline { background: var(--white); color: var(--text); border: 1.5px solid var(--border); padding: 13px 26px; border-radius: 100px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: inherit; transition: border-color .2s, transform .2s; }
        .btn-outline:hover { border-color: #aaa; transform: translateY(-1px); }
        .counter-bar { border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); padding: 28px 2rem; display: flex; justify-content: center; gap: 56px; flex-wrap: wrap; background: var(--white); }
        .counter { text-align: center; }
        .counter-num { font-size: 26px; font-weight: 800; letter-spacing: -1px; color: var(--text); }
        .counter-num.coral { color: var(--coral); }
        .counter-num.blue { color: var(--blue); }
        .counter-label { font-size: 11px; color: var(--text3); margin-top: 3px; font-family: 'Noto Sans TC', sans-serif; }
        .reg-section { padding: 72px 2rem; background: var(--bg); }
        .section-label { font-size: 11px; font-weight: 700; letter-spacing: 2.5px; color: var(--coral); text-transform: uppercase; text-align: center; margin-bottom: 12px; }
        .section-title { font-size: clamp(22px, 4vw, 30px); font-weight: 800; text-align: center; letter-spacing: -0.5px; margin-bottom: 12px; color: var(--text); }
        .section-desc { font-size: 14px; color: var(--text2); text-align: center; margin-bottom: 48px; font-family: 'Noto Sans TC', sans-serif; }
        .reg-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; max-width: 860px; margin: 0 auto; }
        .reg-card { border-radius: 20px; padding: 36px 30px; border: 1.5px solid var(--border); background: var(--white); transition: border-color .2s, transform .2s; }
        .reg-card:hover { transform: translateY(-2px); }
        .reg-card.guide { border-color: var(--coral-mid); }
        .reg-card.traveler { border-color: #C0DCFF; }
        .reg-badge { display: inline-flex; align-items: center; gap: 5px; font-size: 11px; font-weight: 700; padding: 4px 11px; border-radius: 100px; margin-bottom: 18px; letter-spacing: 0.4px; }
        .reg-badge.guide { background: var(--coral-light); color: #C04A2A; }
        .reg-badge.traveler { background: var(--blue-light); color: #1860A8; }
        .reg-card h2 { font-size: 18px; font-weight: 800; margin-bottom: 8px; letter-spacing: -0.3px; line-height: 1.3; }
        .reg-card .card-desc { font-size: 12.5px; color: var(--text2); line-height: 1.65; margin-bottom: 20px; font-family: 'Noto Sans TC', sans-serif; }
        .reg-perks { list-style: none; margin-bottom: 24px; padding: 0; }
        .reg-perks li { font-size: 12px; color: var(--text2); padding: 4px 0; display: flex; align-items: flex-start; gap: 8px; font-family: 'Noto Sans TC', sans-serif; }
        .perk-check { width: 15px; height: 15px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; font-size: 8px; font-weight: 900; }
        .perk-check.coral { background: var(--coral-light); color: var(--coral); }
        .perk-check.blue { background: var(--blue-light); color: var(--blue); }
        .reg-form { display: flex; flex-direction: column; gap: 9px; }
        .reg-form input[type="text"], .reg-form input[type="email"], .reg-form select { width: 100%; padding: 11px 14px; border: 1.5px solid var(--border); border-radius: 10px; font-size: 13.5px; font-family: inherit; color: var(--text); background: var(--white); outline: none; transition: border-color .2s; -webkit-appearance: none; }
        .reg-form input[type="text"]::placeholder, .reg-form input[type="email"]::placeholder { color: var(--text3); }
        .reg-form input.g:focus { border-color: var(--coral); }
        .reg-form input.t:focus { border-color: var(--blue); }
        .reg-form select { cursor: pointer; }
        
        .agree-label { display: flex; align-items: flex-start; gap: 8px; font-size: 11.5px; color: var(--text2); margin: 6px 0 12px; cursor: pointer; line-height: 1.5; font-family: 'Noto Sans TC', sans-serif; }
        .agree-label input { margin-top: 2px; width: 14px; height: 14px; cursor: pointer; }
        .agree-label.g input { accent-color: var(--coral); }
        .agree-label.t input { accent-color: var(--blue); }
        .agree-label a { color: var(--text); text-decoration: underline; font-weight: 600; }
        .agree-label a:hover { color: var(--coral); }
        
        .submit-btn { width: 100%; padding: 13px; border: none; border-radius: 12px; font-size: 14px; font-weight: 700; cursor: pointer; font-family: inherit; transition: opacity .2s, transform .2s; margin-top: 4px; }
        .submit-btn:hover { opacity: 0.88; transform: translateY(-1px); }
        .submit-btn.guide { background: var(--text); color: #fff; }
        .submit-btn.traveler { background: linear-gradient(135deg, #4B9EFF, #7B6FFF); color: #fff; }
        .success-msg { text-align: center; padding: 16px 0 4px; }
        .success-icon { font-size: 40px; margin-bottom: 12px; }
        .success-title { font-size: 16px; font-weight: 700; color: var(--text); margin-bottom: 8px; }
        .success-body { font-size: 12.5px; color: var(--text2); line-height: 1.65; font-family: 'Noto Sans TC', sans-serif; }
        
        .section { padding: 72px 2rem; background: var(--white); }
        .tabs { display: flex; gap: 8px; justify-content: center; margin-bottom: 40px; background: var(--border); padding: 4px; border-radius: 100px; width: fit-content; margin-left: auto; margin-right: auto; }
        .tab { padding: 8px 24px; border-radius: 100px; border: none; font-size: 13px; font-weight: 600; cursor: pointer; font-family: inherit; transition: all .2s; background: transparent; color: var(--text2); }
        .tab.active { background: var(--white); color: var(--text); box-shadow: 0 1px 4px rgba(0,0,0,0.08); }
        .steps { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 24px; max-width: 900px; margin: 0 auto; }
        .step { background: var(--white); border: 1px solid var(--border); border-radius: var(--radius); padding: 28px; position: relative; overflow: hidden; }
        .step-num { font-size: 48px; font-weight: 800; color: var(--border); position: absolute; top: 12px; right: 16px; line-height: 1; letter-spacing: -2px; }
        .step-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 20px; margin-bottom: 16px; }
        .step-icon.coral { background: var(--coral-light); color: var(--coral); }
        .step-icon.blue { background: var(--blue-light); color: var(--blue); }
        .step-icon.purple { background: var(--purple-light); color: var(--purple); }
        .step h3 { font-size: 15px; font-weight: 700; margin-bottom: 8px; color: var(--text); }
        .step p { font-size: 13px; color: var(--text2); line-height: 1.6; font-family: 'Noto Sans TC', sans-serif; }
        .step-content { display: none; }
        .step-content.active { display: grid; }

        .concept-section { padding: 72px 2rem; background: var(--white); }
        .concept-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; max-width: 860px; margin: 0 auto; }
        .concept-card { background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius); padding: 26px 20px; transition: transform .2s; }
        .concept-card:hover { transform: translateY(-2px); }
        .concept-emoji { font-size: 28px; margin-bottom: 12px; display: block; }
        .concept-card h3 { font-size: 13.5px; font-weight: 700; margin-bottom: 7px; color: var(--text); }
        .concept-card p { font-size: 12px; color: var(--text2); line-height: 1.65; font-family: 'Noto Sans TC', sans-serif; }
        
        .cats-section { padding: 72px 2rem; background: var(--bg); }
        .cats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 14px; max-width: 860px; margin: 0 auto; }
        .cat { background: var(--white); border: 1px solid var(--border); border-radius: var(--radius); padding: 20px 12px; text-align: center; transition: transform .2s; }
        .cat:hover { transform: translateY(-2px); }
        .cat-emoji { font-size: 26px; margin-bottom: 10px; display: block; }
        .cat-name { font-size: 12px; font-weight: 700; color: var(--text); }
        .cat-soon { font-size: 10px; color: var(--text3); margin-top: 3px; background: var(--bg); display: inline-block; padding: 2px 7px; border-radius: 100px; font-weight: 500; }
        
        .guides-section { background: var(--white); padding: 72px 2rem; }
        .guides-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px; max-width: 900px; margin: 0 auto; }
        .guide-card { background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; transition: transform .2s; }
        .guide-card:hover { transform: translateY(-3px); }
        .guide-img { height: 140px; display: flex; align-items: center; justify-content: center; font-size: 48px; position: relative; }
        .guide-img.g1 { background: linear-gradient(135deg, #FFE8E0, #FFD0C0); }
        .guide-img.g2 { background: linear-gradient(135deg, #E0F0FF, #C8E4FF); }
        .guide-img.g3 { background: linear-gradient(135deg, #EDE0FF, #DDD0FF); }
        .rank-badge { position: absolute; top: 10px; right: 10px; background: var(--text); color: #fff; font-size: 10px; font-weight: 700; padding: 3px 8px; border-radius: 100px; letter-spacing: 0.5px; }
        .guide-info { padding: 16px; }
        .guide-name { font-size: 15px; font-weight: 700; color: var(--text); margin-bottom: 4px; }
        .guide-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px; }
        .guide-tag { font-size: 11px; background: var(--border); color: var(--text2); padding: 3px 8px; border-radius: 100px; font-weight: 500; }
        .guide-tag.coral { background: var(--coral-light); color: #C04A2A; }
        .guide-meta { display: flex; justify-content: space-between; align-items: center; }
        .guide-price { font-size: 14px; font-weight: 700; color: var(--text); }
        .guide-price span { font-size: 11px; font-weight: 400; color: var(--text3); }
        .guide-rating { font-size: 12px; color: var(--text2); display: flex; align-items: center; gap: 3px; }
        .stars { color: #FFB700; }

        .timeline-section { padding: 72px 2rem; background: var(--white); }
        .timeline { display: flex; gap: 0; max-width: 820px; margin: 0 auto; position: relative; }
        .timeline::before { content: ''; position: absolute; top: 19px; left: calc(16.666% + 8px); right: calc(16.666% + 8px); height: 2px; background: var(--border); z-index: 0; }
        .tl-step { flex: 1; text-align: center; position: relative; z-index: 1; }
        .tl-dot { width: 14px; height: 14px; border-radius: 50%; margin: 0 auto 11px; border: 2px solid var(--border); background: var(--white); }
        .tl-dot.done { background: var(--green); border-color: var(--green); }
        .tl-dot.active { background: var(--coral); border-color: var(--coral); }
        .tl-label { font-size: 11px; font-weight: 700; color: var(--text3); margin-bottom: 3px; }
        .tl-label.done { color: var(--green); }
        .tl-label.active { color: var(--coral); }
        .tl-sub { font-size: 10.5px; color: var(--text3); font-family: 'Noto Sans TC', sans-serif; line-height: 1.4; }
        
        .cta-section { padding: 80px 2rem; text-align: center; background: var(--text); color: #fff; position: relative; overflow: hidden; }
        .cta-section::before { content: ''; position: absolute; top: -120px; right: -100px; width: 450px; height: 450px; background: radial-gradient(circle, rgba(255,126,107,0.18), transparent 60%); pointer-events: none; }
        .cta-section::after { content: ''; position: absolute; bottom: -80px; left: -80px; width: 340px; height: 340px; background: radial-gradient(circle, rgba(176,133,255,0.13), transparent 60%); pointer-events: none; }
        .cta-section h2 { font-size: clamp(24px, 4vw, 36px); font-weight: 800; letter-spacing: -1px; margin-bottom: 14px; line-height: 1.2; }
        .cta-section h2 .accent { background: linear-gradient(135deg, #FF9B8A, #C9A8FF); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .cta-section p { font-size: 14px; color: rgba(255,255,255,0.55); margin-bottom: 36px; font-family: 'Noto Sans TC', sans-serif; line-height: 1.8; }
        .cta-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
        .btn-white { background: #fff; color: var(--text); border: none; padding: 13px 26px; border-radius: 100px; font-size: 14px; font-weight: 700; cursor: pointer; font-family: inherit; transition: opacity .2s, transform .2s; }
        .btn-white:hover { opacity: 0.92; transform: translateY(-1px); }
        .btn-ghost { background: transparent; color: #fff; border: 1.5px solid rgba(255,255,255,0.3); padding: 13px 26px; border-radius: 100px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: inherit; transition: border-color .2s, transform .2s; }
        .btn-ghost:hover { border-color: rgba(255,255,255,0.65); transform: translateY(-1px); }
        
        footer { background: var(--bg); padding: 32px 2rem 24px; border-top: 1px solid var(--border); }
        .footer-inner { max-width: 860px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap; }
        .footer-logo { display: flex; align-items: center; gap: 8px; }
        .flb { position: relative; width: 28px; height: 28px; }
        .fb1 { position: absolute; width: 17px; height: 17px; background: linear-gradient(135deg, #FF7E6B, #FF9B8A); border-radius: 50%; top: 2px; left: 0; }
        .fb2 { position: absolute; width: 15px; height: 15px; background: linear-gradient(135deg, #6EC6FF, #94D8FF); border-radius: 50%; top: 0; left: 9px; }
        .fb3 { position: absolute; width: 12px; height: 12px; background: linear-gradient(135deg, #B085FF, #C9A8FF); border-radius: 50%; top: 8px; left: 5px; }
        .footer-logo-text { font-size: 16px; font-weight: 800; color: var(--text); }
        .footer-copy { font-size: 12px; color: var(--text3); }
        .footer-links { display: flex; gap: 20px; }
        .footer-links a { font-size: 12px; color: var(--text3); text-decoration: none; transition: color .2s; }
        .footer-links a:hover { color: var(--text); }

        @media(max-width: 680px) {
          nav { padding: 0 1rem; }
          .hero { padding: 52px 1.25rem 52px; }
          .reg-grid { grid-template-columns: 1fr; }
          .concept-grid { grid-template-columns: 1fr; }
          .counter-bar { gap: 24px; padding: 24px 1rem; }
          .reg-section, .concept-section, .cats-section, .timeline-section, .cta-section { padding: 52px 1.25rem; }
          .timeline { flex-direction: column; gap: 20px; }
          .timeline::before { display: none; }
          footer { padding: 24px 1.25rem; }
          .footer-inner { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Noto+Sans+TC:wght@400;500;700&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

      <div className="banner">🎉 cocora 目前正在緊鑼密鼓籌備中。現在搶先進行事前登記，即可獲得<span>優先早期體驗特典</span>！</div>

      <nav>
        <div className="logo">
          <div className="logo-bubbles">
            <div className="b1"></div><div className="b2"></div><div className="b3"></div><div className="b4"></div><div className="b5"></div>
          </div>
          <span className="logo-text">cocora</span>
        </div>
        <div className="nav-right">
          <div className="launch-pill"><div className="launch-dot"></div>2026年 服務即將開始</div>
          <button className="nav-btn" onClick={() => scrollToReg()}>事前登記</button>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-tag">🇯🇵 深度體驗、真實日本</div>
        <h1>你的「興趣」<br /><span className="accent">將改變旅程。</span></h1>
        <p className="hero-sub">媒合日本在地人與外國旅客。與擁有相同愛好的在地嚮導一起，體驗公路車、動漫聖地巡禮、在地美食等專屬行程。</p>
        <p className="hero-launch">服務預計於 <strong>2026 年正式上線</strong>。現在就加入登記，做好搶先出發的準備。</p>
        <div className="hero-ctas">
          <button className="btn-dark" onClick={() => scrollToReg('guide')}>搶先登記成為嚮導 →</button>
          <button className="btn-outline" onClick={() => scrollToReg('traveler')}>以旅客身分事前登記</button>
        </div>
      </section>

      <div className="counter-bar">
        <div className="counter">
          <div className="counter-num coral">{guideCount}</div>
          <div className="counter-label">在地嚮導已登記人數</div>
        </div>
        <div className="counter">
          <div className="counter-num blue">{travelerCount}</div>
          <div className="counter-label">預約旅客已登記人數</div>
        </div>
        <div className="counter">
          <div className="counter-num">89</div>
          <div className="counter-label">預計開放體驗類別</div>
        </div>
        <div className="counter">
          <div className="counter-num">47都道府縣</div>
          <div className="counter-label">預計涵蓋服務區域</div>
        </div>
      </div>

      <section className="reg-section" ref={regSectionRef} id="registration">
        <div className="section-label">EARLY ACCESS</div>
        <div className="section-title">完成事前登記領取限定特典</div>
        <div className="section-desc">我們為在地嚮導與造訪旅客準備了各自的專屬福利。立即登記，搶先一步迎接上線。</div>

        <div className="reg-grid">
          {/* GUIDE CARD */}
          <div className="reg-card guide">
            <div className="reg-badge guide">🗾 登記成為在地嚮導</div>
            <h2>將興趣轉化為收入。<br />開啟您的斜槓伴遊體驗。</h2>
            <p className="card-desc">活用您所熱愛的事物，為外國旅客帶路導覽吧！不需要任何特殊的專業導遊執照。</p>
            <ul className="reg-perks">
              <li><div className="perk-check coral">✓</div>服務正式開通時獲得最優先通知</li>
              <li><div className="perk-check coral">✓</div>首月平台使用手續費 <strong>0%</strong> 全免</li>
              <li><div className="perk-check coral">✓</div>早期加入者限定的專屬快速升級管道</li>
              <li><div className="perk-check coral">✓</div>個人檔案建置與優化全程協助（免費）</li>
            </ul>
            
            {!isGuideSubmitted ? (
              <form className="reg-form" onSubmit={submitGuideForm}>
                <input type="text" placeholder="您的姓名" required ref={guideNameRef} value={gName} onChange={(e) => setGName(e.target.value)} className="g" />
                <input type="email" placeholder="電子郵件地址" required value={gEmail} onChange={(e) => setGEmail(e.target.value)} className="g" />
                <select value={gCat} onChange={(e) => setGCat(e.target.value)}>
                  <option value="" disabled>選擇您最擅長的領域主題（自由填寫）</option>
                  <option>🚴 公路車騎行・單車旅遊</option>
                  <option>⛩️ 動漫愛好・聖地巡禮</option>
                  <option>🍜 在地私房美食探索</option>
                  <option>📷 攝影外拍・街頭散策</option>
                  <option>🏔️ 登山健行・戶外探險</option>
                  <option>🎮 電玩遊戲・次文化交流</option>
                  <option>🎋 茶道・武道・日本傳統文化</option>
                  <option>🧘 禪修・正念冥想體驗</option>
                  <option>其他領域</option>
                </select>
                
                {/* 👇 修正箇所：利用規約とプライバシーのリンクを /tw/terms と /tw/privacy に修正 */}
                <label className="agree-label g">
                  <input type="checkbox" checked={gAgree} onChange={(e) => setGAgree(e.target.checked)} required />
                  <span>我同意<Link href="/tw/terms" target="_blank">使用條款</Link>與<Link href="/tw/privacy" target="_blank">隱私權政策</Link></span>
                </label>
                
                <button type="submit" disabled={isSubmittingGuide} className="submit-btn guide">
                  {isSubmittingGuide ? '傳送中...' : '登記成為在地嚮導 →'}
                </button>
              </form>
            ) : (
              <div className="success-msg" style={{ display: 'block' }}>
                <div className="success-icon">🎉</div>
                <div className="success-title">非常感謝您的登記！</div>
                <div className="success-body">服務正式推出時，我們將第一時間與您聯繫。<br />特典詳細福利資訊已寄送至您的信箱，請至信箱確認。</div>
              </div>
            )}
          </div>

          {/* TRAVELER CARD */}
          <div className="reg-card traveler">
            <div className="reg-badge traveler">✈️ 登記成為預約旅客</div>
            <h2>深入小眾獨特行程，<br />探索最真實的日本。</h2>
            <p className="card-desc">傳統旅遊書上絕對找不到的深度體驗，與當地的日本人一起度過特別的旅程時光。</p>
            <ul className="reg-perks">
              <li><div className="perk-check blue">✓</div>服務正式開通時獲得最優先上線通知</li>
              <li><div className="perk-check blue">✓</div>直接獲贈首趟行程預約 <strong className="text-blue">10% OFF</strong> 優惠券</li>
              <li><div className="perk-check blue">✓</div>獲得優先預約早期加入精選嚮導的權利</li>
              <li><div className="perk-check blue">✓</div>享有VIP專屬英語/外語客服優先支援</li>
            </ul>

            {!isTravelerSubmitted ? (
              <form className="reg-form" onSubmit={submitTravelerForm}>
                <input type="text" placeholder="Your name" required ref={travelerNameRef} value={tName} onChange={(e) => setTName(e.target.value)} className="t" />
                <input type="email" placeholder="Email address" required value={tEmail} onChange={(e) => setTEmail(e.target.value)} className="t" />
                <select value={tInterest} onChange={(e) => setTInterest(e.target.value)}>
                  <option value="" disabled>What are you interested in? (Optional)</option>
                  <option>🚴 Road cycling</option>
                  <option>⛩️ Anime pilgrimage</option>
                  <option>🍜 Local food tours</option>
                  <option>📷 Photo walks</option>
                  <option>🏔️ Hiking</option>
                  <option>🎮 Gaming &amp; subculture</option>
                  <option>🎋 Traditional culture</option>
                  <option>🧘 Zen / Mindfulness</option>
                  <option>Other</option>
                </select>
                
                {/* 👇 修正箇所：旅行者用のリンクも /tw/terms と /tw/privacy に修正 */}
                <label className="agree-label t">
                  <input type="checkbox" checked={tAgree} onChange={(e) => setTAgree(e.target.checked)} required />
                  <span>I agree to the <Link href="/tw/terms" target="_blank">Terms</Link> and <Link href="/tw/privacy" target="_blank">Privacy Policy</Link>.</span>
                </label>
                
                <button type="submit" disabled={isSubmittingTraveler} className="submit-btn traveler">
                  {isSubmittingTraveler ? 'Sending...' : 'Register as Traveler →'}
                </button>
              </form>
            ) : (
              <div className="success-msg" style={{ display: 'block' }}>
                <div className="success-icon">🌸</div>
                <div className="success-title">You're on the list!</div>
                <div className="success-body">We'll notify you as soon as cocora launches.<br />Check your email for your 10% OFF coupon.</div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">HOW IT WORKS</div>
        <h2>使用方法非常簡單</h2>
        <div className="tabs">
          <button className={`tab ${activeTab === 'tourist' ? 'active' : ''}`} onClick={() => switchTab('tourist')}>旅客（外國人）</button>
          <button className={`tab ${activeTab === 'guide' ? 'active' : ''}`} onClick={() => switchTab('guide')}>在地嚮導（日本人）</button>
        </div>

        {activeTab === 'tourist' && (
          <div className="step-content active steps">
            <div className="step">
              <div className="step-num">01</div>
              <div className="step-icon coral"><i className="fa fa-calendar-plus"></i></div>
              <h3>登記旅遊行程</h3>
              <p>輸入日期、想做的事與個人喜好。想體驗多冷門的小眾行程都能自由填寫。</p>
            </div>
            <div className="step">
              <div className="step-num">02</div>
              <div className="step-icon blue"><i className="fa fa-comments"></i></div>
              <h3>收到嚮導提案</h3>
              <p>符合您興趣的在地嚮導將發送導覽提案。您可以查看對方的個人檔案進行挑選。</p>
            </div>
            <div className="step">
              <div className="step-num">03</div>
              <div className="step-icon purple"><i className="fa fa-lock"></i></div>
              <h3>安全預約與付款</h3>
              <p>使用信用卡進行加密安全支付。體驗結束後還可以撰寫評價。</p>
            </div>
            <div className="step">
              <div className="step-num">04</div>
              <div className="step-icon coral"><i className="fa fa-star"></i></div>
              <h3>享受專屬獨特體驗</h3>
              <p>與日本在地人的真實互動。就像和當地的朋友一起出遊般，自然地進行交流。</p>
            </div>
          </div>
        )}

        {activeTab === 'guide' && (
          <div className="step-content active steps">
            <div className="step">
              <div className="step-num">01</div>
              <div className="step-icon coral"><i className="fa fa-id-card"></i></div>
              <h3>個人身分驗證</h3>
              <p>為了維護平台的安全與信任，嚮導皆須使用個人身分證件進行嚴格的身分核實。</p>
            </div>
            <div className="step">
              <div className="step-num">02</div>
              <div className="step-icon blue"><i className="fa fa-user-pen"></i></div>
              <h3>建立個人檔案</h3>
              <p>填寫您的興趣、愛好與專長。不管是公路車、動漫聖地還是地方美食，任何主題皆可。</p>
            </div>
            <div className="step">
              <div className="step-num">03</div>
              <div className="step-icon purple"><i className="fa fa-yen-sign"></i></div>
              <h3>自由設定時薪</h3>
              <p>可依據個人經驗與頭銜自由調整時薪。累積的導覽經驗越多，報酬回饋越豐厚。</p>
            </div>
            <div className="step">
              <div className="step-num">04</div>
              <div className="step-icon coral"><i className="fa fa-handshake"></i></div>
              <h3>開始嚮導活動</h3>
              <p>您可以主動向旅客發送導覽提案，或接受前來諮詢的預約，正式展開活動。</p>
            </div>
          </div>
        )}
      </section>

      <section className="concept-section">
        <div className="section-label">CONCEPT</div>
        <div className="section-title">關於 cocora</div>
        <div className="section-desc" style={{ marginBottom: '40px' }}>完全顛覆傳統導遊模式，打造全新形態的深度旅遊伴遊體驗。</div>
        <div className="concept-grid">
          <div className="concept-card">
            <span className="concept-emoji">🤝</span>
            <h3>如朋友般的在地伴遊</h3>
            <p>他們不是照本宣科的專業導遊，而是與您擁有相同愛好的日本在地人。像和老朋友出遊般自然自在。</p>
          </div>
          <div className="concept-card">
            <span className="concept-emoji">🎯</span>
            <h3>專注於獨特小眾體驗</h3>
            <p>公路車騎行、動漫聖地巡禮、深夜屋台文化——我們只提供傳統旅遊書上絕對找不到的深度行程。</p>
          </div>
          <div className="concept-card">
            <span className="concept-emoji">🔒</span>
            <h3>安全可靠的機制設計</h3>
            <p>每位嚮導皆通過實名身分驗證。付款採用信託暫管機制，並配備完善的專屬客服支援，旅遊更安心。</p>
          </div>
        </div>
      </section>

      <section className="cats-section">
        <div className="section-label">CATEGORIES</div>
        <div className="section-title">豐富特別的旅程正等待著你</div>
        <div className="section-desc" style={{ marginBottom: '40px' }}>服務啟動時首波開放的體驗主題類別。</div>
        <div className="cats-grid">
          <div className="cat"><span className="cat-emoji">🚴</span><div className="cat-name">公路車騎行</div><div className="cat-soon">Coming Soon</div></div>
          <div className="cat"><span className="cat-emoji">⛩️</span><div className="cat-name">動漫聖地巡禮</div><div className="cat-soon">Coming Soon</div></div>
          <div className="cat"><span className="cat-emoji">🍜</span><div className="cat-name">在地私房美食</div><div className="cat-soon">Coming Soon</div></div>
          <div className="cat"><span className="cat-emoji">📷</span><div className="cat-name">攝影外拍散策</div><div className="cat-soon">Coming Soon</div></div>
          <div className="cat"><span className="cat-emoji">🏔️</span><div className="cat-name">登山健行</div><div className="cat-soon">Coming Soon</div></div>
          <div className="cat"><span className="cat-emoji">🎮</span><div className="cat-name">遊戲與電玩次文化</div><div className="cat-soon">Coming Soon</div></div>
          <div className="cat"><span className="cat-emoji">🎋</span><div className="cat-name">茶道與傳統武道</div><div className="cat-soon">Coming Soon</div></div>
          <div className="cat"><span className="cat-emoji">🧘</span><div className="cat-name">禪修與正念冥想</div><div className="cat-soon">Coming Soon</div></div>
        </div>
      </section>
      
      <section className="guides-section">
        <div className="section-label">FEATURED GUIDES</div>
        <h2>超人氣熱門在地嚮導</h2>
        <div className="guides-grid">
          <div className="guide-card">
            <div className="guide-img g1">🚴<div className="rank-badge">GOLD</div></div>
            <div className="guide-info">
              <div className="guide-name">Kenji T. · 東京</div>
              <div className="guide-tags">
                <span className="guide-tag coral">公路車</span>
                <span className="guide-tag">荒川自行車道</span>
                <span className="guide-tag">富士山麓</span>
              </div>
              <div className="guide-meta">
                <div className="guide-price">¥3,500<span>/小時</span></div>
                <div className="guide-rating"><span className="stars">★★★★★</span> 4.9 (48)</div>
              </div>
            </div>
          </div>
          <div className="guide-card">
            <div className="guide-img g2">⛩️<div className="rank-badge">PLATINUM</div></div>
            <div className="guide-info">
              <div className="guide-name">Yuki M. · 京都/大阪</div>
              <div className="guide-tags">
                <span className="guide-tag coral">聖地巡禮</span>
                <span className="guide-tag">動漫迷</span>
                <span className="guide-tag">Cosplay</span>
              </div>
              <div className="guide-meta">
                <div className="guide-price">¥5,000<span>/小時</span></div>
                <div className="guide-rating"><span className="stars">★★★★★</span> 5.0 (91)</div>
              </div>
            </div>
          </div>
          <div className="guide-card">
            <div className="guide-img g3">🍜<div className="rank-badge">SILVER</div></div>
            <div className="guide-info">
              <div className="guide-name">Hana S. · 福岡</div>
              <div className="guide-tags">
                <span className="guide-tag coral">在地美食</span>
                <span className="guide-tag">路邊攤屋台</span>
                <span className="guide-tag">居酒屋</span>
              </div>
              <div className="guide-meta">
                <div className="guide-price">¥2,200<span>/小時</span></div>
                <div className="guide-rating"><span className="stars">★★★★☆</span> 4.7 (33)</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="timeline-section">
        <div className="section-label">ROADMAP</div>
        <div className="section-title">服務正式上線進度規劃</div>
        <div className="section-desc" style={{ marginBottom: '44px' }}>目前正處於限時事前登記階段。</div>
        <div className="timeline">
          <div className="tl-step">
            <div className="tl-dot done"></div>
            <div className="tl-label done">✓ 已完成</div>
            <div className="tl-sub">概念核心設計<br />系統需求定義</div>
          </div>
          <div className="tl-step">
            <div className="tl-dot active"></div>
            <div className="tl-label active">← 目前階段</div>
            <div className="tl-sub">開放事前登記<br />限時招募中</div>
          </div>
          <div className="tl-step">
            <div className="tl-dot"></div>
            <div className="tl-label">系統開發</div>
            <div className="tl-sub">媒合平台<br />核心架構研發</div>
          </div>
          <div className="tl-step">
            <div className="tl-dot"></div>
            <div className="tl-label">β 測試版</div>
            <div className="tl-sub">邀請登記用戶<br />進行封閉測試</div>
          </div>
          <div className="tl-step">
            <div className="tl-dot"></div>
            <div className="tl-label">正式上線</div>
            <div className="tl-sub">2026年<br />全面開放營運</div>
          </div>
          <div className="tl-step">
            <div className="tl-dot"></div>
            <div className="tl-label">規模擴大</div>
            <div className="tl-sub">推廣至全日本<br />推行專屬App</div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>用你的熱情與專長，<br /><span className="accent">為他人徹底改變這趟旅程。</span></h2>
        <p>非常適合做為您的副業或興趣的延伸。不需具備任何特殊專業導遊執照，<br />您的在地知識與熱情，都將成為外國旅客眼中無價的珍寶。</p>
        <div className="cta-btns">
          <button className="btn-white" onClick={() => scrollToReg('guide')}>搶先登記成為嚮導</button>
          <button className="btn-ghost" onClick={() => scrollToReg('traveler')}>以旅客身分探索日本</button>
        </div>
      </section>

      <footer>
        <div className="footer-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="logo-bubbles" style={{ width: '24px', height: '24px', transform: 'scale(0.65)', transformOrigin: 'left center' }}>
              <div className="b1"></div><div className="b2"></div><div className="b3"></div>
            </div>
            <span style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text)' }}>cocora</span>
          </div>
          <div className="footer-copy">© 2026 cocora Inc. All rights reserved.</div>
          
          {/* 👇 修正箇所：フッターのリンクも /tw/terms と /tw/privacy に修正 */}
          <div className="footer-links">
            <Link href="/tw/terms">使用條款</Link>
            <Link href="/tw/privacy">隱私權保護政策</Link>
            <a href="https://mefar.jp/contact" target="_blank" rel="noopener noreferrer">聯絡我們</a>
          </div>
        </div>
      </footer>
    </>
  );
}
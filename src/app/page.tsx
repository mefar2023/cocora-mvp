"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function TeaserPage() {
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
      alert('お名前とメールアドレスを入力してください。');
      return;
    }
    if (!gAgree) {
      alert('利用規約とプライバシーポリシーへの同意が必要です。');
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
      alert(`通信エラーが発生しました: ${error.message}`);
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
      alert(`通信エラーが発生しました: ${error.message}`);
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
        body { font-family: 'Sora', 'Noto Sans JP', sans-serif; background: var(--bg); color: var(--text); min-height: 100vh; overflow-x: hidden; }
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
        .hero-sub { font-size: 16px; color: var(--text2); max-width: 500px; margin: 0 auto 10px; line-height: 1.8; font-family: 'Noto Sans JP', sans-serif; }
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
        .counter-label { font-size: 11px; color: var(--text3); margin-top: 3px; font-family: 'Noto Sans JP', sans-serif; }
        .reg-section { padding: 72px 2rem; background: var(--bg); }
        .section-label { font-size: 11px; font-weight: 700; letter-spacing: 2.5px; color: var(--coral); text-transform: uppercase; text-align: center; margin-bottom: 12px; }
        .section-title { font-size: clamp(22px, 4vw, 30px); font-weight: 800; text-align: center; letter-spacing: -0.5px; margin-bottom: 12px; color: var(--text); }
        .section-desc { font-size: 14px; color: var(--text2); text-align: center; margin-bottom: 48px; font-family: 'Noto Sans JP', sans-serif; }
        .reg-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; max-width: 860px; margin: 0 auto; }
        .reg-card { border-radius: 20px; padding: 36px 30px; border: 1.5px solid var(--border); background: var(--white); transition: border-color .2s, transform .2s; }
        .reg-card:hover { transform: translateY(-2px); }
        .reg-card.guide { border-color: var(--coral-mid); }
        .reg-card.traveler { border-color: #C0DCFF; }
        .reg-badge { display: inline-flex; align-items: center; gap: 5px; font-size: 11px; font-weight: 700; padding: 4px 11px; border-radius: 100px; margin-bottom: 18px; letter-spacing: 0.4px; }
        .reg-badge.guide { background: var(--coral-light); color: #C04A2A; }
        .reg-badge.traveler { background: var(--blue-light); color: #1860A8; }
        .reg-card h2 { font-size: 18px; font-weight: 800; margin-bottom: 8px; letter-spacing: -0.3px; line-height: 1.3; }
        .reg-card .card-desc { font-size: 12.5px; color: var(--text2); line-height: 1.65; margin-bottom: 20px; font-family: 'Noto Sans JP', sans-serif; }
        .reg-perks { list-style: none; margin-bottom: 24px; padding: 0; }
        .reg-perks li { font-size: 12px; color: var(--text2); padding: 4px 0; display: flex; align-items: flex-start; gap: 8px; font-family: 'Noto Sans JP', sans-serif; }
        .perk-check { width: 15px; height: 15px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; font-size: 8px; font-weight: 900; }
        .perk-check.coral { background: var(--coral-light); color: var(--coral); }
        .perk-check.blue { background: var(--blue-light); color: var(--blue); }
        .reg-form { display: flex; flex-direction: column; gap: 9px; }
        .reg-form input[type="text"], .reg-form input[type="email"], .reg-form select { width: 100%; padding: 11px 14px; border: 1.5px solid var(--border); border-radius: 10px; font-size: 13.5px; font-family: inherit; color: var(--text); background: var(--white); outline: none; transition: border-color .2s; -webkit-appearance: none; }
        .reg-form input[type="text"]::placeholder, .reg-form input[type="email"]::placeholder { color: var(--text3); }
        .reg-form input.g:focus { border-color: var(--coral); }
        .reg-form input.t:focus { border-color: var(--blue); }
        .reg-form select { cursor: pointer; }
        
        /* 同意チェックボックスのスタイル */
        .agree-label { display: flex; align-items: flex-start; gap: 8px; font-size: 11.5px; color: var(--text2); margin: 6px 0 12px; cursor: pointer; line-height: 1.5; font-family: 'Noto Sans JP', sans-serif; }
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
        .success-body { font-size: 12.5px; color: var(--text2); line-height: 1.65; font-family: 'Noto Sans JP', sans-serif; }
        
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
        .step p { font-size: 13px; color: var(--text2); line-height: 1.6; font-family: 'Noto Sans JP', sans-serif; }
        .step-content { display: none; }
        .step-content.active { display: grid; }

        .concept-section { padding: 72px 2rem; background: var(--white); }
        .concept-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; max-width: 860px; margin: 0 auto; }
        .concept-card { background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius); padding: 26px 20px; transition: transform .2s; }
        .concept-card:hover { transform: translateY(-2px); }
        .concept-emoji { font-size: 28px; margin-bottom: 12px; display: block; }
        .concept-card h3 { font-size: 13.5px; font-weight: 700; margin-bottom: 7px; color: var(--text); }
        .concept-card p { font-size: 12px; color: var(--text2); line-height: 1.65; font-family: 'Noto Sans JP', sans-serif; }
        
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
        .tl-sub { font-size: 10.5px; color: var(--text3); font-family: 'Noto Sans JP', sans-serif; line-height: 1.4; }
        
        .cta-section { padding: 80px 2rem; text-align: center; background: var(--text); color: #fff; position: relative; overflow: hidden; }
        .cta-section::before { content: ''; position: absolute; top: -120px; right: -100px; width: 450px; height: 450px; background: radial-gradient(circle, rgba(255,126,107,0.18), transparent 60%); pointer-events: none; }
        .cta-section::after { content: ''; position: absolute; bottom: -80px; left: -80px; width: 340px; height: 340px; background: radial-gradient(circle, rgba(176,133,255,0.13), transparent 60%); pointer-events: none; }
        .cta-section h2 { font-size: clamp(24px, 4vw, 36px); font-weight: 800; letter-spacing: -1px; margin-bottom: 14px; line-height: 1.2; }
        .cta-section h2 .accent { background: linear-gradient(135deg, #FF9B8A, #C9A8FF); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .cta-section p { font-size: 14px; color: rgba(255,255,255,0.55); margin-bottom: 36px; font-family: 'Noto Sans JP', sans-serif; line-height: 1.8; }
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
      <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Noto+Sans+JP:wght@400;500;700&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

      <div className="banner">🎉 ココラ（cocora）は現在準備中です。今すぐ事前登録して<span>早期アクセス特典</span>をゲット！</div>

      <nav>
        <div className="logo">
          <div className="logo-bubbles">
            <div className="b1"></div><div className="b2"></div><div className="b3"></div><div className="b4"></div><div className="b5"></div>
          </div>
          <span className="logo-text">cocora</span>
        </div>
        <div className="nav-right">
          <div className="launch-pill"><div className="launch-dot"></div>2025年 サービス開始予定</div>
          <button className="nav-btn" onClick={() => scrollToReg()}>事前登録する</button>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-tag">🇯🇵 ニッチな体験、本物の出会い</div>
        <h1>あなたの「好き」が<br /><span className="accent">旅を変える。</span></h1>
        <p className="hero-sub">一般の日本人と外国人旅行者をマッチング。ロードバイク、聖地巡礼、街歩き——共通の趣味を持つガイドと、特別な体験を。</p>
        <p className="hero-launch">サービス開始は <strong>2025年を予定</strong>。今すぐ登録して先行スタートを。</p>
        <div className="hero-ctas">
          <button className="btn-dark" onClick={() => scrollToReg('guide')}>ガイドとして事前登録 →</button>
          <button className="btn-outline" onClick={() => scrollToReg('traveler')}>旅行者として事前登録</button>
        </div>
      </section>

      <div className="counter-bar">
        <div className="counter">
          <div className="counter-num coral">{guideCount}</div>
          <div className="counter-label">ガイド事前登録者</div>
        </div>
        <div className="counter">
          <div className="counter-num blue">{travelerCount}</div>
          <div className="counter-label">旅行者事前登録者</div>
        </div>
        <div className="counter">
          <div className="counter-num">89</div>
          <div className="counter-label">予定カテゴリ数</div>
        </div>
        <div className="counter">
          <div className="counter-num">47都道府県</div>
          <div className="counter-label">対応予定エリア</div>
        </div>
      </div>

      <section className="reg-section" ref={regSectionRef} id="registration">
        <div className="section-label">EARLY ACCESS</div>
        <div className="section-title">事前登録で特典をゲット</div>
        <div className="section-desc">ガイド・旅行者、それぞれの特典があります。今すぐ登録してサービス開始を待ちましょう。</div>

        <div className="reg-grid">
          {/* GUIDE CARD */}
          <div className="reg-card guide">
            <div className="reg-badge guide">🗾 ガイドとして登録</div>
            <h2>趣味を仕事に。<br />副業としてガイド活動。</h2>
            <p className="card-desc">自分の好きなことを活かして、外国人旅行者を案内しませんか？特別なスキルは不要です。</p>
            <ul className="reg-perks">
              <li><div className="perk-check coral">✓</div>サービス開始時に最優先で通知</li>
              <li><div className="perk-check coral">✓</div>初月プラットフォーム手数料 <strong>0%</strong></li>
              <li><div className="perk-check coral">✓</div>先行登録者限定の早期ランクアップ</li>
              <li><div className="perk-check coral">✓</div>プロフィール作成サポート（無料）</li>
            </ul>
            
            {!isGuideSubmitted ? (
              <form className="reg-form" onSubmit={submitGuideForm}>
                <input type="text" placeholder="お名前" required ref={guideNameRef} value={gName} onChange={(e) => setGName(e.target.value)} className="g" />
                <input type="email" placeholder="メールアドレス" required value={gEmail} onChange={(e) => setGEmail(e.target.value)} className="g" />
                <select value={gCat} onChange={(e) => setGCat(e.target.value)}>
                  <option value="" disabled>得意なカテゴリを選ぶ（任意）</option>
                  <option>🚴 ロードバイク・サイクリング</option>
                  <option>⛩️ アニメ・聖地巡礼</option>
                  <option>🍜 ローカルグルメ</option>
                  <option>📷 写真・フォト散歩</option>
                  <option>🏔️ 登山・ハイキング</option>
                  <option>🎮 ゲーム・サブカル</option>
                  <option>🎋 茶道・武道・伝統文化</option>
                  <option>🧘 禅・マインドフルネス</option>
                  <option>その他</option>
                </select>
                
                <label className="agree-label g">
                  <input type="checkbox" checked={gAgree} onChange={(e) => setGAgree(e.target.checked)} required />
                  <span><Link href="/terms" target="_blank">利用規約</Link>と<Link href="/privacy" target="_blank">プライバシーポリシー</Link>に同意する</span>
                </label>
                
                <button type="submit" disabled={isSubmittingGuide} className="submit-btn guide">
                  {isSubmittingGuide ? '送信中...' : 'ガイドとして事前登録する →'}
                </button>
              </form>
            ) : (
              <div className="success-msg" style={{ display: 'block' }}>
                <div className="success-icon">🎉</div>
                <div className="success-title">登録ありがとうございます！</div>
                <div className="success-body">サービス開始時に真っ先にご連絡します。<br />特典の詳細はメールをご確認ください。</div>
              </div>
            )}
          </div>

          {/* TRAVELER CARD */}
          <div className="reg-card traveler">
            <div className="reg-badge traveler">✈️ 旅行者として登録</div>
            <h2>ニッチな体験で、<br />本物の日本を知る。</h2>
            <p className="card-desc">観光ガイドブックには載っていない、現地の日本人と一緒に楽しむ特別な旅行体験。</p>
            <ul className="reg-perks">
              <li><div className="perk-check blue">✓</div>サービス開始時に最優先で通知</li>
              <li><div className="perk-check blue">✓</div>初回予約 <strong>10% OFF</strong> クーポン進呈</li>
              <li><div className="perk-check blue">✓</div>先行登録者限定ガイドへの優先アクセス</li>
              <li><div className="perk-check blue">✓</div>英語サポート優先対応</li>
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
                
                <label className="agree-label t">
                  <input type="checkbox" checked={tAgree} onChange={(e) => setTAgree(e.target.checked)} required />
                  <span>I agree to the <Link href="/terms" target="_blank">Terms</Link> and <Link href="/privacy" target="_blank">Privacy Policy</Link>.</span>
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
        <h2>使い方はシンプル</h2>
        <div className="tabs">
          <button className={`tab ${activeTab === 'tourist' ? 'active' : ''}`} onClick={() => switchTab('tourist')}>旅行者（外国人）</button>
          <button className={`tab ${activeTab === 'guide' ? 'active' : ''}`} onClick={() => switchTab('guide')}>ガイド（日本人）</button>
        </div>

        {activeTab === 'tourist' && (
          <div className="step-content active steps">
            <div className="step">
              <div className="step-num">01</div>
              <div className="step-icon coral"><i className="fa fa-calendar-plus"></i></div>
              <h3>旅程を登録</h3>
              <p>日程・やりたいこと・好みを入力。興味のあるニッチな体験も自由に書けます。</p>
            </div>
            <div className="step">
              <div className="step-num">02</div>
              <div className="step-icon blue"><i className="fa fa-comments"></i></div>
              <h3>オファーを受け取る</h3>
              <p>あなたの興味に合ったガイドからオファーが届きます。プロフィールを見て選べます。</p>
            </div>
            <div className="step">
              <div className="step-num">03</div>
              <div className="step-icon purple"><i className="fa fa-lock"></i></div>
              <h3>安全に予約・支払い</h3>
              <p>カード決済でセキュアに支払い。体験後にレビューを投稿できます。</p>
            </div>
            <div className="step">
              <div className="step-num">04</div>
              <div className="step-icon coral"><i className="fa fa-star"></i></div>
              <h3>特別な体験を楽しむ</h3>
              <p>本物の日本人との体験。友達と観光するような、自然な交流が生まれます。</p>
            </div>
          </div>
        )}

        {activeTab === 'guide' && (
          <div className="step-content active steps">
            <div className="step">
              <div className="step-num">01</div>
              <div className="step-icon coral"><i className="fa fa-id-card"></i></div>
              <h3>マイナンバーで本人確認</h3>
              <p>安全・安心のために、マイナンバーカードで本人確認を行います。</p>
            </div>
            <div className="step">
              <div className="step-num">02</div>
              <div className="step-icon blue"><i className="fa fa-user-pen"></i></div>
              <h3>プロフィール作成</h3>
              <p>好きなことや得意分野を書き込みます。ロードバイク、アニメ聖地、料理など何でも。</p>
            </div>
            <div className="step">
              <div className="step-num">03</div>
              <div className="step-icon purple"><i className="fa fa-yen-sign"></i></div>
              <h3>時給を自分で設定</h3>
              <p>ランクに応じて時給を自由に設定できます。経験を積むほど報酬もアップ。</p>
            </div>
            <div className="step">
              <div className="step-num">04</div>
              <div className="step-icon coral"><i className="fa fa-handshake"></i></div>
              <h3>ガイド活動スタート</h3>
              <p>旅行者にオファーを送ったり、オファーを受け取ったりして活動できます。</p>
            </div>
          </div>
        )}
      </section>

      <section className="concept-section">
        <div className="section-label">CONCEPT</div>
        <div className="section-title">ココラ（cocora）とは？</div>
        <div className="section-desc" style={{ marginBottom: '40px' }}>従来の観光ガイドとはまったく違う、新しい体験のかたち。</div>
        <div className="concept-grid">
          <div className="concept-card">
            <span className="concept-emoji">🤝</span>
            <h3>友達感覚でガイド</h3>
            <p>プロではなく、同じ趣味を持つ一般の日本人と一緒に観光。まるで地元の友達と旅するような体験。</p>
          </div>
          <div className="concept-card">
            <span className="concept-emoji">🎯</span>
            <h3>ニッチな体験に特化</h3>
            <p>ロードバイクツーリング、アニメ聖地巡礼、深夜の屋台文化——ガイドブックにない体験だけを。</p>
          </div>
          <div className="concept-card">
            <span className="concept-emoji">🔒</span>
            <h3>安心・安全の設計</h3>
            <p>ガイドはマイナンバーカードで本人確認済み。決済はエスクロー方式。トラブル時のサポートも完備。</p>
          </div>
        </div>
      </section>

      <section className="cats-section">
        <div className="section-label">CATEGORIES</div>
        <div className="section-title">こんな体験が待っています</div>
        <div className="section-desc" style={{ marginBottom: '40px' }}>サービス開始時に用意される体験カテゴリ。</div>
        <div className="cats-grid">
          <div className="cat"><span className="cat-emoji">🚴</span><div className="cat-name">ロードバイク</div><div className="cat-soon">Coming Soon</div></div>
          <div className="cat"><span className="cat-emoji">⛩️</span><div className="cat-name">聖地巡礼</div><div className="cat-soon">Coming Soon</div></div>
          <div className="cat"><span className="cat-emoji">🍜</span><div className="cat-name">ローカルグルメ</div><div className="cat-soon">Coming Soon</div></div>
          <div className="cat"><span className="cat-emoji">📷</span><div className="cat-name">フォト散歩</div><div className="cat-soon">Coming Soon</div></div>
          <div className="cat"><span className="cat-emoji">🏔️</span><div className="cat-name">登山・ハイキング</div><div className="cat-soon">Coming Soon</div></div>
          <div className="cat"><span className="cat-emoji">🎮</span><div className="cat-name">ゲーム・サブカル</div><div className="cat-soon">Coming Soon</div></div>
          <div className="cat"><span className="cat-emoji">🎋</span><div className="cat-name">茶道・武道</div><div className="cat-soon">Coming Soon</div></div>
          <div className="cat"><span className="cat-emoji">🧘</span><div className="cat-name">禅・瞑想</div><div className="cat-soon">Coming Soon</div></div>
        </div>
      </section>
      
      <section className="guides-section">
        <div className="section-label">FEATURED GUIDES</div>
        <h2>人気のガイド</h2>
        <div className="guides-grid">
          <div className="guide-card">
            <div className="guide-img g1">🚴<div className="rank-badge">GOLD</div></div>
            <div className="guide-info">
              <div className="guide-name">Kenji T. · 東京</div>
              <div className="guide-tags">
                <span className="guide-tag coral">ロードバイク</span>
                <span className="guide-tag">荒川サイクリング</span>
                <span className="guide-tag">富士山麓</span>
              </div>
              <div className="guide-meta">
                <div className="guide-price">¥3,500<span>/時間</span></div>
                <div className="guide-rating"><span className="stars">★★★★★</span> 4.9 (48)</div>
              </div>
            </div>
          </div>
          <div className="guide-card">
            <div className="guide-img g2">⛩️<div className="rank-badge">PLATINUM</div></div>
            <div className="guide-info">
              <div className="guide-name">Yuki M. · 京都/大阪</div>
              <div className="guide-tags">
                <span className="guide-tag coral">聖地巡礼</span>
                <span className="guide-tag">アニメ</span>
                <span className="guide-tag">コスプレ</span>
              </div>
              <div className="guide-meta">
                <div className="guide-price">¥5,000<span>/時間</span></div>
                <div className="guide-rating"><span className="stars">★★★★★</span> 5.0 (91)</div>
              </div>
            </div>
          </div>
          <div className="guide-card">
            <div className="guide-img g3">🍜<div className="rank-badge">SILVER</div></div>
            <div className="guide-info">
              <div className="guide-name">Hana S. · 福岡</div>
              <div className="guide-tags">
                <span className="guide-tag coral">ローカルグルメ</span>
                <span className="guide-tag">屋台</span>
                <span className="guide-tag">居酒屋</span>
              </div>
              <div className="guide-meta">
                <div className="guide-price">¥2,200<span>/時間</span></div>
                <div className="guide-rating"><span className="stars">★★★★☆</span> 4.7 (33)</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="timeline-section">
        <div className="section-label">ROADMAP</div>
        <div className="section-title">ローンチまでのスケジュール</div>
        <div className="section-desc" style={{ marginBottom: '44px' }}>現在、事前登録フェーズです。</div>
        <div className="timeline">
          <div className="tl-step">
            <div className="tl-dot done"></div>
            <div className="tl-label done">✓ 完了</div>
            <div className="tl-sub">コンセプト設計<br />要件定義</div>
          </div>
          <div className="tl-step">
            <div className="tl-dot active"></div>
            <div className="tl-label active">← 今ここ</div>
            <div className="tl-sub">事前登録<br />受付中</div>
          </div>
          <div className="tl-step">
            <div className="tl-dot"></div>
            <div className="tl-label">開発</div>
            <div className="tl-sub">プラットフォーム<br />開発</div>
          </div>
          <div className="tl-step">
            <div className="tl-dot"></div>
            <div className="tl-label">β版</div>
            <div className="tl-sub">先行登録者向け<br />ベータテスト</div>
          </div>
          <div className="tl-step">
            <div className="tl-dot"></div>
            <div className="tl-label">ローンチ</div>
            <div className="tl-sub">2025年<br />正式リリース</div>
          </div>
          <div className="tl-step">
            <div className="tl-dot"></div>
            <div className="tl-label">拡大</div>
            <div className="tl-sub">全国展開<br />アプリ対応</div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>あなたの「好き」で、<br /><span className="accent">誰かの旅を変えよう。</span></h2>
        <p>副業・趣味の延長として。特別なスキルは不要です。<br />あなたの知識と情熱が、旅行者にとっての宝物になります。</p>
        <div className="cta-btns">
          <button className="btn-white" onClick={() => scrollToReg('guide')}>ガイドとして登録する</button>
          <button className="btn-ghost" onClick={() => scrollToReg('traveler')}>旅行者として探す</button>
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
          <div className="footer-links">
            <Link href="/terms">利用規約</Link>
            <Link href="/privacy">プライバシー</Link>
            <a href="https://mefar.jp/contact" target="_blank" rel="noopener noreferrer">お問い合わせ</a>
          </div>
        </div>
      </footer>
    </>
  );
}
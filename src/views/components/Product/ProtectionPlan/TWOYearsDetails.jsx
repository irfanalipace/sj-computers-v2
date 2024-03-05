import React from 'react';
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom';

export default function TWOYearsDetails() {
  return (
    <div className='accordion-content-drawer'>
      <h3>2 Year Equippment Warranty Plan</h3>
      <p className='title'>From Asurion, LLC</p>
      <div style={{ marginTop: '-15px' }}>
        <StarRatings
          rating={258}
          starRatedColor='rgb(232, 126, 36)'
          numberOfStars={5}
          name='rating'
          isSelectable={false}
          starDimension={'20px'}
          starSpacing={'0'}
        />
      </div>
      <p className='details-of-protection'>
        NO ADDITIONAL COST: You pay $0 for repairs – parts, labor and shipping
        included. <br />
        COVERAGE: Plan starts on the date of purchase. Malfunctions covered
        after the manufacturer's warranty. Power surges covered from day one.{' '}
        <br />
        EASY CLAIMS PROCESS: File a claim anytime online at{' '}
        <Link>www.cs@sjcomputersmn.com</Link> or by phone at 952-452-8884. Most
        claims are approved within minutes. <br />
        EXPERT TECH HELP: Real experts are available 24/7 to help with set-up,
        connectivity issues, troubleshooting and much more. <br />
        TERMS & DETAILS: SJ Computers will also email your plan confirmation
        with Terms & Conditions to the address associated with your SJ Computers
        account within 24 hours of purchase (if you do not see this email,
        please check your spam folder). Contact us if you cannot locate your
        plan confirmation and Terms & Conditions via email at{' '}
        <Link>cs@sjcomputersmn.com</Link> <br />
        More info : <small style={{ color: '#1270c4' }}>2-Year Warranty</small>
      </p>
      <h6 style={{ color: '#3bc4f1' }}>
        SJ Computers covers the following malfunctions in its products
      </h6>
      <ul>
        <li
          style={{
            fontSize: 'small',
            padding: '10px 2px',
          }}>
          <span style={{ fontWeight: 500 }}>Battery Life Issues: </span> Because
          the battery is not new, it may not keep a charge as well as a fresh
          one, resulting in shorter use durations between charges. 
        </li>
        <li
          style={{
            fontSize: 'small',
            padding: '10px 2px',
          }}>
          <span style={{ fontWeight: 500 }}>Hard Drive Failures: </span>{' '}
          Refurbished machines may still have original hard drives, which may be
          nearing the end of their lives and hence more likely to fail.  
        </li>
        <li
          style={{
            fontSize: 'small',
            padding: '10px 2px',
          }}>
          <span style={{ fontWeight: 500 }}>Overheating: </span> Because of
          prior usage, the cooling system (fans, heat sinks) may be less
          effective, leading the computer to overheat more frequently.   
        </li>
        <li
          style={{
            fontSize: 'small',
            padding: '10px 2px',
          }}>
          <span style={{ fontWeight: 500 }}>Cosmetic flaws: </span> While not a
          defect, refurbished computers might display more scars or wear and
          tear than new models.   
        </li>
        <li
          style={{
            fontSize: 'small',
            padding: '10px 2px',
          }}>
          <span style={{ fontWeight: 500 }}>Keyboard or Touchpad Issues: </span>{' '}
          Previous use might cause less reactive keys or touchpad difficulties.
            
        </li>
        <li
          style={{
            fontSize: 'small',
            padding: '10px 2px',
          }}>
          <span style={{ fontWeight: 500 }}>Port malfunctions: </span> HDMI,
          USB, and various other ports could have loose connections or damages
          from past use, resulting in connectivity difficulties.   
        </li>
        <li
          style={{
            fontSize: 'small',
            padding: '10px 2px',
          }}>
          <span style={{ fontWeight: 500 }}>Display Issues: </span> Screen
          difficulties, including dead pixels or backlight issues, are
          prevalent, particularly if the display was not changed throughout the
          refurbishing process.    
        </li>
        <li
          style={{
            fontSize: 'small',
            padding: '10px 2px',
          }}>
          <span style={{ fontWeight: 500 }}>Software Stability: </span> There
          may be outstanding software issues or obsolete drivers that were not
          entirely resolved throughout the refurbishing process.   
        </li>
      </ul>
    </div>
  );
}

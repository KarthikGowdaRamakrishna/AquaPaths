import React from 'react';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="about">
      <div className="about-header">
        <h1>{t('ABOUT_TITLE')}</h1>
      </div>
      <div className="about-content">
        <div className="about-section">
          <div className="about-text">
            <h2>{t('ABOUT_MISSION_TITLE')}</h2>
            <p>{t('ABOUT_MISSION_CONTENT')}</p>
          </div>
        </div>
        <div className="about-section">
          <div className="about-text">
            <h2>{t('ABOUT_VISION_TITLE')}</h2>
            <p>{t('ABOUT_VISION_CONTENT')}</p>
          </div>
        </div>
        <div className="about-section">
          <div className="about-text">
            <h2>{t('ABOUT_IMPACT_TITLE')}</h2>
            <p>{t('ABOUT_IMPACT_CONTENT')}</p>
          </div>
        </div>
        <div className="about-section">
          <div className="about-text">
            <h2>{t('ABOUT_TEAM_TITLE')}</h2>
            <p>{t('ABOUT_TEAM_CONTENT')}</p>
          </div>
        </div>
      </div>
      <div className="about-partners">
        <h2>{t('ABOUT_PARTNERS_TITLE')}</h2>
        {/* Add logos and links to partners here */}
        <div className="partners-logos">
          {/* Example of partner logo */}
          <a href="https://partnerwebsite.com" target="_blank" rel="noopener noreferrer">
            <img src="path_to_partner_logo" alt="Partner Logo" />
          </a>
          {/* Repeat for each partner */}
        </div>
      </div>
      <div className="about-footer">
        <p>{t('ABOUT_FOOTER_CONTENT')}</p>
      </div>
    </div>
  );
};

export default About;

import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import SquareLogoIcon from '../../../images/computiful-square-logo.svg';
// import PlayIcon from '../../../images/play.svg';
import NablaIcon from '../../../images/computiful-nabla.svg';

function About(props) {
  const { t } = useTranslation();
  return (
    <div className="about__content">
      <Helmet>
        <title> {t('About.TitleHelmet')} </title>
      </Helmet>
      <div className="about__content-column">
        <SquareLogoIcon className="about__logo" role="img" aria-label={t('Common.p5logoARIA')} focusable="false" />
      </div>
      <div className="about__content-column">
        <h3 className="about__content-column-title">Resources</h3>
        <p className="about__content-column-list">
          <a
            href="https://computiful.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <NablaIcon className="about__content-column-asterisk" aria-hidden="true" focusable="false" />
            Textbook
          </a>
        </p>
      </div>
      <div className="about__content-column">
        <h3 className="about__content-column-title">Credits</h3>
        <p className="about__content-column-list">
          <a
            href="https://github.com/processing/p5.js"
            target="_blank"
            rel="noopener noreferrer"
          >
            <NablaIcon className="about__content-column-asterisk" aria-hidden="true" focusable="false" />
            p5.js
          </a>
        </p>
        <p className="about__content-column-list">
          <a
            href="https://github.com/processing/p5.js-web-editor"
            target="_blank"
            rel="noopener noreferrer"
          >
            <NablaIcon className="about__content-column-asterisk" aria-hidden="true" focusable="false" />
            p5.js Web Editor
          </a>
        </p>
        <p className="about__content-column-list">
          <a
            href="https://github.com/berinhard/pyp5js"
            target="_blank"
            rel="noopener noreferrer"
          >
            <NablaIcon className="about__content-column-asterisk" aria-hidden="true" focusable="false" />
            pyp5js
          </a>
        </p>
      </div>
      <div className="about__footer">
        <p className="about__footer-list">
          <a
            href="https://legal.computiful.org/tos/"
            target="_blank"
            rel="noopener noreferrer"
          >Terms of Service
          </a>
        </p>
        <p className="about__footer-list">
          <a
            href="https://legal.computiful.org/privacy/"
            target="_blank"
            rel="noopener noreferrer"
          >Privacy Policy
          </a>
        </p>
        <p className="about__footer-list">
          <a
            href="https://legal.computiful.org/community/"
            target="_blank"
            rel="noopener noreferrer"
          >Community Guidelines
          </a>
        </p>
      </div>
    </div>
  );
}

export default About;

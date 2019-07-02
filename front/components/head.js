import React from 'react';
import NextHead from 'next/head';
import { string } from 'prop-types';

const defaultDescription = 'Decentralized Exchange on ICON Network';
const defaultOGURL = 'www.icondelta.ga';
const defaultOGImage = '';

const Head = props => (
  <NextHead>
    <meta charSet='UTF-8' />
    <title>{props.title || 'ICONDELTA'}</title>
    <meta
      name='description'
      content={props.description || defaultDescription}
    />
    <meta http-equiv='X-UA-Compatible' content='IE=edge' />
    <meta
      name='viewport'
      content='width=device-width, inwidth=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=yes,viewport-fit=coveritial-scale=1'
    />
    <link rel='icon' sizes='192x192' href='/static/touch-icon.png' />
    <link rel='apple-touch-icon' href='/static/touch-icon.png' />
    <link rel='mask-icon' href='/static/favicon-mask.svg' color='#343a40' />
    <link rel='icon' href='/static/favicon.ico' />
    <meta property='og:url' content={props.url || defaultOGURL} />
    <meta property='og:title' content={props.title || ''} />
    <meta
      property='og:description'
      content={props.description || defaultDescription}
    />
    <meta name='twitter:site' content={props.url || defaultOGURL} />
    <meta name='twitter:card' content='summary_large_image' />
    <meta name='twitter:image' content={props.ogImage || defaultOGImage} />
    <meta property='og:image' content={props.ogImage || defaultOGImage} />
    <meta property='og:image:width' content='1200' />
    <meta property='og:image:height' content='630' />
    <link
      rel='stylesheet'
      href='https://fonts.googleapis.com/icon?family=Material+Icons'
    />
    <link
      rel='stylesheet'
      href='https://unpkg.com/firacode@1.206.0/distr/fira_code.css'
    />
    <link rel='stylesheet' href='/static/normalize.css' />
    {process.env.NODE_ENV === 'production' && (
      <script src='https://polyfill.io/v3/polyfill.min.js?features=es6,es7,es8,es9,NodeList.prototype.forEach&flags=gated' />
    )}
  </NextHead>
);

Head.propTypes = {
  title: string,
  description: string,
  url: string,
  ogImage: string,
};

export default Head;

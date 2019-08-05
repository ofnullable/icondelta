import React from 'react';
import NextHead from 'next/head';

const title = ' icondelta ';
const url = 'https://www.icondelta.ga';
const description = 'Decentralized Exchange on ICON Network';

const Head = () => (
  <NextHead>
    <meta charSet='utf-8' />
    <title> icondelta </title>

    <meta name='title' content={title} />
    <meta name='description' content={description} />
    <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
    <meta name='viewport' content='width=device-width, initial-scale=1, viewport-fit=cover' />

    <meta name='twitter:site' content={url} />
    <meta name='twitter:card' content='summary_large_image' />

    <meta property='og:title' content={title} />
    <meta property='og:url' content={url} />
    <meta property='og:description' content={description} />

    <link rel='icon' href='/static/favicon.ico' />

    <link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons' />
    <link rel='stylesheet' href='https://unpkg.com/firacode@1.206.0/distr/fira_code.css' />

    {process.env.NODE_ENV === 'production' && (
      <script src='https://polyfill.io/v3/polyfill.min.js?features=es6,es7,es8,es9,NodeList.prototype.forEach&flags=gated' />
    )}
  </NextHead>
);

export default Head;

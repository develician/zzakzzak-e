import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import express from 'express';
import App from './App';
import { StaticRouter, matchPath } from 'react-router-dom';
import Loadable from 'react-loadable';
import { Provider } from 'react-redux';
import prefetchConfig from './prefetchConfig';
import { getBundles } from 'react-loadable/webpack';
import stats from '../build/react-loadable.json';
import configure from './store/configure';

const app = express();
// 이미 만들어진 indexHtml 을 기반으로 수정 할 것이기에
// 미리 불러온다.
const indexHtml = fs.readFileSync(
  path.resolve(__dirname, '../build/index.html'),
  'utf8'
);

// index.html 에 변화를 일으킨다.
function createPage(rootHtml, bundles, state) {
  let html = indexHtml;

  // 스플리팅된 자바스크립트
  const chunkScripts = bundles
    .filter(bundle => bundle.file.match(/.js$/))
    .map(bundle => `<script src="${bundle.publicPath}"></script>`)
    .join('\n');

  // 스플리팅된 스타일
  const chunkStyles = bundles
    .filter(bundle => bundle.file.match(/.css$/))
    .map(bundle => `<link href="${bundle.publicPath}" rel="stylesheet">`)
    .join('\n');

  // 렌더링 결과를 root 안에 집어넣기
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root">${rootHtml}</div>`
  );

  // 메타 태그 설정 (+ 스플리팅된 스타일 로딩)
  html = html.replace('</head>', `${chunkStyles}</head>`);

  // 커스텀 스크립트 정의
  const customScripts = `<script>
    window.ssr = true;
    window.__PRELOADED_STATE__ = ${JSON.stringify(state).replace(
      /</g,
      '\\u003c'
    )};
    window.shouldCancel = true;
  </script>`;

  // 커스텀스크립트 적용 + 스플리팅된 스크립트 로딩
  const mainScript = html.match(
    /<script src="\/static\/js\/main..*.chunk.js"><\/script>/
  )[0];
  html = html.replace(
    mainScript,
    `${customScripts}${chunkScripts}${mainScript}`
  );

  return html;
}

// 서버렌더링 함수
const serverRender = async (req, res) => {
  try {
    const store = configure();

    const promises = [];
    prefetchConfig.forEach(route => {
      const match = matchPath(req.path, route);
      if (match) {
        const p = route.prefetch(store, match.params);
        promises.push(p);
      }
    });

    console.log(promises);

    await Promise.all(promises);

    let modules = [];

    const rootHtml = ReactDOMServer.renderToString(
      <Loadable.Capture report={moduleName => modules.push(moduleName)}>
        <Provider store={store}>
          <StaticRouter location={req.url}>
            <App />
          </StaticRouter>
        </Provider>
      </Loadable.Capture>
    );

    const state = store.getState();

    console.log(JSON.stringify(state));

    const bundles = getBundles(stats, modules);

    res.send(createPage(rootHtml, bundles, state));
  } catch (e) {
    console.log(e);
  }
};

// / 경로에 들어왔을때도 똑같은 서버사이드 렌더링 작업
// index.html 을 사용하는것을 방지하는것임
app.get('/', (req, res) => {
  return serverRender(req, res);
});

// build 경로를 정적 디렉토리로 사용
app.use(express.static(path.resolve(__dirname, '../build')));

// 404가 발생하는 경우 서버사이드 렌더링
app.use((req, res, next) => {
  if (!req.route) {
    return serverRender(req, res);
  }
  return next();
});

Loadable.preloadAll().then(() => {
  app.listen(4000, () => {
    console.log('Running on http://localhost:4000/');
  });
});

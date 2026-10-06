// End-to-end portal smoke test. Requires Node 24+ and Microsoft Edge on Windows.
// Run after npm run build: node scripts/portal-smoke.mjs
import { spawn } from 'node:child_process';
import { mkdtemp, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';
import { lessons } from '../src/data/portalCurriculum.ts';

const artifacts = await mkdtemp(path.join(tmpdir(), 'signal-portal-'));
const server = spawn(process.execPath, ['node_modules/vite/bin/vite.js', 'preview', '--host', '127.0.0.1', '--port', '4183', '--strictPort'], { windowsHide: true, stdio: 'ignore' });
const browser = spawn(process.env.EDGE_PATH || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', ['--headless=new', '--disable-extensions', '--no-first-run', '--remote-debugging-port=9225', '--user-data-dir=' + path.join(artifacts, 'profile'), 'about:blank'], { windowsHide: true, stdio: 'ignore' });
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
let socket;
try {
  let tabs;
  for (let i = 0; i < 60; i++) { try { await fetch('http://127.0.0.1:4183'); tabs = await (await fetch('http://127.0.0.1:9225/json')).json(); break; } catch { await sleep(200); } }
  assert.ok(tabs, 'preview and browser started');
  socket = new WebSocket(tabs.find(tab => tab.type === 'page').webSocketDebuggerUrl);
  await new Promise(resolve => socket.addEventListener('open', resolve, { once: true }));
  let id = 0; const requests = new Map(); const errors = [];
  socket.addEventListener('message', event => {
    const message = JSON.parse(event.data);
    if (message.id) { requests.get(message.id)?.(message); requests.delete(message.id); }
    else if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails);
  });
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const requestId = ++id;
    const timeout = setTimeout(() => { requests.delete(requestId); reject(Error('CDP timeout: ' + method)); }, 15000);
    requests.set(requestId, message => { clearTimeout(timeout); if (message.error) reject(Error(JSON.stringify(message.error))); else resolve(message.result); });
    socket.send(JSON.stringify({ id: requestId, method, params }));
  });
  const evaluate = async expression => { const result = await send('Runtime.evaluate', { expression, returnByValue: true }); if (result.exceptionDetails) throw Error(JSON.stringify(result.exceptionDetails)); return result.result.value; };
  const waitFor = async expression => { for (let i = 0; i < 100; i++) { try { if (await evaluate(expression)) return; } catch {} await sleep(100); } throw Error('Timed out: ' + expression); };
  const go = async route => { await send('Page.navigate', { url: 'http://127.0.0.1:4183' + route }); await waitFor('document.querySelector("h1") && location.pathname + location.search === ' + JSON.stringify(route)); await sleep(180); };
  const click = async selector => { await evaluate('document.querySelector(' + JSON.stringify(selector) + ').click()'); await sleep(90); };
  const button = async text => { await evaluate('[...document.querySelectorAll("button")].find(button => button.textContent.trim() === ' + JSON.stringify(text) + ').click()'); await sleep(90); };
  const fill = async (selector, value) => {
    await evaluate('(() => {const element = document.querySelector(' + JSON.stringify(selector) + '); const prototype = element.tagName === "TEXTAREA" ? HTMLTextAreaElement.prototype : element.tagName === "SELECT" ? HTMLSelectElement.prototype : HTMLInputElement.prototype; Object.getOwnPropertyDescriptor(prototype, "value").set.call(element,' + JSON.stringify(value) + '); element.dispatchEvent(new Event(element.tagName === "SELECT" ? "change" : "input", {bubbles:true}));})()'); await sleep(90);
  };
  const step = async index => { await evaluate('document.querySelectorAll(".academy-stepper button")[' + index + '].click()'); await sleep(90); };
  const progress = () => evaluate('JSON.parse(localStorage.getItem("ai-learning-portal-progress-" + localStorage.getItem("ai-learning-portal-current-learner")))');
  const shot = async name => writeFile(path.join(artifacts, name + '.png'), Buffer.from((await send('Page.captureScreenshot', { captureBeyondViewport: false })).data, 'base64'));
  await send('Runtime.enable'); await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', { width:1440, height:1000, deviceScaleFactor:1, mobile:false });
  const phase = async index => click('.lesson-phase-nav button:nth-child(' + (index + 1) + ')');
  const readPart = async index => click('.lesson-reading-heading nav button:nth-child(' + (index + 1) + ')');
  const checkQuiz = async (lesson, wrong = false) => {
    for (let i = 0; i < lesson.quiz.length; i++) {
      const answer = wrong ? (lesson.quiz[i].answer + 1) % 3 : lesson.quiz[i].answer;
      await evaluate('document.querySelectorAll("input[name=quiz-answer]")[' + answer + '].click()'); await sleep(90);
      await button('Check answer');
      assert.ok(await evaluate('!!document.querySelector(".lesson-quiz-card .lesson-inline-feedback")'));
      assert.equal(await evaluate('document.querySelector(".lesson-quiz-card fieldset").disabled'),true);
      if(i<lesson.quiz.length-1) await button('Next question'); else await button('See my results');
    }
  };
  if (process.argv.includes('--theme-only')) {
    for(const theme of ['light','dark']){
      await go('/portal'); await evaluate('localStorage.setItem("signal-lab-theme",' + JSON.stringify(theme) + ')');
      for(const route of ['/portal','/learn?lesson=patterns','/learn/patterns/quiz','/progress']){
        await go(route);
        assert.equal(await evaluate('getComputedStyle(document.querySelector(".academy")).backgroundColor'),'rgb(245, 245, 239)');
        assert.equal(await evaluate('getComputedStyle(document.querySelector(".academy")).colorScheme'),'light');
      }
    }
    console.log('PASS: portal stays light for both theme preferences');
  } else if (process.argv.includes('--certificate-only')) {
    await go('/portal');
    await evaluate('(() => {const key="ai-learning-portal-progress-"+localStorage.getItem("ai-learning-portal-current-learner");const data=JSON.parse(localStorage.getItem(key));data.completedModules='+JSON.stringify(lessons.map(lesson=>lesson.id))+';data.moduleScores='+JSON.stringify(Object.fromEntries(lessons.map((lesson,i)=>[lesson.id,i===0?80:100])))+';localStorage.setItem(key,JSON.stringify(data));})()');
    await go('/progress'); await button('View certificate');
    assert.match(await evaluate('document.querySelector(".certificate-stats").textContent'),/8 of 8/);
    assert.match(await evaluate('document.querySelector(".certificate-stats").textContent'),/98%/);
    console.log('PASS: certificate totals');
  } else {
    await go('/portal');
    await evaluate('(() => {localStorage.setItem("signal-lab-theme","light");const key="ai-learning-portal-progress-"+localStorage.getItem("ai-learning-portal-current-learner");const data=JSON.parse(localStorage.getItem(key));data.displayName="Alex";data.xp=150;data.completedModules=["fundamentals"];data.notesByModule.fundamentals="Earlier course notes";localStorage.setItem(key,JSON.stringify(data));})()');
    await go('/portal');
    assert.equal(await evaluate('document.querySelectorAll(".academy-lesson-card").length'),8);
    await shot('dashboard-preserved');
    await go('/learn/references');
    assert.equal(await evaluate('document.querySelectorAll(".lesson-reference-card").length'),3,'video reference library is available');
    assert.equal(await evaluate('document.querySelectorAll(".lesson-reference-watch").length'),3,'each reference has a YouTube link');
    await go('/learn/patterns/quiz');
    assert.ok(await evaluate('!!document.querySelector(".lesson-quiz-gate")'),'direct quiz access respects prerequisites');
    assert.equal(await evaluate('document.querySelectorAll("input[name=quiz-answer]").length'),0);
    for (const lesson of lessons) {
      await go('/learn?lesson=' + lesson.id);
      await phase(0); await readPart(0);
      assert.equal(await evaluate('document.querySelectorAll(".academy-course-map").length'),0,'no competing course sidebar');
      assert.equal(await evaluate('document.querySelectorAll(".lesson-reference iframe").length'),0,'reference video is not loaded before consent');
      assert.ok(await evaluate('!!document.querySelector(".lesson-case-study textarea")'),'school case study is available');
      await fill('.lesson-case-study textarea','I would check the specific example, identify who is affected, and explain why the evidence supports my next step.');
      await click('.lesson-case-study summary');
      assert.ok(await evaluate('document.querySelector(".lesson-case-study details").open'),'case explanation opens');
      if(lesson.id==='patterns'){
        await go('/learn?lesson=patterns');
        assert.match(await evaluate('document.querySelector(".lesson-case-study textarea").value'),/specific example/,'case reflection survives reload');
        await click('.lesson-reference summary');
        assert.match(await evaluate('document.querySelector(".lesson-reference a").href'),/youtube.com/);
        await shot('reference-and-school-case');
        await click('.lesson-reference summary');
      }
      await waitFor('document.querySelector("video").readyState>=1');
      const media = await evaluate('({duration:document.querySelector("video").duration,error:document.querySelector("video").error?.code??null,poster:document.querySelector("video").poster})');
      assert.equal(media.error,null);
      assert.ok(Number.isFinite(media.duration) && media.duration>240 && media.duration<600,lesson.id+' video duration');
      await waitFor('document.querySelector("video").textTracks[0]?.cues?.length>5');
      if(lesson.id==='patterns'){
        await evaluate('document.querySelector("video").muted=true;document.querySelector("video").play()');
        await sleep(800);
        assert.ok(await evaluate('document.querySelector("video").currentTime>0'),'real video plays');
        await evaluate('document.querySelector("video").pause()');
        await click('.lesson-transcript summary');
        await click('.lesson-transcript > div:nth-of-type(3) button');
        await waitFor('document.querySelector("video").currentTime>20 && !document.querySelector("video").seeking');
        await shot('original-video-and-transcript');
        await click('.lesson-transcript summary');
        await evaluate('window.scrollTo(0,0)');
        await shot('focused-lesson-desktop');
        await click('.lesson-study-tools > summary');
        await fill('.lesson-tools-body textarea','My model needs new examples for testing, not just the ones it learned from.');
        await button('Vocabulary'); await click('.academy-flashcard');
        assert.equal(await evaluate('document.querySelector(".academy-flashcard").getAttribute("aria-expanded")'),'true');
        await click('.lesson-study-tools > summary');
      }
      for(let i=0;i<3;i++){
        await readPart(i);
        if(lesson.id==='patterns'&&i===0){
          await evaluate('document.querySelectorAll("input[name=reading-check]")[' + ((lesson.sections[i].check.answer+1)%3) + '].click()');await sleep(90);
          await button('Check my thinking');
          assert.ok(await evaluate('!!document.querySelector(".lesson-checkpoint .lesson-inline-feedback:not(.is-correct)")'));
        }
        await evaluate('document.querySelectorAll("input[name=reading-check]")[' + lesson.sections[i].check.answer + '].click()');await sleep(90);
        await button('Check my thinking');
        assert.ok(await evaluate('!!document.querySelector(".lesson-checkpoint .is-correct")'));
      }
      await phase(1);
      await fill('.lesson-worked-example textarea','I would use a new example and explain why the result could be wrong. My test would change the relevant condition and compare the evidence before deciding what to do.');
      await button('Compare your reasoning');
      await click('.lesson-self-review input');
      await button('Check my work');
      assert.equal(JSON.parse((await progress()).notesByModule['portal-workbook-v2:'+lesson.id]).practiceDone,false);
      if(lesson.practice.kind==='sort'){
        for(let i=0;i<lesson.practice.items.length;i++)await fill('#sort-'+i,lesson.practice.items[i].answer);
      }else if(lesson.practice.kind==='metrics'){
        await fill('#threshold','80');
        assert.match(await evaluate('document.querySelector(".academy-mini-stats").textContent'),/2missed batteries/);
        await button('Set threshold to 50');
        for(let i=0;i<3;i++)await fill('.academy-input-grid label:nth-child('+(i+1)+') input',['75','1','1'][i]);
      }else if(lesson.practice.kind==='fairness'){
        for(let i=0;i<3;i++)await fill('.academy-input-grid label:nth-child('+(i+1)+') input',['90','60','80'][i]);
        await fill('.academy-practice > .academy-field select','alternative');
      }else if(lesson.practice.kind==='prompt'){
        const values=['Ask one question about mitosis.','I am in grade ten and mix up the stages.','Wait for my answer, then explain one mistake.','Do not give the answer before I make my own attempt.'];
        for(let i=0;i<4;i++)await fill('.academy-input-grid label:nth-child('+(i+1)+') textarea',values[i]);
        await fill('.academy-practice > .academy-field textarea','I would name which stages are confusing so that the next practice question focuses on the learning gap.');
      }else{
        for(let i=0;i<lesson.practice.correct.length;i++){
          let index=await evaluate('[...document.querySelectorAll(".academy-sequence li p")].findIndex(p=>p.textContent==='+JSON.stringify(lesson.practice.correct[i])+')');
          while(index>i){await click('.academy-sequence li:nth-child('+(index+1)+') button:first-child');index--;}
        }
      }
      await button('Check my work');
      assert.equal(JSON.parse((await progress()).notesByModule['portal-workbook-v2:'+lesson.id]).practiceDone,true);
      await phase(2);
      for(let i=0;i<lesson.project.fields.length;i++)await fill('.lesson-project > .academy-field:nth-of-type('+(i+1)+') textarea','My example uses fictional information and a specific decision. I would explain my reasoning, test new examples, and ask a person to review uncertain results.');
      for(let i=0;i<lesson.project.rubric.length;i++){await evaluate('document.querySelectorAll(".academy-rubric input")['+i+'].click()');await sleep(90);}
      if(lesson.id==='patterns'){
        await go('/learn?lesson=patterns');
        assert.ok(await evaluate('!!document.querySelector(".lesson-project")'),'saved project position resumes');
        assert.match(await evaluate('document.querySelector(".lesson-project textarea").value'),/fictional/);
      }
      await click('.lesson-quiz-invitation a');
      await waitFor('location.pathname==='+JSON.stringify('/learn/'+lesson.id+'/quiz'));
      assert.equal(await evaluate('document.querySelectorAll(".lesson-quiz-card fieldset").length'),1,'one question at a time');
      if(lesson.id==='patterns'){
        await shot('dedicated-quiz-desktop');
        await checkQuiz(lesson,true);
        assert.equal((await progress()).xp,150);
        await button('Try again');
      }
      await checkQuiz(lesson);
      assert.ok((await progress()).completedModules.includes(lesson.id));
      if(lesson.id==='patterns'){
        const xp=(await progress()).xp;
        await button('Try again');await checkQuiz(lesson);assert.equal((await progress()).xp,xp,'repeat pass does not award XP twice');
      }
      console.log('PASS',lesson.id,'video, captions, teaching, guided response, practice, project, dedicated quiz');
    }
    assert.equal((await progress()).xp,950);
    assert.equal((await progress()).notesByModule.fundamentals,'Earlier course notes');
    await go('/progress');
    assert.equal(await evaluate('document.querySelectorAll(".academy-badge-label.is-earned").length'),4);
    assert.equal(await evaluate('document.querySelectorAll(".academy-portfolio li").length'),8);
    for(const width of [320,390,768,1440]){
      await send('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:width<600});
      await go('/learn?lesson=patterns');await phase(0);await readPart(0);
      assert.equal(await evaluate('document.documentElement.scrollWidth>innerWidth+1'),false,'lesson fits '+width);
      if(width===390){await evaluate('window.scrollTo(0,0)');await shot('focused-lesson-mobile');}
      await go('/learn/patterns/quiz');
      await button('Try again');
      assert.equal(await evaluate('document.documentElement.scrollWidth>innerWidth+1'),false,'quiz fits '+width);
      if(width===390)await shot('dedicated-quiz-mobile');
      // Restore a submitted review without replaying the full quiz just for layout checks.
      await evaluate('(()=>{const key="ai-learning-portal-progress-"+localStorage.getItem("ai-learning-portal-current-learner");const data=JSON.parse(localStorage.getItem(key));const work=JSON.parse(data.notesByModule["portal-workbook-v2:patterns"]);work.submitted=true;localStorage.setItem(key,JSON.stringify({...data,notesByModule:{...data.notesByModule,"portal-workbook-v2:patterns":JSON.stringify(work)}}));})()');
    }
    await go('/learn/unknown-lesson/quiz');
    assert.match(await evaluate('document.querySelector("h1").textContent'),/could not be found/);
    await go('/');
    assert.equal(await evaluate('!!document.querySelector(".academy")'),false);
    assert.equal(errors.length,0,JSON.stringify(errors));
    console.log('PASS: completion gates, saved drafts, repeat XP protection, responsive layout, unchanged public home');
    console.log('Screenshots:',artifacts);
  }
} finally {
  if(socket?.readyState===1){socket.send(JSON.stringify({id:99999,method:'Browser.close'}));socket.close();}
  browser.kill();server.kill();
}

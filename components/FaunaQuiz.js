'use client';
import { useMemo, useState } from 'react';

const N = 10;
function shuffle(a) { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }

export default function FaunaQuiz({ animals, lang }) {
  const en = lang === 'en';
  const name = (a) => a[`name_${lang}`] || a.name_fr;
  const [seed, setSeed] = useState(0);
  const questions = useMemo(() => {
    if (seed === 0) return null;
    return shuffle(animals).slice(0, N).map((a) => {
      const others = shuffle(animals.filter((x) => x.slug !== a.slug && x.group === a.group)).slice(0, 3);
      const pool = others.length === 3 ? others : shuffle(animals.filter((x) => x.slug !== a.slug)).slice(0, 3);
      return { a, choices: shuffle([a, ...pool]) };
    });
  }, [seed, animals]);
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState(null);

  function start() { setSeed(Date.now()); setI(0); setScore(0); setPicked(null); }

  if (!questions) {
    return (
      <div className="quiz-start">
        <p>{en ? `${N} photos, 4 answers each. How well do you know the wildlife of East Cameroon?` : `${N} photos, 4 réponses à chaque fois. Connaissez-vous vraiment la faune de l'Est du Cameroun ?`}</p>
        <button type="button" className="btn btn-green" onClick={start}>{en ? 'Start the quiz' : 'Commencer le quiz'}</button>
      </div>
    );
  }

  if (i >= N) {
    const msg = score >= 8 ? (en ? 'Forest expert!' : 'Expert de la forêt !') : score >= 5 ? (en ? 'Good explorer!' : 'Bon explorateur !') : (en ? 'Apprentice ranger' : 'Apprenti écogarde');
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const share = en ? `I scored ${score}/${N} on the East Cameroon wildlife quiz! Can you beat me? ${url}` : `J'ai fait ${score}/${N} au quiz de la faune de l'Est du Cameroun ! Tu fais mieux ? ${url}`;
    return (
      <div className="quiz-end">
        <div className="quiz-score">{score}<small>/{N}</small></div>
        <h2>{msg}</h2>
        <div className="trip-actions" style={{ justifyContent: 'center' }}>
          <a className="btn btn-green" href={`https://wa.me/?text=${encodeURIComponent(share)}`} target="_blank" rel="noopener noreferrer">{en ? 'Challenge friends on WhatsApp' : 'Défier mes amis sur WhatsApp'}</a>
          <button type="button" className="btn btn-outline" onClick={start}>{en ? 'Play again' : 'Rejouer'}</button>
          <a className="btn btn-outline" href={`/${lang}/faune`}>{en ? 'Explore the catalogue' : 'Explorer le catalogue'}</a>
        </div>
      </div>
    );
  }

  const q = questions[i];
  const answered = picked !== null;
  return (
    <div className="quiz">
      <div className="quiz-progress"><span style={{ width: `${(i / N) * 100}%` }} /></div>
      <p className="quiz-count">{en ? 'Question' : 'Question'} {i + 1}/{N} · {en ? 'Score' : 'Score'} {score}</p>
      <div className="quiz-img">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={q.a.photo} alt={en ? 'Which animal is this?' : 'Quel est cet animal ?'} referrerPolicy="no-referrer" />
      </div>
      <h2 className="quiz-q">{en ? 'Which animal is this?' : 'Quel est cet animal ?'}</h2>
      <div className="quiz-choices">
        {q.choices.map((c) => {
          const state = !answered ? '' : c.slug === q.a.slug ? 'good' : c.slug === picked ? 'bad' : 'dim';
          return (
            <button key={c.slug} type="button" className={`quiz-choice ${state}`} disabled={answered}
              onClick={() => { setPicked(c.slug); if (c.slug === q.a.slug) setScore((s) => s + 1); }}>
              {name(c)}
            </button>
          );
        })}
      </div>
      {answered && (
        <div className="quiz-next">
          <p><b>{name(q.a)}</b> <em className="sci">{q.a.sci}</em> — <a href={`/${lang}/faune/${q.a.slug}`} target="_blank" rel="noopener">{en ? 'learn more' : 'en savoir plus'}</a></p>
          <button type="button" className="btn btn-green" onClick={() => { setI(i + 1); setPicked(null); }}>{i + 1 < N ? (en ? 'Next' : 'Suivante') : (en ? 'See my score' : 'Voir mon score')}</button>
        </div>
      )}
    </div>
  );
}

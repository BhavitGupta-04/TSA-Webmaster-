import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowUpRight, MessageSquareText, RotateCcw, Send, Sparkles, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { askSignal, MODE, OPENING_MESSAGE, type ChatMessage } from '../lib/aiClient';

const HISTORY_KEY = 'signal-lab-chat-history';

function newId() {
  return `msg-${Date.now()}-${Math.random().toString(16).slice(2, 7)}`;
}

function readHistory(): ChatMessage[] {
  if (typeof window === 'undefined') return [{ ...OPENING_MESSAGE, id: newId() }];
  try {
    const saved = window.localStorage.getItem(HISTORY_KEY);
    if (!saved) return [{ ...OPENING_MESSAGE, id: newId() }];
    const parsed: unknown = JSON.parse(saved);
    if (!Array.isArray(parsed) || parsed.length === 0) return [{ ...OPENING_MESSAGE, id: newId() }];
    return parsed.filter(
      (message): message is ChatMessage =>
        Boolean(message) &&
        typeof message === 'object' &&
        typeof (message as ChatMessage).content === 'string' &&
        ((message as ChatMessage).role === 'user' || (message as ChatMessage).role === 'assistant')
    );
  } catch {
    return [{ ...OPENING_MESSAGE, id: newId() }];
  }
}

export default function AskSignal() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(readHistory);
  const [draft, setDraft] = useState('');
  const [thinking, setThinking] = useState(false);
  const { pathname } = useLocation();

  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const threadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(HISTORY_KEY, JSON.stringify(messages.slice(-30)));
  }, [messages]);

  // Keep the newest message in view as the thread grows.
  useEffect(() => {
    if (!open) return;
    threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, thinking, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Close on route change so the panel does not follow you around the site.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        launcherRef.current?.focus();
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const send = useCallback(
    async (question: string) => {
      const trimmed = question.trim();
      if (!trimmed || thinking) return;

      const asked: ChatMessage = { id: newId(), role: 'user', content: trimmed };
      setMessages((current) => [...current, asked]);
      setDraft('');
      setThinking(true);

      const history = messages;
      const result = await askSignal(history, trimmed);

      setMessages((current) => [
        ...current,
        { id: newId(), role: 'assistant', content: result.content, suggestions: result.suggestions, link: result.link },
      ]);
      setThinking(false);
    },
    [messages, thinking]
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void send(draft);
  }

  const unreadDot = !open && messages.length <= 1;

  return (
    <>
      <button
        ref={launcherRef}
        type="button"
        className={`ask-launcher ${open ? 'is-open' : ''}`}
        aria-expanded={open}
        aria-controls="ask-signal-panel"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={20} /> : <MessageSquareText size={20} />}
        <span>{open ? 'Close' : 'Ask Signal'}</span>
        {unreadDot && <span className="ask-launcher-dot" aria-hidden="true" />}
      </button>

      <div
        id="ask-signal-panel"
        ref={panelRef}
        className={`ask-panel ${open ? 'is-open' : ''}`}
        role="dialog"
        aria-label="Ask Signal, the study guide"
        aria-modal="false"
        hidden={!open}
      >
        <header className="ask-header">
          <div>
            <span className="ask-badge"><Sparkles size={13} /> STUDY GUIDE</span>
            <h2>Ask Signal</h2>
          </div>
          <div className="ask-header-actions">
            <button
              type="button"
              className="ask-icon-button"
              aria-label="Start a new conversation"
              onClick={() => setMessages([{ ...OPENING_MESSAGE, id: newId() }])}
            >
              <RotateCcw size={16} />
            </button>
            <button type="button" className="ask-icon-button" aria-label="Close Ask Signal" onClick={() => setOpen(false)}>
              <X size={18} />
            </button>
          </div>
        </header>

        <p className="ask-disclosure">
          {MODE === 'guide'
            ? 'Answers come from a written guide to this site, not a live AI model. Nothing you type leaves your device.'
            : 'Connected to an AI model. Your messages are sent to our server to be answered.'}
        </p>

        <div className="ask-thread" ref={threadRef} role="log" aria-live="polite" aria-label="Conversation">
          {messages.map((message) => (
            <div key={message.id} className={`ask-message ask-message--${message.role}`}>
              <div className="ask-bubble">
                {message.content.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
                {message.link && (
                  <Link className="ask-bubble-link" to={message.link.to}>
                    {message.link.label} <ArrowUpRight size={14} />
                  </Link>
                )}
              </div>
              {message.role === 'assistant' && message.suggestions && message.suggestions.length > 0 && !thinking && (
                <div className="ask-suggestions">
                  {message.suggestions.map((suggestion) => (
                    <button type="button" key={suggestion} onClick={() => void send(suggestion)}>
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          {thinking && (
            <div className="ask-message ask-message--assistant">
              <div className="ask-bubble ask-typing" aria-label="Signal is typing">
                <span /><span /><span />
              </div>
            </div>
          )}
        </div>

        <form className="ask-composer" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="ask-input">Ask a question about AI or this site</label>
          <input
            ref={inputRef}
            id="ask-input"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Ask about a lesson, a term, or a prompt…"
            maxLength={400}
            autoComplete="off"
          />
          <button type="submit" aria-label="Send question" disabled={!draft.trim() || thinking}>
            <Send size={17} />
          </button>
        </form>
      </div>
    </>
  );
}

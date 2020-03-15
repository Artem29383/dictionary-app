export function synthVoice(text, lang) {
  const voices = speechSynthesis.getVoices();
  const utterance = new SpeechSynthesisUtterance();
  utterance.lang = lang;
  utterance.text = text;
  utterance.volume = 1;
  utterance.rate = 1;
  if (lang === 'en-US') {
    // eslint-disable-next-line prefer-destructuring
    utterance.voice = voices[1];
  }
  if (lang === 'ru-RU') {
    // eslint-disable-next-line prefer-destructuring
    utterance.voice = voices[0];
  }
  speechSynthesis.speak(utterance);
}

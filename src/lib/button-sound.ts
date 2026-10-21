type SoundPhase = "down" | "up";

const strokes: Record<SoundPhase, readonly (readonly [number, number])[]> = {
  down: [[0, .109], [.368, .098], [.717, .103], [1.029, .098]],
  up: [[.109, .089], [.466, .080], [.820, .084], [1.127, .081]],
};

let audio: AudioContext | null = null;
let sample: Promise<AudioBuffer> | null = null;

function loadSample() {
  if (typeof window === "undefined" || typeof AudioContext === "undefined") return null;
  if (!audio || audio.state === "closed") audio = new AudioContext();
  if (!sample) {
    const context = audio;
    sample = fetch("/sounds/key-press.wav")
      .then(response => {
        if (!response.ok) throw new Error("Keyboard sample unavailable");
        return response.arrayBuffer();
      })
      .then(data => context.decodeAudioData(data))
      .catch(error => {
        sample = null;
        throw error;
      });
  }
  return { context: audio, buffer: sample };
}

export function preloadButtonSound() {
  const loaded = loadSample();
  if (loaded) void loaded.buffer.catch(() => {});
}

export function playButtonSound(phase: SoundPhase, index = 0) {
  const loaded = loadSample();
  if (!loaded) return;

  const [offset, duration] = strokes[phase][index % strokes[phase].length];
  const resumed = loaded.context.resume();
  void Promise.all([resumed, loaded.buffer]).then(([, buffer]) => {
    if (loaded.context.state === "closed") return;
    const source = loaded.context.createBufferSource();
    source.buffer = buffer;
    source.connect(loaded.context.destination);
    source.start(0, offset, duration);
    source.onended = () => source.disconnect();
  }).catch(() => {
    // Button interactions still work when browser audio is unavailable.
  });
}

let clockSample: Promise<AudioBuffer> | null = null;
let latestTurnRequest = 0;
function loadClockSample() {
  if (typeof window === "undefined" || typeof AudioContext === "undefined") return null;
  if (!audio || audio.state === "closed") audio = new AudioContext();
  if (!clockSample) {
    const context = audio;
    clockSample = fetch("/sounds/clock-tick.wav")
      .then(response => {
        if (!response.ok) throw new Error("Clock sample unavailable");
        return response.arrayBuffer();
      })
      .then(data => context.decodeAudioData(data))
      .catch(error => { clockSample = null; throw error; });
  }
  return { context: audio, buffer: clockSample };
}

export function preloadRimSound() {
  const loaded = loadClockSample();
  if (loaded) void loaded.buffer.catch(() => {});
}

/** Real clock tick/tock recording, normalized for clear playback at a modest volume. */
export function playRimTurnSound(_direction: "clockwise" | "anticlockwise", index = 0) {
  const loaded = loadClockSample();
  if (!loaded) return;
  const request = ++latestTurnRequest;
  const requestedAt = performance.now();
  void Promise.all([loaded.context.resume(), loaded.buffer]).then(([, buffer]) => {
    // Only the latest pending tick may play; never replay a loading backlog.
    if (request !== latestTurnRequest || loaded.context.state !== "running" || performance.now() - requestedAt > 250) return;
    const source = loaded.context.createBufferSource();
    const gain = loaded.context.createGain();
    source.buffer = buffer;
    gain.gain.value = 0.75;
    source.connect(gain);
    gain.connect(loaded.context.destination);
    source.start(0, (index % 2) * 0.18, 0.16);
    source.onended = () => { source.disconnect(); gain.disconnect(); };
  }).catch(() => {
    // Turning remains functional when browser audio is unavailable.
  });
}

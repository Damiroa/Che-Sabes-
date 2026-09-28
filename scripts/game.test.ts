import assert from "node:assert/strict";
import { test } from "node:test";

const storage = new Map<string, string>();
Object.defineProperty(globalThis, "localStorage", {
  value: {
    getItem: (key: string) => storage.get(key) ?? null,
    setItem: (key: string, value: string) => storage.set(key, value),
    removeItem: (key: string) => storage.delete(key),
  },
});
Object.defineProperty(globalThis, "window", { value: { localStorage } });
const { useGameStore: store, playableQuestions } =
  await import("../artifacts/trivia-game/src/engine/gameStore");
const { expandedCourseQuestions } =
  await import("../artifacts/trivia-game/src/data/expandedCourseQuestions");
const { additionalQuestions } =
  await import("../artifacts/trivia-game/src/data/additionalQuestions");
const { courseQuestions, COURSE_SUBJECTS } =
  await import("../artifacts/trivia-game/src/data/courseQuestions");
const { questions } =
  await import("../artifacts/trivia-game/src/data/questions");
const { ACADEMIC_CATEGORIES } =
  await import("../artifacts/trivia-game/src/data/categories");
const initial = store.getInitialState();
const fresh = () => store.setState(initial, true);
const advance = () => {
  const state = store.getState();
  if (state.phase === "stage-up") state.continueAfterStageUp();
  else state.nextQuestion();
};
const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]/gu, "");

test("new database: 97 additions, unique stable IDs, four distinct options, one answer and no duplicate prompts", () => {
  assert.equal(additionalQuestions.length, 97);
  const all = [...questions, ...playableQuestions];
  assert.equal(new Set(all.map((q) => q.id)).size, all.length);
  const prompts = new Set(
    [...questions, ...courseQuestions].map((q) => normalize(q.question)),
  );
  for (const q of additionalQuestions) {
    assert.ok(!prompts.has(normalize(q.question)), q.question);
    prompts.add(normalize(q.question));
    assert.equal(q.options?.length, 4);
    assert.equal(
      new Set(
        q.options?.map((o) => o.normalize("NFC").trim().toLocaleLowerCase()),
      ).size,
      4,
    );
    assert.equal(q.options?.filter((o) => o === q.correct).length, 1);
    assert.ok(q.category in ACADEMIC_CATEGORIES);
    assert.ok(["easy", "medium", "hard"].includes(q.difficulty));
  }
  for (const category of Object.keys(ACADEMIC_CATEGORIES)) {
    assert.ok(
      playableQuestions.some((q) => q.category === category),
      category,
    );
  }
});

test("every course and subject exhausts without repeating IDs or prompts and restarts cleanly", () => {
  for (const [course, subjects] of Object.entries(COURSE_SUBJECTS)) {
    for (const subject of subjects) {
      fresh();
      store
        .getState()
        .startGame(course as keyof typeof COURSE_SUBJECTS, subject);
      const ids = new Set<number>();
      const prompts = new Set<string>();
      const expected = playableQuestions.filter(
        (q) => (!q.course || q.course === course) && q.subject === subject,
      );
      assert.ok(expected.length > 0, `${course}/${subject}`);
      while (store.getState().phase !== "game-over") {
        const state = store.getState();
        const q = state.currentQuestion!;
        assert.ok(q);
        assert.ok(!ids.has(q.id), `${course}/${subject}/${q.id}`);
        assert.ok(!prompts.has(normalize(q.question)), q.question);
        ids.add(q.id);
        prompts.add(normalize(q.question));
        state.answerQuestion(q.correct);
        advance();
      }
      assert.equal(ids.size, expected.length);
      assert.equal(store.getState().exhausted, true);
      assert.equal(store.getState().lives, 3);
      assert.equal(store.getState().currentQuestion, null);
      store.getState().resetGame();
      store
        .getState()
        .startGame(course as keyof typeof COURSE_SUBJECTS, subject);
      assert.equal(store.getState().phase, "playing");
      assert.equal(store.getState().usedQuestionIds.length, 1);
    }
  }
});

test("correct answers, score, coins, streak, timer bonus, shield and progress persist", () => {
  fresh();
  store.setState({
    coins: 100,
    shop: {
      ...initial.shop,
      timerPro: true,
      doubleCoins: true,
      shieldCount: 1,
    },
  });
  store.getState().startGame("1ro", "Matemática");
  assert.equal(store.getState().timerSeconds, 19);
  assert.equal(store.getState().shop.shieldCount, 0);
  const q = store.getState().currentQuestion!;
  store.getState().answerQuestion(q.correct);
  assert.equal(store.getState().score, q.points);
  assert.equal(store.getState().coins, 116);
  assert.equal(store.getState().timerSeconds, 18);
  advance();
  store.getState().answerQuestion("wrong");
  assert.equal(store.getState().lives, 3);
  assert.equal(store.getState().activeShield, false);
  assert.equal(store.getState().streak, 0);
  advance();
  store.getState().answerQuestion("", true);
  assert.equal(store.getState().lives, 2);
  assert.equal(store.getState().timedOut, true);
  const { highScore, coins, shop } = store.getState();
  store.getState().resetGame();
  assert.equal(store.getState().highScore, highScore);
  assert.equal(store.getState().coins, coins);
  assert.deepEqual(store.getState().shop, shop);
  const saved = JSON.parse(storage.get("che-sabes-store")!).state;
  assert.deepEqual(saved, { highScore, coins, shop });
});

test("duplicate answer/next/stage actions cannot change score, lives or consume questions twice", () => {
  fresh();
  store.getState().startGame("1ro", "Matemática");
  store.getState().answerQuestion(store.getState().currentQuestion!.correct);
  const score = store.getState().score;
  store.getState().answerQuestion("wrong");
  assert.equal(store.getState().score, score);
  assert.equal(store.getState().lives, 3);
  assert.equal(store.getState().questionsAnswered, 1);
  advance();
  const id = store.getState().currentQuestion!.id;
  store.getState().nextQuestion();
  store.getState().continueAfterStageUp();
  assert.equal(store.getState().currentQuestion!.id, id);
});

test("wrong answers after a stage boundary do not advance the stage again; three mistakes end the game", () => {
  fresh();
  store.getState().startGame("1ro", "Matemática");
  for (let i = 0; i < 4; i++) {
    store.getState().answerQuestion(store.getState().currentQuestion!.correct);
    advance();
  }
  assert.equal(store.getState().stage, 2);
  for (let i = 0; i < 3; i++) {
    store.getState().answerQuestion("wrong");
    assert.equal(store.getState().stage, 2);
    if (i < 2) advance();
  }
  assert.equal(store.getState().phase, "game-over");
  assert.equal(store.getState().lives, 0);
  assert.equal(store.getState().exhausted, false);
});

test("skips mark questions used, cannot clear session history, and stop cleanly at exhaustion", () => {
  fresh();
  store.getState().startGame("1ro", "Arte");
  const first = store.getState().currentQuestion!.id;
  store.getState().skipQuestion();
  assert.notEqual(store.getState().currentQuestion!.id, first);
  assert.equal(store.getState().skipsLeft, 1);
  store.getState().resetQuestionHistory();
  assert.equal(store.getState().usedQuestionIds.length, 2);
  const pool = playableQuestions.filter(
    (q) => (!q.course || q.course === "1ro") && q.subject === "Arte",
  );
  store.setState({ usedQuestionIds: pool.map((q) => q.id) });
  store.getState().skipQuestion();
  assert.equal(store.getState().phase, "game-over");
  assert.equal(store.getState().exhausted, true);
});

test("empty pool produces a clear end state without spending a shield", () => {
  fresh();
  store.setState({ shop: { ...initial.shop, shieldCount: 1 } });
  store.getState().startGame("invalid" as never, "invalid" as never);
  assert.equal(store.getState().phase, "game-over");
  assert.equal(store.getState().exhausted, true);
  assert.equal(store.getState().shop.shieldCount, 1);
  assert.equal(store.getState().activeShield, false);
});

test("570 additions cover every course/subject with balanced difficulty, valid answers and unique prompts", () => {
  assert.equal(expandedCourseQuestions.length, 570);
  const prompts = new Set(
    [...questions, ...courseQuestions, ...additionalQuestions].map((q) =>
      normalize(q.question),
    ),
  );
  for (const q of expandedCourseQuestions) {
    assert.ok(!prompts.has(normalize(q.question)), q.question);
    prompts.add(normalize(q.question));
    assert.equal(q.options?.length, 4);
    assert.equal(
      new Set(
        q.options?.map((o) => o.normalize("NFC").trim().toLocaleLowerCase()),
      ).size,
      4,
      q.question,
    );
    assert.equal(q.options?.filter((o) => o === q.correct).length, 1);
    assert.ok(q.category in ACADEMIC_CATEGORIES);
    assert.equal(q.points, { easy: 100, medium: 200, hard: 400 }[q.difficulty]);
  }
  for (const [course, subjects] of Object.entries(COURSE_SUBJECTS)) {
    for (const subject of subjects) {
      const pool = expandedCourseQuestions.filter(
        (q) => q.course === course && q.subject === subject,
      );
      assert.equal(pool.length, 5, `${course}/${subject}`);
      assert.deepEqual(pool.map((q) => q.difficulty).sort(), [
        "easy",
        "easy",
        "hard",
        "medium",
        "medium",
      ]);
    }
  }
});

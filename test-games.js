require("./test-setup.js");

const React = require("react");
const { render, screen, act, fireEvent } = require("@testing-library/react");

const results = [];

function logResult(name, ok, detail) {
  results.push({ name, ok, detail });
  console.log(`${ok ? "OK " : "FAIL"} — ${name}${detail ? " :: " + detail : ""}`);
}

async function testChoiceGame(name, PageComponent) {
  const errors = [];
  const origError = console.error;
  console.error = (...args) => {
    errors.push(args.join(" "));
  };

  try {
    const { unmount } = render(React.createElement(PageComponent));

    // Play through up to 8 rounds, clicking the first option then "Keyingi savol"/"Yakunlash"
    for (let i = 0; i < 8; i++) {
      const buttons = screen.queryAllByRole("button");
      // Skip if we've reached the result screen (no more option buttons found matching pattern)
      const optionButtons = buttons.filter((b) => !b.textContent.includes("Qayta o'ynash") && !b.textContent.includes("o'yinlarga qaytish") && !b.disabled);
      if (optionButtons.length === 0) break;

      await act(async () => {
        fireEvent.click(optionButtons[0]);
      });

      const nextBtn = screen.queryByText(/Keyingi savol|Yakunlash/);
      if (nextBtn) {
        await act(async () => {
          fireEvent.click(nextBtn);
        });
      } else {
        break;
      }
    }

    unmount();

    if (errors.length > 0) {
      logResult(name, false, errors[0]);
    } else {
      logResult(name, true);
    }
  } catch (err) {
    logResult(name, false, err.message);
  } finally {
    console.error = origError;
  }
}

async function testReorderGame(name, PageComponent) {
  const errors = [];
  const origError = console.error;
  console.error = (...args) => {
    errors.push(args.join(" "));
  };

  try {
    const { unmount, container } = render(React.createElement(PageComponent));

    for (let round = 0; round < 6; round++) {
      // Click all available block buttons in the "available blocks" pool, in order, until "Tekshirish" enabled
      let safety = 0;
      while (safety < 10) {
        safety++;
        const checkBtn = screen.queryByText("Tekshirish");
        if (checkBtn && !checkBtn.disabled) break;
        const buttons = Array.from(container.querySelectorAll("button"));
        const blockBtn = buttons.find(
          (b) => !["Tekshirish", "Ortga", "Keyingi raund", "Yakunlash", "Qayta o'ynash"].includes(b.textContent) && !b.disabled
        );
        if (!blockBtn) break;
        await act(async () => {
          fireEvent.click(blockBtn);
        });
      }

      const checkBtn = screen.queryByText("Tekshirish");
      if (checkBtn) {
        await act(async () => {
          fireEvent.click(checkBtn);
        });
      }

      const nextBtn = screen.queryByText(/Keyingi raund|Yakunlash/);
      if (nextBtn) {
        await act(async () => {
          fireEvent.click(nextBtn);
        });
      } else {
        break;
      }
    }

    unmount();

    if (errors.length > 0) {
      logResult(name, false, errors[0]);
    } else {
      logResult(name, true);
    }
  } catch (err) {
    logResult(name, false, err.stack || err.message);
  } finally {
    console.error = origError;
  }
}

async function testMemoryGame(name, PageComponent) {
  const errors = [];
  const origError = console.error;
  console.error = (...args) => {
    errors.push(args.join(" "));
  };
  try {
    const { unmount, container } = render(React.createElement(PageComponent));
    // Flip a handful of cards to exercise the flip/match logic
    for (let i = 0; i < 6; i++) {
      const buttons = Array.from(container.querySelectorAll("button"));
      if (buttons.length === 0) break;
      await act(async () => {
        fireEvent.click(buttons[i % buttons.length]);
      });
      await act(async () => new Promise((r) => setTimeout(r, 750)));
    }
    unmount();
    if (errors.length > 0) logResult(name, false, errors[0]);
    else logResult(name, true);
  } catch (err) {
    logResult(name, false, err.message);
  } finally {
    console.error = origError;
  }
}

async function main() {
  const choiceGames = [
    ["JS Challenge", "./app/games/js-challenge/page.js"],
    ["React Challenge", "./app/games/react-challenge/page.js"],
    ["Flexbox Game", "./app/games/flexbox-game/page.js"],
    ["Grid Game", "./app/games/grid-game/page.js"],
    ["Error Finder", "./app/games/error-finder/page.js"],
    ["Variable Puzzle", "./app/games/variable-puzzle/page.js"],
  ];
  const reorderGames = [
    ["Algorithm Game", "./app/games/algorithm-game/page.js"],
    ["Function Builder", "./app/games/function-builder/page.js"],
    ["Drag & Drop Coding", "./app/games/drag-drop-coding/page.js"],
  ];

  for (const [name, path] of choiceGames) {
    const mod = require(path);
    await testChoiceGame(name, mod.default);
  }
  for (const [name, path] of reorderGames) {
    const mod = require(path);
    await testReorderGame(name, mod.default);
  }
  const memMod = require("./app/games/code-memory/page.js");
  await testMemoryGame("Code Memory", memMod.default);

  const failed = results.filter((r) => !r.ok);
  console.log("\n=== NATIJA ===");
  console.log(`${results.length - failed.length}/${results.length} o'yin xatosiz`);
  if (failed.length) {
    console.log("Xatoliklar:", JSON.stringify(failed, null, 2));
    process.exit(1);
  }
}

main().catch((e) => {
  console.error("Test skript xatosi:", e);
  process.exit(1);
});

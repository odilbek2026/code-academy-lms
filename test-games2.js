require("./test-setup.js");

const React = require("react");
const { render, screen, act, fireEvent } = require("@testing-library/react");

const results = [];
function logResult(name, ok, detail) {
  results.push({ name, ok, detail });
  console.log(`${ok ? "OK " : "FAIL"} — ${name}${detail ? " :: " + detail : ""}`);
}

async function testBugHunter() {
  const errors = [];
  const origError = console.error;
  console.error = (...a) => errors.push(a.join(" "));
  try {
    const mod = require("./app/games/bug-hunter/page.js");
    const { unmount, container } = render(React.createElement(mod.default));
    for (let i = 0; i < 8; i++) {
      const lineButtons = Array.from(container.querySelectorAll("[class*='cursor-pointer'], button")).filter(
        (b) => !b.disabled
      );
      if (lineButtons.length === 0) break;
      await act(async () => fireEvent.click(lineButtons[0]));
      const nextBtn = screen.queryByText(/Keyingi|Yakunlash/);
      if (nextBtn) await act(async () => fireEvent.click(nextBtn));
      else break;
    }
    unmount();
    logResult("Bug Hunter", errors.length === 0, errors[0]);
  } catch (err) {
    logResult("Bug Hunter", false, err.stack);
  } finally {
    console.error = origError;
  }
}

async function testSyntaxMatch() {
  const errors = [];
  const origError = console.error;
  console.error = (...a) => errors.push(a.join(" "));
  try {
    const mod = require("./app/games/syntax-match/page.js");
    const { unmount, container } = render(React.createElement(mod.default));
    for (let i = 0; i < 10; i++) {
      const buttons = Array.from(container.querySelectorAll("button")).filter((b) => !b.disabled);
      if (buttons.length === 0) break;
      await act(async () => fireEvent.click(buttons[i % buttons.length]));
      await act(async () => new Promise((r) => setTimeout(r, 200)));
    }
    unmount();
    logResult("Syntax Match", errors.length === 0, errors[0]);
  } catch (err) {
    logResult("Syntax Match", false, err.stack);
  } finally {
    console.error = origError;
  }
}

async function testTypingSpeed() {
  const errors = [];
  const origError = console.error;
  console.error = (...a) => errors.push(a.join(" "));
  try {
    const mod = require("./app/games/typing-speed/page.js");
    const { unmount, container } = render(React.createElement(mod.default));
    const textarea = container.querySelector("textarea") || container.querySelector("input");
    if (textarea) {
      await act(async () => {
        fireEvent.change(textarea, { target: { value: "const x = 1;" } });
      });
      await act(async () => new Promise((r) => setTimeout(r, 100)));
    }
    unmount();
    logResult("Typing Speed", errors.length === 0, errors[0]);
  } catch (err) {
    logResult("Typing Speed", false, err.stack);
  } finally {
    console.error = origError;
  }
}

async function main() {
  await testBugHunter();
  await testSyntaxMatch();
  await testTypingSpeed();

  const failed = results.filter((r) => !r.ok);
  console.log(`\n${results.length - failed.length}/${results.length} xatosiz`);
  if (failed.length) {
    console.log(JSON.stringify(failed, null, 2));
    process.exit(1);
  }
}

main();

require("./test-setup.js");
const React = require("react");
const { render, screen, act, fireEvent } = require("@testing-library/react");

async function run() {
  const errors = [];
  const origError = console.error;
  console.error = (...a) => errors.push(a.join(" "));
  try {
    const mod = require("./app/quiz/page.js");
    const { unmount, container } = render(React.createElement(mod.default));

    // Kategoriya/daraja tanlovlaridan keyin "Boshlash" tugmasini bosamiz
    const startBtn = screen.queryByText(/Boshlash/i);
    if (startBtn) {
      await act(async () => fireEvent.click(startBtn));
    }

    // 10 savol davomida birinchi variantni tanlab, "Keyingi"ni bosamiz
    for (let i = 0; i < 12; i++) {
      const optionButtons = Array.from(container.querySelectorAll("button")).filter((b) => !b.disabled);
      if (optionButtons.length === 0) break;
      await act(async () => fireEvent.click(optionButtons[0]));
      const nextBtn = screen.queryByText(/Keyingi|Yakunlash|Natijani ko'rish/i);
      if (nextBtn) await act(async () => fireEvent.click(nextBtn));
    }

    unmount();
    console.log(errors.length === 0 ? "OK — Quiz" : "FAIL — Quiz :: " + errors[0]);
  } catch (err) {
    console.log("FAIL — Quiz :: " + (err.stack || err.message));
  } finally {
    console.error = origError;
  }
}
run();

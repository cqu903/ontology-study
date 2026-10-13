/* ==========================================================================
   Ontology Study · 共享测验组件 v1
   用法（在 lesson 中）：
     <div class="quiz" data-quiz='{
       "title": "练习标题",
       "choices": ["选项A", "选项B", ...],          // 分类题的类别，或留空用每题自带 options
       "items": [
         {"stem": "题干",
          "answer": 2,                              // 正确选项索引
          "explain": "答对/答错后显示的解释",
          "options": ["甲","乙","丙","丁"]          // 可选：覆盖全局 choices（选择题）
         }
       ]
     }'></div>
     <script src="../assets/quiz.js"></script>
   行为：一次一题 → 点击选项 → 即时判定 + 解释 → 下一题 → 总分。
   依赖 assets/course.css 中的 .quiz* 样式。
   ========================================================================== */

(function () {
  "use strict";

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text;
    return node;
  }

  function initQuiz(root) {
    var cfg;
    try {
      cfg = JSON.parse(root.getAttribute("data-quiz"));
    } catch (e) {
      root.textContent = "测验配置解析失败: " + e.message;
      return;
    }
    var items = cfg.items || [];
    var idx = 0;
    var score = 0;

    var head = el("div", "quiz-head");
    var title = el("p", "quiz-title", cfg.title || "练习");
    var progress = el("span", "quiz-progress");
    head.appendChild(title);
    head.appendChild(progress);
    root.appendChild(head);

    var body = el("div", "quiz-body");
    root.appendChild(body);

    function renderProgress() {
      progress.textContent = (idx + 1) + " / " + items.length;
    }

    function renderItem() {
      body.innerHTML = "";
      renderProgress();
      var item = items[idx];
      var options = item.options || cfg.choices || [];
      var answer = item.answer;

      body.appendChild(el("p", "quiz-stem", item.stem));

      var grid = el("div", "quiz-choices");
      var buttons = [];
      options.forEach(function (opt, i) {
        var b = el("button", "quiz-choice", opt);
        b.type = "button";
        b.addEventListener("click", function () { judge(i); });
        grid.appendChild(b);
        buttons.push(b);
      });
      body.appendChild(grid);

      var feedback = el("div", "quiz-feedback");
      body.appendChild(feedback);

      var next = el("button", "quiz-next", idx === items.length - 1 ? "查看结果 →" : "下一题 →");
      next.type = "button";
      next.addEventListener("click", function () {
        idx += 1;
        if (idx < items.length) renderItem();
        else renderResult();
      });
      body.appendChild(next);

      function judge(pick) {
        buttons.forEach(function (b) { b.disabled = true; });
        var ok = pick === answer;
        if (ok) {
          score += 1;
          buttons[pick].classList.add("picked-correct");
          buttons[pick].appendChild(el("span", "verdict", "✓"));
        } else {
          buttons[pick].classList.add("picked-wrong");
          buttons[pick].appendChild(el("span", "verdict", "✗"));
          buttons[answer].classList.add("reveal-correct");
        }
        feedback.className = "quiz-feedback " + (ok ? "ok" : "no");
        var line = el("p");
        line.className = "verdict-line";
        line.textContent = ok ? "正确。" : "不对——正确答案是高亮的那一项。";
        feedback.appendChild(line);
        feedback.appendChild(document.createTextNode(item.explain || ""));
        next.style.display = "inline-block";
        if (ok) next.focus();
      }
    }

    function renderResult() {
      body.innerHTML = "";
      progress.textContent = "完成";
      var wrap = el("div", "quiz-result");
      wrap.appendChild(el("p", "score", score + " / " + items.length));
      var msg = el("p");
      msg.textContent =
        score === items.length
          ? "全对。这一课的心智模型已经进入你的口袋。"
          : score >= items.length - 2
          ? "不错。错的那道题值得回看一眼解释——往往是最有信息量的。"
          : "建议回看上方概念卡片后重做一遍，尤其是答错的题。";
      wrap.appendChild(msg);
      var retry = el("button", "quiz-retry", "重做一遍");
      retry.type = "button";
      retry.addEventListener("click", function () {
        idx = 0;
        score = 0;
        renderItem();
      });
      wrap.appendChild(retry);
      body.appendChild(wrap);
    }

    if (items.length) renderItem();
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".quiz[data-quiz]").forEach(initQuiz);
  });
})();

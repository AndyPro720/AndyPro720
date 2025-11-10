gsap.registerPlugin(CustomEase, SplitText, ScrambleTextPlugin);

document.addEventListener("DOMContentLoaded", function () {
  CustomEase.create("customEase", "0.86, 0, 0.07, 1");
  CustomEase.create("mouseEase", "0.25, 0.1, 0.25, 1");

  document.fonts.ready.then(() => {
    initializeAnimation();
  });

  function initializeAnimation() {
    const backgroundTextItems = document.querySelectorAll(".text-item");
    const backgroundImages = {
      default: document.getElementById("default-bg"),
      server: document.getElementById("server-bg"),
      dev: document.getElementById("dev-bg"),
      home: document.getElementById("home-bg")
    };
    
    // --- DEFINE PROMPT & TEXTROWS HERE ---
  const promptElement = document.querySelector('.hover-prompt');
  let originalPromptText = promptElement ? promptElement.textContent : "Hover for context. Click to enter.";
  const textRows = document.querySelectorAll(".text-row"); // textRows is now defined here

  // Makes the new prompt pulse gently
  const promptPulse = gsap.to(".hover-prompt", {
    opacity: 1,
    duration: 2.5,
    repeat: 1,
    yoyo: true,
    ease: "sine.inOut"
  });
    
    
    const promptLink = document.querySelector(".hover-prompt-link");
    const allTextRows = document.querySelectorAll(".text-row");

  let clickCount = 0;
  
  // 2. Create your list of hints
  const hintTexts = [
    originalPromptText, // State 0
    "⬆️ Use SERVER, .DEV, or HOME ⬆️", // State 2
    "Those three big words are the real links. Try one!" // State 3
  ];

  if (promptLink && allTextRows.length > 0 && promptElement) {
    promptLink.addEventListener("click", (e) => {
      // 1. ALWAYS prevent navigation. This button is just a hint.
      e.preventDefault();

      // 2. Run your border animation
      gsap.to(allTextRows, {
        borderColor: "#179fe8ff",
        duration: 0.8,
        stagger: 0.1,
        repeat: 1,
        yoyo: true
      });
      
      // 3. Increment click counter
      clickCount++;
      
      // 4. Update the text. 
      // The % (modulo) operator makes it cycle back to the beginning
      // after the last hint.
      let hintIndex = clickCount % hintTexts.length;
      promptElement.textContent = hintTexts[hintIndex];
      
      // 5. If you want it to navigate on the 4th click, you can
      // add this 'if' statement:
      if (clickCount === 3) {
         // Optionally, add a delay so they can read the text
         setTimeout(() => {
            window.location.href = 'home.html';
         }, 1000); // 1-second delay
      }
    });
  }

    function switchBackgroundImage(id) {
      Object.values(backgroundImages).forEach((bg) => {
        if (bg) { // Add null check for safety
          gsap.to(bg, {
            opacity: 0,
            duration: 0.4,
            ease: "customEase"
          });
        }
      });

      if (backgroundImages[id]) {
        gsap.to(backgroundImages[id], {
          opacity: 1,
          duration: 0.4,
          ease: "customEase",
          delay: 0.1
        });
      } else if (backgroundImages.default) {
        gsap.to(backgroundImages.default, {
          opacity: 1,
          duration: 0.4,
          ease: "customEase",
          delay: 0.1
        });
      }
    }

    const alternativeTexts = {
      server: {
        BE: "BECOME",
        PRESENT: "MINDFUL",
        LISTEN: "HEAR",
        DEEPLY: "INTENTLY",
        OBSERVE: "NOTICE",
        "&": "+",
        FEEL: "SENSE",
        MAKE: "CREATE",
        BETTER: "IMPROVED",
        DECISIONS: "CHOICES",
        THE: "YOUR",
        CREATIVE: "ARTISTIC",
        PROCESS: "JOURNEY",
        IS: "FEELS",
        MYSTERIOUS: "MAGICAL",
        S: "START",
        I: "INSPIRE",
        M: "MAKE",
        P: "PURE",
        L: "LIGHT",
        C: "CREATE",
        T: "TRANSFORM",
        Y: "YOURS",
        "IS THE KEY": "UNLOCKS ALL",
        "FIND YOUR VOICE": "SPEAK YOUR TRUTH",
        "TRUST INTUITION": "FOLLOW INSTINCT",
        "EMBRACE SILENCE": "WELCOME STILLNESS",
        "QUESTION EVERYTHING": "CHALLENGE NORMS",
        TRUTH: "HONESTY",
        WISDOM: "INSIGHT",
        FOCUS: "CONCENTRATE",
        ATTENTION: "AWARENESS",
        AWARENESS: "CONSCIOUSNESS",
        PRESENCE: "BEING",
        SIMPLIFY: "MINIMIZE",
        REFINE: "PERFECT"
      },
      dev: {
        BE: "EVOLVE",
        PRESENT: "ENGAGED",
        LISTEN: "ABSORB",
        DEEPLY: "FULLY",
        OBSERVE: "ANALYZE",
        "&": "→",
        FEEL: "EXPERIENCE",
        MAKE: "BUILD",
        BETTER: "STRONGER",
        DECISIONS: "SYSTEMS",
        THE: "EACH",
        CREATIVE: "ITERATIVE",
        PROCESS: "METHOD",
        IS: "BECOMES",
        MYSTERIOUS: "REVEALING",
        S: "STRUCTURE",
        I: "ITERATE",
        M: "METHOD",
        P: "PRACTICE",
        L: "LEARN",
        C: "CONSTRUCT",
        T: "TECHNIQUE",
        Y: "YIELD",
        "IS THE KEY": "DRIVES SUCCESS",
        "FIND YOUR VOICE": "DEVELOP YOUR STYLE",
        "TRUST INTUITION": "FOLLOW THE FLOW",
        "EMBRACE SILENCE": "VALUE PAUSES",
        "QUESTION EVERYTHING": "EXAMINE DETAILS",
        TRUTH: "CLARITY",
        WISDOM: "KNOWLEDGE",
        FOCUS: "DIRECTION",
        ATTENTION: "PRECISION",
        AWARENESS: "UNDERSTANDING",
        PRESENCE: "ENGAGEMENT",
        SIMPLIFY: "STREAMLINE",
        REFINE: "OPTIMIZE"
      },
      home: {
        BE: "SEE",
        PRESENT: "FOCUSED",
        LISTEN: "UNDERSTAND",
        DEEPLY: "CLEARLY",
        OBSERVE: "PERCEIVE",
        "&": "=",
        FEEL: "KNOW",
        MAKE: "ACHIEVE",
        BETTER: "CLEARER",
        DECISIONS: "VISION",
        THE: "THIS",
        CREATIVE: "INSIGHTFUL",
        PROCESS: "THINKING",
        IS: "BRINGS",
        MYSTERIOUS: "ILLUMINATING",
        S: "SHARP",
        I: "INSIGHT",
        M: "MINDFUL",
        P: "PRECISE",
        L: "LUCID",
        C: "CLEAR",
        T: "TRANSPARENT",
        Y: "YES",
        "IS THE KEY": "REVEALS TRUTH",
        "FIND YOUR VOICE": "DISCOVER YOUR VISION",
        "TRUST INTUITION": "BELIEVE YOUR EYES",
        "EMBRACE SILENCE": "SEEK STILLNESS",
        "QUESTION EVERYTHING": "CLARIFY ASSUMPTIONS",
        NOTTRUTH: "domain",
        WISDOM: "PERCEPTION",
        FOCUS: "CLARITY",
        ATTENTION: "OBSERVATION",
        AWARENESS: "RECOGNITION",
        PRESENCE: "ALERTNESS",
        SIMPLIFY: "DISTILL",
        REFINE: "SHARPEN"
      }
    };

    backgroundTextItems.forEach((item) => {
      item.dataset.originalText = item.textContent;
      item.dataset.text = item.textContent;
      gsap.set(item, { opacity: 1 });
    });

    const typeLines = document.querySelectorAll(".type-line");
    typeLines.forEach((line, index) => {
      if (index % 2 === 0) {
        line.classList.add("odd");
      } else {
        line.classList.add("even");
      }
    });

    const oddLines = document.querySelectorAll(".type-line.odd");
    const evenLines = document.querySelectorAll(".type-line.even");
    const TYPE_LINE_OPACITY = 0.015;

    const state = {
      activeRowId: null,
      kineticAnimationActive: false,
      activeKineticAnimation: null,
      textRevealAnimation: null,
      transitionInProgress: false // 1. Re-enabled this state
    };

    const splitTexts = {};

    textRows.forEach((row, index) => {
      const textElement = row.querySelector(".text-content");
      const text = textElement.dataset.text;
      const rowId = row.dataset.rowId;

      splitTexts[rowId] = new SplitText(textElement, {
        type: "chars",
        charsClass: "char",
        mask: true,
        reduceWhiteSpace: false,
        propIndex: true
      });

      textElement.style.visibility = "visible";
    });

    function updateCharacterWidths() {
      const isMobile = window.innerWidth < 1024;

      textRows.forEach((row, index) => {
        const rowId = row.dataset.rowId;
        const textElement = row.querySelector(".text-content");
        const computedStyle = window.getComputedStyle(textElement);
        const currentFontSize = computedStyle.fontSize;
        const chars = splitTexts[rowId].chars;

        chars.forEach((char, i) => {
          const charText =
            char.textContent ||
            (char.querySelector(".char-inner")
              ? char.querySelector(".char-inner").textContent
              : "");
          if (!charText && i === 0) return;

          let charWidth;

          if (isMobile) {
            const fontSizeValue = parseFloat(currentFontSize);
            const standardCharWidth = fontSizeValue * 0.6;
            charWidth = standardCharWidth;

            if (!char.querySelector(".char-inner") && charText) {
              char.textContent = "";
              const innerSpan = document.createElement("span");
              innerSpan.className = "char-inner";
              innerSpan.textContent = charText;
              char.appendChild(innerSpan);
              innerSpan.style.transform = "translate3d(0, 0, 0)";
            }

            char.style.width = `${charWidth}px`;
            char.style.maxWidth = `${charWidth}px`;
            char.dataset.charWidth = charWidth;
            char.dataset.hoverWidth = charWidth;
          } else {
            const tempSpan = document.createElement("span");
            tempSpan.style.position = "absolute";
            tempSpan.style.visibility = "hidden";
            tempSpan.style.fontSize = currentFontSize;
            tempSpan.style.fontFamily = "Longsile, sans-serif";
            tempSpan.textContent = charText;
            document.body.appendChild(tempSpan);

            const actualWidth = tempSpan.offsetWidth;
            document.body.removeChild(tempSpan);

            const fontSizeValue = parseFloat(currentFontSize);
            const fontSizeRatio = fontSizeValue / 160;
            const padding = 10 * fontSizeRatio;

            charWidth = Math.max(actualWidth + padding, 30 * fontSizeRatio);

            if (!char.querySelector(".char-inner") && charText) {
              char.textContent = "";
              const innerSpan = document.createElement("span");
              innerSpan.className = "char-inner";
              innerSpan.textContent = charText;
              char.appendChild(innerSpan);
              innerSpan.style.transform = "translate3d(0, 0, 0)";
            }

            char.style.width = `${charWidth}px`;
            char.style.maxWidth = `${charWidth}px`;
            char.dataset.charWidth = charWidth;

            const hoverWidth = Math.max(charWidth * 1.8, 85 * fontSizeRatio);
            char.dataset.hoverWidth = hoverWidth;
          }

          char.style.setProperty("--char-index", i);
        });
      });
    }

    updateCharacterWidths();

    window.addEventListener("resize", function () {
      clearTimeout(window.resizeTimer);
      window.resizeTimer = setTimeout(function () {
        updateCharacterWidths();
      }, 250);
    });

    textRows.forEach((row, rowIndex) => {
      const rowId = row.dataset.rowId;
      const chars = splitTexts[rowId].chars;

      gsap.set(chars, {
        opacity: 0,
        filter: "blur(15px)"
      });

      gsap.to(chars, {
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.8,
        stagger: 0.09,
        ease: "customEase",
        delay: 0.15 * rowIndex
      });
    });

    function forceResetKineticAnimation() {
      if (state.activeKineticAnimation) {
        state.activeKineticAnimation.kill();
        state.activeKineticAnimation = null;
      }

      const kineticType = document.getElementById("kinetic-type");
      gsap.killTweensOf([kineticType, typeLines, oddLines, evenLines]);

      gsap.set(kineticType, {
        display: "grid",
        scale: 1,
        rotation: 0,
        // opacity: 1, // This is handled by the JS-injected style
        visibility: "visible"
      });

      gsap.set(typeLines, {
        opacity: TYPE_LINE_OPACITY,
        x: "0%"
      });

      state.kineticAnimationActive = false;
    }

    function startKineticAnimation(text) {
      forceResetKineticAnimation();

      const kineticType = document.getElementById("kinetic-type");

      kineticType.style.display = "grid";
      // kineticType.style.opacity = "1"; // Let GSAP handle opacity
      kineticType.style.visibility = "visible";

      const repeatedText = `${text} ${text} ${text}`;

      typeLines.forEach((line) => {
        line.textContent = repeatedText;
      });

      setTimeout(() => {
        const timeline = gsap.timeline({
          onComplete: () => {
            state.kineticAnimationActive = false;
          }
        });
      
        // Also fade in the main container
        timeline.to(kineticType, {
          opacity: 1,
          duration: 1,
          ease: "customEase"
        }, 0);

        timeline.to(kineticType, {
          duration: 1.4,
          ease: "customEase",
          scale: 2.7,
          rotation: -90
        }, 0); // Run at the same time as opacity fade-in

        timeline.to(
          oddLines,
          {
            keyframes: [
              { x: "20%", duration: 1, ease: "customEase" },
              { x: "-200%", duration: 1.5, ease: "customEase" }
            ],
            stagger: 0.08
          },
          0
        );

        timeline.to(
          evenLines,
          {
            keyframes: [
              { x: "-20%", duration: 1, ease: "customEase" },
              { x: "200%", duration: 1.5, ease: "customEase" }
            ],
            stagger: 0.08
          },
          0
        );

        timeline.to(
          typeLines,
          {
            keyframes: [
              { opacity: 1, duration: 1, ease: "customEase" },
              { opacity: 0, duration: 1.5, ease: "customEase" }
            ],
            stagger: 0.05
          },
          0
        );

        state.kineticAnimationActive = true;
        state.activeKineticAnimation = timeline;
      }, 20);
    }

    function fadeOutKineticAnimation() {
      if (!state.kineticAnimationActive) return;

      if (state.activeKineticAnimation) {
        state.activeKineticAnimation.kill();
        state.activeKineticAnimation = null;
      }

      const kineticType = document.getElementById("kinetic-type");

      const fadeOutTimeline = gsap.timeline({
        onComplete: () => {
          gsap.set(kineticType, {
            scale: 1,
            rotation: 0
            // Opacity is reset by the JS-injected style
          });

          gsap.set(typeLines, {
            opacity: TYPE_LINE_OPACITY,
            x: "0%"
          });

          state.kineticAnimationActive = false;
        }
      });

      fadeOutTimeline.to(kineticType, {
        opacity: 0, // This will fade to 0, overriding the JS-injected style
        scale: 0.8,
        duration: 0.5,
        ease: "customEase"
      });
    }

    function transitionBetweenRows(fromRow, toRow) {
      if (fromRow.dataset.rowId === 'server') resetPrompt();
      state.transitionInProgress = true; // Set flag

      const fromRowId = fromRow.dataset.rowId;
      const toRowId = toRow.dataset.rowId;

      fromRow.classList.remove("active");
      const fromChars = splitTexts[fromRowId].chars;
      const fromInners = fromRow.querySelectorAll(".char-inner");
      gsap.killTweensOf(fromChars);
      gsap.killTweensOf(fromInners);

      toRow.classList.add("active");
      state.activeRowId = toRowId;

      const toText = toRow.querySelector(".text-content").dataset.text;
      const toCharsToAnimate = splitTexts[toRowId].chars.slice(1);
      const toInnersToAnimate = Array.from(
        toRow.querySelectorAll(".char-inner")
      ).slice(1);

      forceResetKineticAnimation();
      switchBackgroundImage(toRowId);
      startKineticAnimation(toText);
      if (state.textRevealAnimation) {
        state.textRevealAnimation.kill();
      }
      state.textRevealAnimation = createTextRevealAnimation(toRowId);

      gsap.set(fromChars, {
        maxWidth: (i, target) => parseFloat(target.dataset.charWidth)
      });
      gsap.set(fromInners, {
        x: 0
      });

      const timeline = gsap.timeline({
        onComplete: () => {
          state.transitionInProgress = false; // Unset flag
        }
      });

      timeline.to(
        toCharsToAnimate,
        {
          maxWidth: (i, target) => parseFloat(target.dataset.hoverWidth),
          duration: 0.64,
          stagger: 0.04,
          ease: "customEase"
        },
        0
      );

      timeline.to(
        toInnersToAnimate,
        {
          x: -35,
          duration: 0.64,
          stagger: 0.04,
          ease: "customEase"
        },
        0.05
      );
    } 

    function createTextRevealAnimation(rowId) {
      const timeline = gsap.timeline();
      timeline.to(backgroundTextItems, {
        opacity: 0.3,
        duration: 0.5,
        ease: "customEase"
      });
      timeline.call(() => {
        backgroundTextItems.forEach((item) => {
          item.classList.add("highlight");
        });
      });
      timeline.call(
        () => {
          backgroundTextItems.forEach((item) => {
            const originalText = item.dataset.text;
            if (
              alternativeTexts[rowId] &&
              alternativeTexts[rowId][originalText]
            ) {
              item.textContent = alternativeTexts[rowId][originalText];
            }
          });
        },
        null,
        "+=0.5"
      );
      timeline.call(() => {
        backgroundTextItems.forEach((item) => {
          item.classList.remove("highlight");
          item.classList.add("highlight-reverse");
        });
      });
      timeline.call(
        () => {
          backgroundTextItems.forEach((item) => {
            item.classList.remove("highlight-reverse");
          });
        },
        null,
        "+=0.5"
      );
      return timeline;
    }

    function resetBackgroundTextWithAnimation() {
      const timeline = gsap.timeline();
      timeline.call(() => {
        backgroundTextItems.forEach((item) => {
          item.classList.add("highlight");
        });
      });
      timeline.call(
        () => {
          backgroundTextItems.forEach((item) => {
            item.textContent = item.dataset.originalText;
          });
        },
        null,
        "+=0.5"
      );
      timeline.call(() => {
        backgroundTextItems.forEach((item) => {
          item.classList.remove("highlight");
          item.classList.add("highlight-reverse");
        });
      });
      timeline.call(
        () => {
          backgroundTextItems.forEach((item) => {
            item.classList.remove("highlight-reverse");
          });
        },
        null,
        "+=0.5"
      );
      timeline.to(backgroundTextItems, {
        opacity: 1,
        duration: 0.5,
        ease: "customEase"
      });
      return timeline;
    }

    function activateRow(row) {
      const rowId = row.dataset.rowId;
      if (state.activeRowId === rowId) return;

      // 1. Add check
      if (state.transitionInProgress) return; 

      const activeRow = document.querySelector(".text-row.active");

      if (activeRow) {
        transitionBetweenRows(activeRow, row);
      } else {
        state.transitionInProgress = true; // 1. Set flag
        row.classList.add("active");
        state.activeRowId = rowId;

        const text = row.querySelector(".text-content").dataset.text;
        const charsToAnimate = splitTexts[rowId].chars.slice(1);
        const innersToAnimate = Array.from(
          row.querySelectorAll(".char-inner")
        ).slice(1);

        switchBackgroundImage(rowId);
        startKineticAnimation(text);

        if (state.textRevealAnimation) {
          state.textRevealAnimation.kill();
        }
        state.textRevealAnimation = createTextRevealAnimation(rowId);

        const timeline = gsap.timeline({
          onComplete: () => {
            state.transitionInProgress = false; // 1. Unset flag
          }
        });

        timeline.to(
          charsToAnimate,
          {
            maxWidth: (i, target) => parseFloat(target.dataset.hoverWidth),
            duration: 0.64,
            stagger: 0.04,
            ease: "customEase"
          },
          0
        );

        timeline.to(
          innersToAnimate,
          {
            x: -35,
            duration: 0.64,
            stagger: 0.04,
            ease: "customEase"
          },
          0.05
        );
      }
    } 
    function deactivateRow(row) {
      if (state.activeRowId === 'server') resetPrompt(); // Reset prompt if 'server' is not in focus
      const rowId = row.dataset.rowId;
      if (state.activeRowId !== rowId) return;

      // 1. Add check
      if (state.transitionInProgress) return; 
      
      state.transitionInProgress = true; // 1. Set flag
      state.activeRowId = null;
      row.classList.remove("active");

      switchBackgroundImage("default");
      fadeOutKineticAnimation();

      if (state.textRevealAnimation) {
        state.textRevealAnimation.kill();
      }
      state.textRevealAnimation = resetBackgroundTextWithAnimation();

      const charsToAnimate = splitTexts[rowId].chars.slice(1);
      const innersToAnimate = Array.from(
        row.querySelectorAll(".char-inner")
      ).slice(1);

      // Add killTweensOf to prevent race condition on quick hover
      gsap.killTweensOf([charsToAnimate, innersToAnimate]);

      const timeline = gsap.timeline({
        onComplete: () => {
          state.transitionInProgress = false; // 1. Unset flag
        }
      });

      timeline.to(
        innersToAnimate,
        {
          x: 0,
          duration: 0.64,
          stagger: 0.03,
          ease: "customEase"
        },
        0
      );

      timeline.to(
        charsToAnimate,
        {
          maxWidth: (i, target) => parseFloat(target.dataset.charWidth),
          duration: 0.64,
          stagger: 0.03,
          ease: "customEase"
        },
        0.05
      );
    }

    function initializeParallax() {
      const container = document.querySelector("body");
      const backgroundElements = [
        ...document.querySelectorAll("[id$='-bg']"),
        ...document.querySelectorAll(".bg-text-container") 
      ];

      const parallaxLayers = [0.02, 0.03, 0.04, 0.05];
      backgroundElements.forEach((el, index) => {
        el.dataset.parallaxSpeed =
          parallaxLayers[index % parallaxLayers.length];
        gsap.set(el, {
          transformOrigin: "center center",
          force3D: true
        });
      });

      let lastParallaxTime = 0;
      const throttleParallax = 20;

      container.addEventListener("mousemove", (e) => {
        const now = Date.now();
        if (now - lastParallaxTime < throttleParallax) return;
        lastParallaxTime = now;

        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const offsetX = (e.clientX - centerX) / centerX;
        const offsetY = (e.clientY - centerY) / centerY;

        backgroundElements.forEach((el) => {
          const speed = parseFloat(el.dataset.parallaxSpeed);
          if (el.id && el.id.endsWith("-bg") && el.style.opacity === "0") {
            return;
          }
          const moveX = offsetX * 100 * speed;
          const moveY = offsetY * 50 * speed;
          gsap.to(el, {
            x: moveX,
            y: moveY,
            duration: 1.0,
            ease: "mouseEase",
            overwrite: "auto"
          });
        });
      });

      container.addEventListener("mouseleave", () => {
        backgroundElements.forEach((el) => {
          gsap.to(el, {
            x: 0,
            y: 0,
            duration: 1.5,
            ease: "customEase"
          });
        });
      });

      backgroundElements.forEach((el, index) => {
        const delay = index * 0.2;
        const floatAmount = 5 + (index % 3) * 2;
        gsap.to(el, {
          y: `+=${floatAmount}`,
          duration: 3 + (index % 2),
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true, 
          delay: delay
        });
      });
    }


      function scrambleRandomText() {
      if (backgroundTextItems.length === 0) return; // Add safety check
      const randomIndex = Math.floor(
        Math.random() * backgroundTextItems.length
      );
      const randomItem = backgroundTextItems[randomIndex];
      const originalText = randomItem.dataset.text;

      gsap.to(randomItem, {
        duration: 1,
        scrambleText: {
          text: originalText,
          chars: "■▪▌▐▬",
          revealDelay: 0.5,
          speed: 0.3
        },
        ease: "none"
      });

      const delay = 0.5 + Math.random() * 2;
      setTimeout(scrambleRandomText, delay * 1000);
    }

    setTimeout(scrambleRandomText, 1000);

    const simplicity = document.querySelector(
      '.text-item[data-text="IS THE KEY"]'
    );
    if (simplicity) {
      const splitSimplicity = new SplitText(simplicity, {
        type: "chars",
        charsClass: "simplicity-char"
      });

      gsap.from(splitSimplicity.chars, {
        opacity: 0,
        scale: 0.5,
        duration: 1,
        stagger: 0.015,
        ease: "customEase",
        delay: 1
      });
    }

    backgroundTextItems.forEach((item, index) => {
      const delay = index * 0.1;
      gsap.to(item, {
        opacity: 0.85,
        duration: 2 + (index % 3),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: delay
      });
    });

    initializeParallax();

    // 4. Modified this to respect your TYPE_LINE_OPACITY variable
    const style = document.createElement("style");
    style.textContent = `
      #kinetic-type {
        z-index: 200 !important;
        display: grid !important;
        visibility: visible !important;
        opacity: ${TYPE_LINE_OPACITY}; 
        pointer-events: none;
      }
    `;
    document.head.appendChild(style);
  
  async function checkVpn() {
    // This controller will let us cancel the request after 2 seconds
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    try {
      // We try to fetch your server. 
      // 'no-cors' mode is important. We don't need to read the response,
      // we just need to see if the server is reachable.
      await fetch('https://server.angaj.org', {
        signal: controller.signal,
        mode: 'no-cors'
      });
      
      // If we get here, the request succeeded.
      clearTimeout(timeoutId);
      return true;
    } catch (error) {
      // If we get here, the request failed (timeout or network error)
      clearTimeout(timeoutId);
      return false;
    }
  }
  // --- ADD THIS NEW HELPER FUNCTION ---
  function resetPrompt() {
    if (!promptElement) return;
    gsap.killTweensOf(promptElement); // Stop any error animations
    gsap.set(promptElement, { 
      textContent: originalPromptText,
      color: "", // Resets to default CSS color
      x: 0 
    });
    promptPulse.restart(); // Restart the default pulse
  }
  
  async function serverClickHandler(e) {
    e.preventDefault(); // Stop the link
    const row = e.currentTarget; //store link for redirection later

    // 1. Start the VPN check IN THE BACKGROUND
    // We don't await it yet.
    const vpnCheckPromise = checkVpn();

    // 2. Play the "Access restricted" animation
    promptPulse.pause();
    gsap.killTweensOf(promptElement);
    gsap.timeline()
      .set(promptElement, { 
        textContent: "Access restricted to private network; checking...", 
        color: "#00ffc8ff", // Orange color
        x: 0 
      })
      .to(promptElement, { x: "+=5", duration: 0.05, yoyo: true, repeat: 5 })
      .set(promptElement, { x: 0 });

    // 3. After 3 seconds, check the result and show final status
    setTimeout(async () => {
      // Now we await the result
      const isOnVpn = await vpnCheckPromise;
      
      if (isOnVpn) {
        gsap.set(promptElement, { textContent: "Success! Redirecting...", color: "#39FF14" });
        // User request: delay navigation by 1 second
        setTimeout(() => {
          if (row.target === '_blank') {
            window.open(row.href, '_blank', 'noopener,noreferrer');
          } else {
            window.location.href = row.href;
          }
        }, 1000);
      } else {
        // Failure
        gsap.set(promptElement, { textContent: "Access Denied. VPN not detected.", color: "red" });
        // Reset the prompt after 5 seconds
        setTimeout(resetPrompt, 5000);
      }
    }, 3000); // 3-second delay for the "Access restricted" message
  }
 
// --- START: NEW EVENT LISTENER BLOCK ---

    // 1. Detect if it's a touch device
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    
    // 2. Get the prompt element and change its text
    if (promptElement) { // Add null check for safety
      if (isTouchDevice) {
        promptElement.textContent = "Tap for context. Tap again to enter.";
      } else {
        promptElement.textContent = "Hover for context. Click to enter.";
      }
      originalPromptText = promptElement.textContent; // This is now correct (using let)
    }

    // 3. Apply event listeners based on device
    textRows.forEach((row) => {
      const rowId = row.dataset.rowId; // Get rowId once

      if (isTouchDevice) {
        // --- YOUR TOUCH LOGIC (Tap to toggle, tap again to go) ---
        row.addEventListener('click', (e) => {

          if (state.activeRowId === rowId) {
            // --- SECOND TAP: Navigate ---
            
            // Check if it's the server link
            if (rowId === 'server') {
              e.preventDefault();
              serverClickHandler(e, row); // Run server check
            } else {
              // Normal navigation for DEV and home
              const href = row.href;
              if (!href) {
                console.error("Link has no href attribute:", row);
                return;
              }
              if (row.target === '_blank') {
                window.open(href, '_blank', 'noopener,noreferrer');
              } else {
                window.location.href = href;
              }
            }
          } else {
            // --- FIRST TAP: Activate ---
            e.preventDefault(); //prevent first tap from navigating
            promptElement.textContent = "Tap again to enter.";
            const activeRow = document.querySelector(".text-row.active");
            if (activeRow) {
              transitionBetweenRows(activeRow, row);
            } else {
              activateRow(row);
            }
          }
        });
      } else {
        // --- DESKTOP: Hover for context, click for link ---
        const interactiveArea = row.querySelector(".interactive-area");
        if (interactiveArea) { // Add null check for safety
          interactiveArea.addEventListener("mouseenter", () => {
            activateRow(row);
            promptElement.textContent = "Click to enter domain!";
          });
          interactiveArea.addEventListener("mouseleave", () => {
            if (state.activeRowId === row.dataset.rowId) {
              deactivateRow(row);
              resetPrompt(); // reset prompt on mouse leave
            }
          });
        }
        
        // Add server check only to server link
        if (rowId === 'server') {
            row.addEventListener('click', (e) => serverClickHandler(e, row));
        }
        // "DEV" and "home" links work as normal <a> tags on click.
      }
    });

    // 4. Add "tap outside to close" listener for touch devices
    if (isTouchDevice) {
      document.addEventListener('touchstart', (e) => {
        if (!state.activeRowId) return;
        if (e.target.closest('.text-row')) {
          return;
        }
        const activeRow = document.querySelector(".text-row.active");
        if (activeRow) {
          deactivateRow(activeRow);
          resetPrompt(); // reset prompt on outside tap
          }
      }, { passive: true }); // Added passive for performance
    }
    // --- END: NEW EVENT LISTENER BLOCK --- 

  }
});
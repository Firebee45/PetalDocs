function toggleExpand(header) {
    const content = header.nextElementSibling;
    const icon = header.querySelector('.expand-icon');

    content.classList.toggle('open');
    icon.classList.toggle('open');
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.real-code-block').forEach(block => {
        if (block.querySelector('.real-code-header')) return;

        const header = document.createElement('div');
        header.className = 'real-code-header';

        const langDiv = document.createElement('div');
        langDiv.className = 'lang';

        const codeEl = block.querySelector('code');
        let lang = 'js';
        if (codeEl) {
            if (codeEl.classList.contains('language-json')) lang = 'json';
            else if (codeEl.classList.contains('language-python')) lang = 'python';
            else if (codeEl.classList.contains('language-html')) lang = 'html';
            else if (codeEl.classList.contains('language-css')) lang = 'css';
            else if (codeEl.classList.contains('language-js')) lang = 'js';
        }

        const langStyles = {
            js: { icon: 'fa-brands fa-js', color: '#f7df1e' },
            json: { icon: 'fa-solid fa-code', color: '#61dafb' },
            python: { icon: 'fa-brands fa-python', color: '#3673a5' },
            html: { icon: 'fa-brands fa-html5', color: '#e34c26' },
            css: { icon: 'fa-brands fa-css3-alt', color: '#2965f1' }
        };

        const style = langStyles[lang] || langStyles.js;
        langDiv.innerHTML = `<i class="${style.icon}" style="color:${style.color}"></i>`;

        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.innerHTML = `<span class="text">Copy</span><span class="checkmark">✓</span>`;

        header.appendChild(langDiv);
        header.appendChild(copyBtn);

        const pre = block.querySelector('pre');
        if (pre) block.insertBefore(header, pre);
        else block.prepend(header);

        if (codeEl) {
            const raw = codeEl.textContent.trim();
            if (raw.startsWith('"') && raw.endsWith('"')) {
                codeEl.textContent = raw.slice(1, -1);
            }
        }

        copyBtn.addEventListener('click', () => {
            const code = codeEl ? codeEl.textContent : '';
            navigator.clipboard.writeText(code).then(() => {
                copyBtn.classList.add('copied');
                const textSpan = copyBtn.querySelector('.text');
                if (textSpan) textSpan.textContent = 'Copied!';
                setTimeout(() => {
                    copyBtn.classList.remove('copied');
                    if (textSpan) textSpan.textContent = 'Copy';
                }, 1800);
            }).catch(err => console.error('Copy failed', err));
        });
    });
});

const mcColors = {
  '0': '#000000', '1': '#0000AA', '2': '#00AA00', '3': '#00AAAA',
  '4': '#AA0000', '5': '#AA00AA', '6': '#FFAA00', '7': '#AAAAAA',
  '8': '#555555', '9': '#5555FF', 'a': '#55FF55', 'b': '#55FFFF',
  'c': '#FF5555', 'd': '#FF55FF', 'e': '#FFFF55', 'f': '#FFFFFF',
  'r': '#FFFFFF'
};

function renderMinecraftChat() {
  document.querySelectorAll('.mc-chat').forEach(el => {
    let text = el.dataset.mc || el.textContent;
    let html = '';
    let currentColor = '#fff';

    for (let i = 0; i < text.length; i++) {
      if (text[i] === '§' && mcColors[text[i + 1]]) {
        currentColor = mcColors[text[i + 1]];
        i++;
      } else {
        html += `<span style="color:${currentColor}">${text[i]}</span>`;
      }
    }
    el.innerHTML = html;
  });
}

window.addEventListener('DOMContentLoaded', renderMinecraftChat);
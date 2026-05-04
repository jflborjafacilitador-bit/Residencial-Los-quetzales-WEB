const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'site', 'public');

function processHtmlFiles(dir) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        if (file.endsWith('.html')) {
            const filePath = path.join(dir, file);
            let content = fs.readFileSync(filePath, 'utf8');

            // 1. Wrap logo in link to index.html
            // We look for the img tag with the logo. If it's not wrapped in <a>, wrap it.
            // Using regex to match img tag regardless of whitespaces around it
            const imgRegex = /<img\s+src="Material\/Logo\s+1\.1\s+sin\s+fondo\.png"\s+alt="Residencial\s+Los\s+Quetzales">/g;
            const aWrapperCheck = /<a\s+href="index\.html">\s*<img\s+src="Material\/Logo\s+1\.1\s+sin\s+fondo\.png"\s+alt="Residencial\s+Los\s+Quetzales">\s*<\/a>/;
            
            if (!aWrapperCheck.test(content)) {
                content = content.replace(imgRegex, '<a href="index.html">$&</a>');
            }

            // 2. Add hamburger menu to navbar if not exists
            if (!content.includes('class="hamburger"')) {
                const hamburgerHTML = `  <div class="hamburger" onclick="toggleMenu()">
    <span></span><span></span><span></span>
  </div>\n`;
                // Find </nav> and insert before it
                content = content.replace(/<\/nav>/i, hamburgerHTML + '</nav>');
            }

            // 3. Add script before </body> if not exists
            if (!content.includes('function toggleMenu()')) {
                const scriptHTML = `
<script>
function toggleMenu() {
  const links = document.querySelector('.navbar-links');
  links.style.display = links.style.display === 'flex' ? 'none' : 'flex';
  links.style.flexDirection = 'column';
  links.style.position = 'absolute';
  links.style.top = '72px';
  links.style.left = '0';
  links.style.right = '0';
  links.style.background = '#fff';
  links.style.padding = '20px';
  links.style.borderBottom = '2px solid var(--orange)';
  links.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
  links.style.zIndex = '999';
}
</script>
`;
                content = content.replace(/<\/body>/i, scriptHTML + '</body>');
            }

            // 4. Update the "En Proceso" status of properties 14 and 25
            // User requested: "quiero que la 14 y la 22 tambien digan en proceso"
            // Then corrected: "la 14 y la 25 era"
            // In properties list, change data-status to "proceso" for 14 and 25
            
            // Just matching <div class="prop-card" data-status="disponible" data-manzana="2" data-precio="1456000" data-tipo="austera"> ... <div class="prop-id">#14</div>
            // It's easier to do this in propiedades.html specifically
            
            try {
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`Updated ${file}`);
            } catch (err) {
                console.error(`Failed to update ${file}: ${err.message}`);
            }
        }
    });
}

processHtmlFiles(publicDir);

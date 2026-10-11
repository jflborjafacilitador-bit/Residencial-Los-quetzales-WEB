const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'site', 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html') && f !== 'admin.html' && f !== 'calculadora.html');

console.log('Inspecting files:', files);

// 1. In contacto.html, update the contact info card in the body
const contactoPath = path.join(publicDir, 'contacto.html');
if (fs.existsSync(contactoPath)) {
  let content = fs.readFileSync(contactoPath, 'utf8');
  // Look for the Horario block in the body
  const oldBodyHorario = /<div style="font-size:15px;font-weight:600;color:var\(--dark\);margin-top:2px;">Lunes a S[aá]bado[\s\S]*?<\/div>/;
  const newBodyHorario = `<div style="font-size:14px;font-weight:600;color:var(--dark);margin-top:2px;line-height:1.5;">Lun–Vie: 9:00am – 5:00pm<br>Sáb–Dom: 10:00am – 6:00pm</div>`;
  if (oldBodyHorario.test(content)) {
    content = content.replace(oldBodyHorario, newBodyHorario);
    console.log('Updated schedule card in body of contacto.html');
  } else {
    console.warn('Could not match oldBodyHorario in contacto.html');
  }
  fs.writeFileSync(contactoPath, content, 'utf8');
}

// 2. Schedule footer contact item HTML to use
const newFooterScheduleItem = `<div class="footer-contact-item"><span>⏰</span><div><div>Lun–Vie 9:00am – 5:00pm</div><div style="margin-top:2px;">Sáb–Dom 10:00am – 6:00pm</div></div></div>`;

files.forEach(fileName => {
  const filePath = path.join(publicDir, fileName);
  let content = fs.readFileSync(filePath, 'utf8');

  // Case A: The page already has the old schedule item: Lun-Sáb 9:00am - 6:00pm
  const existingScheduleRegex = /<div class="footer-contact-item"><span>⏰<\/span><span>Lun[–-]S[aá]b\s*9:00am\s*[–-]\s*6:00pm<\/span><\/div>/;
  
  if (existingScheduleRegex.test(content)) {
    content = content.replace(existingScheduleRegex, newFooterScheduleItem);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Replaced schedule in footer of: ${fileName}`);
    return;
  }

  // Case B: The page only has phone and email in the footer (e.g. ave-de-paraiso, tucan, catalogo, propiedades)
  // We can add Caseta and Schedule right after email
  const emailItemRegex = /(<div class="footer-contact-item"><span>📧<\/span><a href="mailto:ventas@residenciallosquetzales\.com"[^>]*>ventas@residenciallosquetzales\.com<\/a><\/div>)/;
  if (emailItemRegex.test(content)) {
    // Check if Caseta exists
    let addition = '';
    if (!content.includes('Caseta de Ventas en el conjunto')) {
      addition += `\n      <div class="footer-contact-item"><span>📍</span><span>Caseta de Ventas en el conjunto</span></div>`;
    }
    addition += `\n      ` + newFooterScheduleItem;
    content = content.replace(emailItemRegex, `$1${addition}`);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Added Caseta and Schedule to footer of: ${fileName}`);
    return;
  }

  console.warn(`No pattern matched for footer in: ${fileName}`);
});

console.log('Finished updating schedule.');

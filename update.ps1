$files = Get-ChildItem -Path "site/public" -Filter "*.html"

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw

    # 1. Wrap logo in a tag if not already wrapped
    $content = $content -replace '<div class="navbar-logo">\s*<img src="Material/Logo 1\.1 sin fondo\.png" alt="Residencial Los Quetzales">\s*</div>', '<div class="navbar-logo"><a href="index.html"><img src="Material/Logo 1.1 sin fondo.png" alt="Residencial Los Quetzales"></a></div>'

    # 2. Add hamburger to nav if not exists
    if ($content -notmatch 'class="hamburger"') {
        $content = $content -replace '</nav>', "  <div class=`"hamburger`" onclick=`"toggleMenu()`">`n    <span></span><span></span><span></span>`n  </div>`n</nav>"
    }

    # 3. Add toggleMenu script if not exists
    if ($content -notmatch 'function toggleMenu\(\)') {
        $script = "<script>`nfunction toggleMenu() {`n  const links = document.querySelector('.navbar-links');`n  links.style.display = links.style.display === 'flex' ? 'none' : 'flex';`n  links.style.flexDirection = 'column';`n  links.style.position = 'absolute';`n  links.style.top = '72px';`n  links.style.left = '0';`n  links.style.right = '0';`n  links.style.background = '#fff';`n  links.style.padding = '20px';`n  links.style.borderBottom = '2px solid var(--orange)';`n  links.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';`n}`n</script>`n</body>"
        $content = $content -replace '</body>', $script
    }

    Set-Content -Path $file.FullName -Value $content -NoNewline
}

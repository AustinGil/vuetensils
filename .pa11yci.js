const fs = require('fs');

let options = {
  // 'Section508', 'WCAG2A', 'WCAG2AA', or 'WCAG2AAA'
  standard: 'WCAG2A',
  urls: []
};

// This recursively scans the docs folder to find the URLs to test with Pa11y
function addFilesAsURL (base) {
  function convertFiles (file) {
    if (file === 'README.md') {
      return 'index.html'
    }
    return file.replace('md', 'html');
  }

  function removeSkippableItems (file) {
    const itemsToSkip = [
      '.vuepress'
    ];
    return !itemsToSkip.includes(file);
  }

  let directory = fs.readdirSync(base);

  directory = directory.filter(removeSkippableItems);

  directory.forEach(function (file) {
    const isFolder = fs.lstatSync(base + file).isDirectory();
    if (!isFolder) {
      let url = [
        'http://localhost:8080',
        base.replace('./docs', ''),
        convertFiles(file)
      ].filter(Boolean).join('');

      options.urls.push(url);
    } else {
      addFilesAsURL(base + file + '/');
    }
  });
}

addFilesAsURL('./docs/');

module.exports = options;

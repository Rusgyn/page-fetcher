# page-fetcher

Should take two command line arguments
1. a URL
2. a local path

It should download the resource at the URL to the local path on your machine. Upon completion, it should print out a message like Downloaded and saved 1235 bytes to ./index.html.

`> node fetcher.js http://www.example.edu/ ./index.html`
`Downloaded and saved 3261 bytes to ./index.html`
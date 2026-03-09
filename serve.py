import http.server, os
os.chdir('/Users/jeegarkakkad/Documents/GitHub/Draghi')
httpd = http.server.HTTPServer(('', 8765), http.server.SimpleHTTPRequestHandler)
httpd.serve_forever()

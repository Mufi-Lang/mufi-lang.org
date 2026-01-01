#!/usr/bin/env python3
"""
Simple HTTP server for MufiZ documentation with proper headers
Usage: python3 serve.py [port]
"""

import http.server
import socketserver
import sys
from pathlib import Path


class MufiZHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add headers to prevent caching issues
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")

        # Add CORS headers for local development
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "*")

        # Set proper MIME types
        if self.path.endswith(".js"):
            self.send_header("Content-Type", "application/javascript; charset=utf-8")
        elif self.path.endswith(".css"):
            self.send_header("Content-Type", "text/css; charset=utf-8")
        elif self.path.endswith(".html"):
            self.send_header("Content-Type", "text/html; charset=utf-8")

        super().end_headers()

    def log_message(self, format, *args):
        # Custom logging
        print(f"[MufiZ Server] {format % args}")


def main():
    port = 8000
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
        except ValueError:
            print("Invalid port number. Using default port 8000.")

    # Ensure we're in the right directory
    script_dir = Path(__file__).parent.absolute()
    print(f"Serving from: {script_dir}")

    try:
        with socketserver.TCPServer(("", port), MufiZHTTPRequestHandler) as httpd:
            print(f"🚀 MufiZ Documentation Server")
            print(f"📡 Serving at http://localhost:{port}")
            print(f"📁 Directory: {script_dir}")
            print(f"🌐 Open: http://localhost:{port}")
            print(f"⏹️  Press Ctrl+C to stop")
            print("-" * 50)

            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n👋 Server stopped by user")
    except Exception as e:
        print(f"❌ Server error: {e}")


if __name__ == "__main__":
    main()

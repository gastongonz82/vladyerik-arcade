"""VLADYERIK ROCKOLA · Windows 11 local Bluetooth helper.
Requires Python 3.10+. Only binds to 127.0.0.1; never receives audio itself.
"""
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
import json
import subprocess
import os

HOST, PORT = "127.0.0.1", 8765
ORIGINS = {"https://arcade.vladyerik.com", "https://vladyerik.com"}
APP_HINT = "Bluetooth Audio Receiver"

def find_receiver():
    try:
        command = ("Get-StartApps | Where-Object { $_.Name -like '*Bluetooth Audio Receiver*' } "
                   "| Select-Object -First 1 -ExpandProperty AppID")
        result = subprocess.run(["powershell", "-NoProfile", "-Command", command],
                                capture_output=True, text=True, timeout=10)
        return result.stdout.strip() if result.returncode == 0 else ""
    except (OSError, subprocess.TimeoutExpired):
        return ""

class Handler(BaseHTTPRequestHandler):
    def respond(self, code, obj):
        body = json.dumps(obj).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        origin = self.headers.get("Origin", "")
        if origin in ORIGINS:
            self.send_header("Access-Control-Allow-Origin", origin)
            self.send_header("Vary", "Origin")
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        origin = self.headers.get("Origin", "")
        if origin not in ORIGINS:
            self.send_error(403)
            return
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", origin)
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Access-Control-Max-Age", "600")
        self.end_headers()

    def do_GET(self):
        if self.path != "/status":
            return self.respond(404, {"error": "Not found"})
        self.respond(200, {"ready": True, "receiver_installed": bool(find_receiver()),
                           "connection": "unknown", "note": "Windows controls Bluetooth audio."})

    def do_POST(self):
        if self.headers.get("Origin", "") not in ORIGINS:
            return self.respond(403, {"error": "Origin not allowed"})
        if self.path not in ("/open-receiver", "/open-settings"):
            return self.respond(404, {"error": "Not found"})
        if self.headers.get("Content-Length", "0") not in ("", "0"):
            return self.respond(400, {"error": "Body not supported"})
        try:
            if self.path == "/open-settings":
                os.startfile("ms-settings:bluetooth")
            else:
                app_id = find_receiver()
                if not app_id:
                    return self.respond(404, {"error": "Bluetooth Audio Receiver not found in Start apps"})
                subprocess.Popen(["explorer.exe", "shell:AppsFolder\\" + app_id])
            self.respond(200, {"ok": True})
        except OSError as exc:
            self.respond(500, {"error": str(exc)})

    def log_message(self, format, *args):
        print("%s - %s" % (self.address_string(), format % args))

if __name__ == "__main__":
    if os.name != "nt":
        raise SystemExit("This helper requires Windows.")
    print("VLADYERIK Bluetooth helper: http://127.0.0.1:%s" % PORT)
    print("Keep this window open while using Rockola. Ctrl+C to stop.")
    ThreadingHTTPServer((HOST, PORT), Handler).serve_forever()
